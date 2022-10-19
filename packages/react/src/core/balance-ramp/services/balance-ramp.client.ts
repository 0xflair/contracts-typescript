import {
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/providers';
import axios from 'axios';
import { BigNumber, BigNumberish, constants, ethers, Signer } from 'ethers';
import { Deferrable } from 'ethers/lib/utils';

import { BALANCE_RAMP_BACKEND } from '../constants';
import {
  BalanceRampConfig,
  BalanceResolverContext,
  CurrentBalance,
  RequiredBalance,
} from '../types';
import { min } from '../utils';

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
      this.config.enabledChainIds &&
      !this.config.enabledChainIds.includes(chainId)
    ) {
      return originalSigner.sendTransaction(transactionRequest);
    }

    const estimatedGasLimit = await this.handleEstimateGas(
      originalSigner,
      transactionRequest,
    );
    const { estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas } =
      await this.estimateGasFees(originalSigner);

    const txWithGasData = await this.applyGasParameters(
      transactionRequest,
      estimatedGasLimit,
      estimatedMaxFeePerGas,
      estimatedMaxPriorityFeePerGas,
    );

    const requiredBalance = await this.resolveRequiredBalance({
      config: this.config,
      estimatedGasLimit,
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
        await this.waitUntilReady(originalSigner, requiredBalance);

        if (
          !estimatedGasLimit ||
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

  async handleEstimateGas(
    originalSigner: Signer,
    transactionRequest: Deferrable<TransactionRequest>,
  ) {
    const chainId = await this.resolveChainId(
      originalSigner,
      transactionRequest,
    );

    let estimatedGasLimit: BigNumberish | undefined;

    try {
      estimatedGasLimit = await originalSigner.estimateGas(transactionRequest);
    } catch (e: any) {
      const message =
        e?.error?.message?.toString() ||
        e?.message?.toString() ||
        e?.error?.error?.toString() ||
        e.message?.toString() ||
        e?.toString();

      console.warn(`Could not estimate gas via provider, message: `, message);

      const suppliedGas = message.match(/supplied gas (\d+)/)?.[1];
      estimatedGasLimit = suppliedGas && BigNumber.from(suppliedGas);

      try {
        estimatedGasLimit = await this.simulateEstimateGasLimit(
          chainId,
          transactionRequest,
        );
      } catch (e) {
        console.warn(`Could not estimate gas via balance ramp, message: `, e);
      }
    }

    const maxGasLimit = this.config.maxGasLimit;

    return estimatedGasLimit
      ? maxGasLimit
        ? min(BigNumber.from(estimatedGasLimit), maxGasLimit)
        : BigNumber.from(estimatedGasLimit)
      : BigNumber.from(maxGasLimit) || BigNumber.from(0);
  }

  private async applyGasParameters(
    transactionRequest: ethers.utils.Deferrable<TransactionRequest>,
    estimatedGasLimit?: BigNumberish,
    estimatedMaxFeePerGas?: BigNumberish,
    estimatedMaxPriorityFeePerGas?: BigNumberish,
  ): Promise<Deferrable<TransactionRequest>> {
    const isLegacy =
      (transactionRequest.gasPrice && !transactionRequest.maxFeePerGas) ||
      (await transactionRequest.type)?.toString() === '0';

    return {
      ...transactionRequest,
      ...(estimatedGasLimit ? { gasLimit: estimatedGasLimit } : {}),
      // Decide if EIP-1559 or legacy gas price
      ...(isLegacy
        ? { gasPrice: estimatedMaxFeePerGas }
        : {
            maxFeePerGas: estimatedMaxFeePerGas,
            maxPriorityFeePerGas: estimatedMaxPriorityFeePerGas,
          }),
    };
  }

  private async estimateGasFees(originalSigner: ethers.Signer) {
    const feeData = await originalSigner.getFeeData();

    const estimatedMaxFeePerGas = feeData?.maxFeePerGas
      ? feeData.maxFeePerGas
      : feeData?.gasPrice
      ? feeData.gasPrice
      : await originalSigner.getGasPrice();
    const estimatedMaxPriorityFeePerGas = feeData?.maxPriorityFeePerGas || '0';
    return { estimatedMaxFeePerGas, estimatedMaxPriorityFeePerGas };
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
  ): Promise<BigNumberish | undefined> {
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

    return response?.data?.gasEstimate
      ? BigNumber.from(response.data.gasEstimate)
      : undefined;
  }

  private async initiateBalanceRampModal(
    chainId: number,
    walletAddress: string,
    currentBalance: CurrentBalance,
    requiredBalance: RequiredBalance,
    transactionRequest: Deferrable<TransactionRequest>,
  ) {
    const h = 550;
    const w = 600;
    const y = window?.top
      ? window.top.outerHeight / 2 + window.top.screenY - h / 2
      : 0;
    const x = window?.top
      ? window?.top?.outerWidth / 2 + window?.top?.screenX - w / 2
      : 0;

    const modal = window.open(
      `${BALANCE_RAMP_BACKEND[this.config.env].startSession}?currentBalance=${
        currentBalance.amount
      }&ignoreCurrentBalance=${String(
        Boolean(
          requiredBalance.ignoreCurrentBalance ||
            this.config.ignoreCurrentBalance,
        ),
      )}&chainId=${chainId}&walletAddress=${walletAddress}&outputTokenAddress=${
        requiredBalance.outputTokenAddress || ethers.constants.AddressZero
      }&outputAmount=${
        requiredBalance.outputAmount?.toString() || ''
      }&outputDecimals=${requiredBalance.outputDecimals || '18'}&requiresKyc=${
        requiredBalance.requiresKyc || this.config.requiresKyc || 'false'
      }&inputCurrency=${
        requiredBalance.inputCurrency || this.config.inputCurrency || ''
      }&txFrom=${transactionRequest.from?.toString() || ''}&txTo=${
        transactionRequest.to?.toString() || ''
      }&txData=${transactionRequest.data?.toString() || ''}&txValue=${
        transactionRequest.value?.toString() || ''
      }&txGasLimit=${
        transactionRequest.gasLimit?.toString() || ''
      }&txGasPrice=${
        transactionRequest.gasPrice?.toString() || ''
      }&idempotencyKey=${
        requiredBalance.idempotencyKey || ''
      }&estimatedMaxFeePerGas=${
        requiredBalance.estimatedMaxFeePerGas?.toString() || ''
      }&estimatedMaxPriorityFeePerGas=${
        requiredBalance.estimatedMaxPriorityFeePerGas?.toString() || ''
      }&estimatedGasLimit=${
        requiredBalance.estimatedGasLimit?.toString() || ''
      }`,
      '_blank',
      `width=${w},height=${h},top=${y},left=${x},once=true,scrollbars=yes,status=0,toolbar=0,menubar=0,location=0`,
    );

    if (!modal) {
      throw new Error('Failed to open modal');
    }

    modal.focus();

    // periodically check if modal is closed
    const interval = setInterval(() => {
      if (modal.closed) {
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
  ) {
    const promises = [];

    if (
      !this.config.ignoreCurrentBalance &&
      !requiredBalance.ignoreCurrentBalance
    ) {
      promises.push(this.regularlyCheckForBalance(signer, requiredBalance));
    }

    promises.push(this.waitForModalMessage(signer, requiredBalance));

    return Promise.race(promises);
  }

  private async waitForModalMessage(
    signer: Signer,
    requiredBalance: RequiredBalance,
  ): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      window.addEventListener('message', async (event) => {
        const message = event.data;

        if (!message.flair) {
          return;
        }

        try {
          if (message.type === 'BalanceRampSuccess') {
            resolve(message.data);
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
        requiredBalance.estimatedMaxFeePerGas || 0,
      )
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
      requiredBalance.estimatedGasLimit &&
      requiredBalance.estimatedMaxFeePerGas
    ) {
      amount = amount.add(
        BigNumber.from(requiredBalance.estimatedGasLimit).mul(
          BigNumber.from(requiredBalance.estimatedMaxFeePerGas).add(
            requiredBalance.estimatedMaxPriorityFeePerGas || 0,
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