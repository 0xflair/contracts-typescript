import {
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/providers';
import axios from 'axios';
import { BigNumber, BigNumberish, constants, ethers, Signer } from 'ethers';
import { Deferrable } from 'ethers/lib/utils';

import { BALANCE_RAMP_BACKEND } from '../constants';
import {
  BalanceRamp,
  BalanceRampConfig,
  BalanceResolverContext,
  CurrentBalance,
  RequiredBalance,
} from '../types';
import { min, openModalWithData } from '../utils';

export class BalanceRampClient {
  constructor(private readonly config: BalanceRampConfig) {}

  getConfig() {
    return this.config;
  }

  async handleSendTransaction(
    originalSigner: Signer,
    transactionRequest: Deferrable<TransactionRequest>,
  ): Promise<TransactionResponse> {
    const chainId = await this.resolveChainId(
      originalSigner,
      transactionRequest,
    );

    if (
      this.config.enabledChainIds !== 'ALL' &&
      (this.config.enabledChainIds === undefined ||
        !this.config.enabledChainIds.includes(chainId))
    ) {
      return originalSigner.sendTransaction(transactionRequest);
    }

    const estimatedGasLimit = await this.handleEstimateGasLimit(
      originalSigner,
      transactionRequest,
    );

    const {
      estimatedGasPrice,
      estimatedMaxFeePerGas,
      estimatedMaxPriorityFeePerGas,
    } = await this.estimateGasFees(originalSigner);

    if (estimatedGasPrice && !estimatedMaxFeePerGas) {
      transactionRequest.type = 0;
    }

    const txWithGasData = await this.applyGasParameters(
      transactionRequest,
      estimatedGasLimit,
      estimatedGasPrice,
      estimatedMaxFeePerGas,
      estimatedMaxPriorityFeePerGas,
    );

    const requiredBalance = await this.resolveRequiredBalance({
      config: this.config,
      estimatedGasLimit,
      estimatedGasPrice,
      estimatedMaxFeePerGas,
      estimatedMaxPriorityFeePerGas,
      transactionRequest,
    });

    if (!requiredBalance) {
      return originalSigner.sendTransaction(txWithGasData);
    }

    /**
     * Handler for required native token
     */
    if (requiredBalance.outputTokenAddress === constants.AddressZero) {
      const currentBalance = await this.getCurrentBalance(
        originalSigner,
        requiredBalance,
      );

      if (
        this.config.ignoreCurrentBalance ||
        requiredBalance.ignoreCurrentBalance ||
        this.shouldDoBalanceRamp(currentBalance, requiredBalance)
      ) {
        await this.initiateBalanceRampModal(
          chainId,
          await originalSigner.getAddress(),
          currentBalance,
          requiredBalance,
          transactionRequest,
        );
        const balanceRamp = await this.waitUntilReady(
          originalSigner,
          requiredBalance,
        );

        if (!balanceRamp?.settlementWillDepositBalance) {
          if (!balanceRamp?.settlementRelayMetaTx.txHash) {
            throw new Error(
              `Balance ramp failed, no tx hash found for id=${balanceRamp?.id} relay=${balanceRamp?.settlementRelayId}`,
            );
          }

          return {
            ...balanceRamp?.settlementRelayMetaTx,
            chainId,

            from: balanceRamp?.settlementRelayMetaTx?.from as string,
            to: balanceRamp?.settlementRelayMetaTx?.to as string,
            data: balanceRamp?.settlementRelayMetaTx?.data as string,
            nonce: Number(balanceRamp?.settlementRelayMetaTx?.nonce as string),
            value: BigNumber.from(balanceRamp?.settlementRelayMetaTx?.value),

            hash: balanceRamp?.settlementRelayMetaTx?.txHash,
            confirmations:
              balanceRamp?.settlementRelayMetaTx?.txReceipt?.confirmations,
            wait: async (confirmations?: number) =>
              ({
                ...balanceRamp.settlementRelayMetaTx?.txReceipt,
              } as any),
            gasLimit: BigNumber.from(
              balanceRamp?.settlementRelayMetaTx?.txReceipt.gasUsed,
            ),
          };
        }

        if (
          !this.config.maxGasLimit ||
          BigNumber.from(estimatedGasLimit).gte(this.config.maxGasLimit)
        ) {
          // re estimate gas if current gas estimate is maximum configured
          const newGasListEstimate = await originalSigner.estimateGas(
            transactionRequest,
          );
          // const newFees = await this.estimateGasFees(originalSigner);
          this.applyGasParameters(
            txWithGasData,
            newGasListEstimate,
            // newFees.estimatedMaxFeePerGas,
            // newFees.estimatedMaxPriorityFeePerGas,
          );
        }

        return originalSigner.sendTransaction(txWithGasData);
      }
    }

    return originalSigner.sendTransaction(txWithGasData);
  }

  async handleEstimateGasLimit(
    originalSigner: Signer,
    transactionRequest: Deferrable<TransactionRequest>,
  ) {
    const chainId = await this.resolveChainId(
      originalSigner,
      transactionRequest,
    );

    let estimatedGasLimit: BigNumber = BigNumber.from(0);

    try {
      estimatedGasLimit = await originalSigner.estimateGas(transactionRequest);
    } catch (e: any) {
      const message =
        e?.data?.message?.toString() +
        e?.error?.message?.toString() +
        e?.message?.toString() +
        e?.error?.error?.toString() +
        e.message?.toString() +
        e?.toString();

      if (!message.toLowerCase().includes('insufficient funds')) {
        throw e;
      }

      console.warn(`Could not estimate gas via provider, message: `, message);

      const suppliedGas = message.match(/supplied gas (\d+)/)?.[1];
      estimatedGasLimit = suppliedGas && BigNumber.from(suppliedGas);

      const maxGasLimit = this.config.maxGasLimit;
      estimatedGasLimit = estimatedGasLimit
        ? maxGasLimit
          ? min(BigNumber.from(estimatedGasLimit), maxGasLimit)
          : BigNumber.from(estimatedGasLimit)
        : BigNumber.from(maxGasLimit) || BigNumber.from(0);

      try {
        estimatedGasLimit = await this.simulateEstimateGasLimit(
          chainId,
          transactionRequest,
        );
      } catch (e: any) {
        console.warn(`Could not simulate gas limit: `, e);

        if (e?.response?.data?.code === 'ErrTransactionSimulationFailed') {
          throw new Error(
            `Transaction will fail: ${
              e?.response?.data?.message || e?.response?.data?.code
            }`,
          );
        }
      }
    }

    return estimatedGasLimit;
  }

  private async applyGasParameters(
    transactionRequest: ethers.utils.Deferrable<TransactionRequest>,
    estimatedGasLimit?: BigNumberish,
    estimatedGasPrice?: BigNumberish,
    estimatedMaxFeePerGas?: BigNumberish,
    estimatedMaxPriorityFeePerGas?: BigNumberish,
  ): Promise<Deferrable<TransactionRequest>> {
    return {
      ...transactionRequest,
      ...(estimatedGasLimit ? { gasLimit: estimatedGasLimit } : {}),
      ...(estimatedGasPrice ? { gasPrice: estimatedGasPrice } : {}),
      ...(estimatedMaxFeePerGas ? { maxFeePerGas: estimatedMaxFeePerGas } : {}),
      ...(estimatedMaxPriorityFeePerGas
        ? { maxPriorityFeePerGas: estimatedMaxPriorityFeePerGas }
        : {}),
    };
  }

  private async estimateGasFees(originalSigner: ethers.Signer) {
    const feeData = await originalSigner.getFeeData();

    const isLegacy = feeData?.gasPrice && !feeData?.maxFeePerGas;
    const estimatedMaxFeePerGas = feeData?.maxFeePerGas || undefined;
    const estimatedGasPrice = isLegacy
      ? feeData?.gasPrice || (await originalSigner.getGasPrice())
      : undefined;
    const estimatedMaxPriorityFeePerGas =
      feeData?.maxPriorityFeePerGas || undefined;

    return {
      estimatedGasPrice,
      estimatedMaxFeePerGas,
      estimatedMaxPriorityFeePerGas,
    };
  }

  private async resolveChainId(
    signer: ethers.Signer,
    transactionRequest: ethers.utils.Deferrable<TransactionRequest>,
  ) {
    return (
      (await (transactionRequest.chainId || (await signer.getChainId()))) || 1
    );
  }

  private async getCurrentBalance(
    signer: ethers.Signer,
    requiredBalance: RequiredBalance,
  ) {
    if (requiredBalance.outputTokenAddress === constants.AddressZero) {
      return {
        tokenAddress: constants.AddressZero,
        amount: await signer.getBalance(),
      };
    }

    // TODO - handle ERC20
    throw new Error(
      `Not implemented balance type for token ${requiredBalance.outputTokenAddress}`,
    );
  }

  private async simulateEstimateGasLimit(
    chainId: number,
    transaction: ethers.utils.Deferrable<TransactionRequest>,
  ): Promise<BigNumber> {
    const response = await axios.post(
      `${BALANCE_RAMP_BACKEND[this.config.env].simulateEstimateGasLimit}`,
      {
        transaction: {
          chainId,
          ...(await transaction),
        },
        overrides: [
          {
            type: 'addBalance',
            accounts: [transaction.from],
            token: ethers.constants.AddressZero,
            amount: ethers.utils.parseEther('10000000000000'),
          },
        ],
      },
      {
        timeout: 2000,
      },
    );

    if (!response?.data?.gasEstimate) {
      throw new Error(
        `Could not estimate gas via balance ramp, response: ${JSON.stringify(
          response.data,
        )}`,
      );
    }

    return BigNumber.from(response.data.gasEstimate);
  }

  private async initiateBalanceRampModal(
    chainId: number,
    walletAddress: string,
    currentBalance: CurrentBalance,
    requiredBalance: RequiredBalance,
    transactionRequest: Deferrable<TransactionRequest>,
  ) {
    const rampRequest = {
      currentBalance: currentBalance.amount,
      ignoreCurrentBalance:
        requiredBalance.ignoreCurrentBalance ||
        this.config.ignoreCurrentBalance,
      chainId,
      walletAddress,
      outputTokenAddress:
        requiredBalance.outputTokenAddress || ethers.constants.AddressZero,
      outputAmount: requiredBalance.outputAmount?.toString() || '',
      outputDecimals: requiredBalance.outputDecimals || '18',
      requiresKyc:
        requiredBalance.requiresKyc || this.config.requiresKyc || false,
      inputCurrency:
        requiredBalance.inputCurrency || this.config.inputCurrency || 'USD',
      txFrom: transactionRequest.from?.toString() || '',
      txTo: transactionRequest.to?.toString() || '',
      txData: transactionRequest.data?.toString() || '',
      txValue: transactionRequest.value?.toString() || '',
      txGasLimit: transactionRequest.gasLimit?.toString() || '',
      txGasPrice: transactionRequest.gasPrice?.toString() || '',
      idempotencyKey: requiredBalance.idempotencyKey || '',
      estimatedGasPrice: requiredBalance.estimatedGasPrice?.toString() || '',
      estimatedMaxFeePerGas:
        requiredBalance.estimatedMaxFeePerGas?.toString() || '',
      estimatedMaxPriorityFeePerGas:
        requiredBalance.estimatedMaxPriorityFeePerGas?.toString() || '',
      estimatedGasLimit: requiredBalance.estimatedGasLimit?.toString() || '',
    };

    const modal = openModalWithData(
      {
        url: `${BALANCE_RAMP_BACKEND[this.config.env].startSession}`,
      },
      rampRequest,
    );

    // periodically check if modal is closed
    const interval = setInterval(() => {
      if (modal?.closed) {
        window.postMessage(
          {
            flair: true,
            type: 'WindowClosed',
          },
          '*',
        );
        clearInterval(interval);
      }
    }, 300);
  }

  private async waitUntilReady(
    signer: Signer,
    requiredBalance: RequiredBalance,
  ): Promise<BalanceRamp | undefined> {
    const promises = [];

    if (
      !this.config.ignoreCurrentBalance &&
      !requiredBalance.ignoreCurrentBalance
    ) {
      promises.push(this.regularlyCheckForBalance(signer, requiredBalance));
    }

    const rampPromise = this.waitForModalMessage(signer, requiredBalance);

    promises.push(rampPromise);

    await Promise.race(promises);

    return rampPromise;
  }

  private async waitForModalMessage(
    signer: Signer,
    requiredBalance: RequiredBalance,
  ): Promise<BalanceRamp> {
    const promise = new Promise<BalanceRamp>((resolve, reject) => {
      window.addEventListener('message', async (event) => {
        const message = event.data;

        if (!message.flair) {
          return;
        }

        try {
          if (message.type === 'BalanceRampSuccess') {
            resolve(message.data as BalanceRamp);
          } else if (message.type === 'WindowClosed') {
            reject('Payment window was closed, please try again.');
          } else if (message.type === 'BalanceRampFailure') {
            debugger;
            reject(message.data);
          } else {
            reject('Unknown message type: ' + event.data);
          }
        } catch (e) {
          console.error('Failed to parse message: ', e);
        }
      });
    });

    return promise;
  }

  private async regularlyCheckForBalance(
    signer: Signer,
    requiredBalance: RequiredBalance,
  ) {
    /**
     * For native balance
     */
    if (requiredBalance.outputTokenAddress === constants.AddressZero) {
      let balance = await signer.getBalance();

      const totalGasFees = BigNumber.from(
        requiredBalance.estimatedGasPrice || 0,
      )
        .add(requiredBalance.estimatedMaxFeePerGas || 0)
        .add(requiredBalance.estimatedMaxPriorityFeePerGas || 0)
        .mul(requiredBalance.estimatedGasLimit || 100_000);

      const totalRequiredBalance = BigNumber.from(
        requiredBalance.outputAmount,
      ).add(totalGasFees);

      while (balance.lt(totalRequiredBalance)) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        balance = await signer.getBalance();
      }
    } else {
      /**
       * For ERC20 balance
       */
      throw new Error(
        `ERC20 tokens are not implemented yet for regularlyCheckForBalance`,
      );
    }
  }

  private shouldDoBalanceRamp(
    currentBalance: CurrentBalance,
    requiredBalance: RequiredBalance,
  ): boolean {
    let amount = BigNumber.from(requiredBalance.outputAmount);

    // Consider gas fees if output token is native currency
    if (
      requiredBalance.outputTokenAddress === constants.AddressZero &&
      requiredBalance.estimatedGasLimit
    ) {
      amount = amount.add(
        BigNumber.from(requiredBalance.estimatedGasLimit).mul(
          BigNumber.from(requiredBalance.estimatedMaxFeePerGas || 0).add(
            BigNumber.from(
              requiredBalance.estimatedMaxPriorityFeePerGas || 0,
            ).add(BigNumber.from(requiredBalance.estimatedGasPrice || 0)),
          ),
        ),
      );
    }

    return BigNumber.from(currentBalance.amount).lt(amount);
  }

  private async resolveRequiredBalance(context: BalanceResolverContext) {
    const { resolvers } = this.config;

    for (const resolver of resolvers) {
      const balance = await resolver(context);

      if (balance) {
        return balance;
      }
    }
  }
}
