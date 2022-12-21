import {
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/providers';
import { Environment } from '@flair-sdk/common';
import axios from 'axios';
import { BigNumber, BigNumberish, constants, ethers, Signer } from 'ethers';
import { Deferrable } from 'ethers/lib/utils.js';

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
  private iframe!: HTMLIFrameElement;
  private modalOverlay!: HTMLDivElement;
  private modalContent!: HTMLDivElement;

  constructor(private readonly config: BalanceRampConfig) {
    this.injectModal();
    this.injectIframe();
  }

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

    if (!requiredBalance?.outputTokenAddress) {
      return this.sendTransactionOriginal(originalSigner, transactionRequest);
    }

    if (
      requiredBalance.outputTokenAddress !== constants.AddressZero &&
      !ethers.utils.isAddress(requiredBalance.outputTokenAddress)
    ) {
      return this.sendTransactionOriginal(originalSigner, transactionRequest);
    }

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

      this.hide();

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
            balanceRamp?.settlementRelayMetaTx?.txReceipt?.confirmations || 1,
          wait: async (confirmations?: number) =>
            ({
              ...balanceRamp.settlementRelayMetaTx?.txReceipt,
            } as any),
          gasLimit: BigNumber.from(
            balanceRamp?.settlementRelayMetaTx?.txReceipt?.gasUsed || 0,
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

      return this.sendTransactionOriginal(originalSigner, txWithGasData);
    }

    return this.sendTransactionOriginal(originalSigner, transactionRequest);
  }

  async sendTransactionOriginal(
    originalSigner: ethers.Signer,
    tx: ethers.utils.Deferrable<TransactionRequest>,
  ): Promise<TransactionResponse> {
    const cleanTx = {
      ...tx,
    };

    delete cleanTx.customData;

    return originalSigner.sendTransaction(cleanTx);
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

      if (
        !message.toLowerCase().includes('insufficient funds') &&
        !message.toLowerCase().includes('exceeds allowance') &&
        !message.toLowerCase().includes('exceeds balance')
      ) {
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

    // Add 150k buffer for relay overhead:
    // estimatedGasLimit = estimatedGasLimit.add(150_000);

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
    const chainId = await originalSigner.getChainId();
    const gasFeeData = await this.getGasFeeData(originalSigner);

    const gasPrice =
      gasFeeData?.gasPrice && BigNumber.from(gasFeeData?.gasPrice);
    const maxFeePerGas =
      gasFeeData?.maxFeePerGas && BigNumber.from(gasFeeData?.maxFeePerGas);
    const maxPriorityFeePerGas =
      gasFeeData?.maxPriorityFeePerGas &&
      BigNumber.from(gasFeeData?.maxPriorityFeePerGas);

    // add 50% buffer to gas prices (20% for eth)
    const gasPriceBuffer = gasPrice?.mul(chainId === 1 ? 120 : 150).div(100);
    let maxFeePerGasBuffer = maxFeePerGas
      ?.mul(chainId === 1 ? 120 : 150)
      .div(100);
    let maxPriorityFeePerGasBuffer = maxPriorityFeePerGas
      ?.mul(chainId === 1 ? 120 : 150)
      .div(100);

    // maxFeePerGas cannot be less than maxPriorityFeePerGas
    if (
      maxFeePerGasBuffer &&
      maxPriorityFeePerGasBuffer &&
      maxFeePerGasBuffer.lt(maxPriorityFeePerGasBuffer)
    ) {
      maxFeePerGasBuffer = BigNumber.from(maxPriorityFeePerGasBuffer);
    }

    return {
      estimatedGasPrice: gasPriceBuffer,
      estimatedMaxFeePerGas: maxFeePerGasBuffer,
      estimatedMaxPriorityFeePerGas: maxPriorityFeePerGasBuffer,
    };
  }

  private async resolveChainId(
    signer: ethers.Signer,
    transactionRequest: ethers.utils.Deferrable<TransactionRequest>,
  ) {
    return (
      (await (transactionRequest.chainId ||
        (
          await transactionRequest?.customData
        )?.rampChainId ||
        (await signer.getChainId()))) || 1
    );
  }

  private async getCurrentBalance(
    originalSigner: ethers.Signer,
    requiredBalance: RequiredBalance,
  ) {
    if (requiredBalance.outputTokenAddress === constants.AddressZero) {
      let amount = '0';
      try {
        amount = (await originalSigner.getBalance())?.toString();
      } catch (e: any) {
        console.warn(`Could not get native balance: `, e);
      }
      return {
        tokenAddress: constants.AddressZero,
        amount,
      };
    }

    if (
      requiredBalance.outputTokenAddress &&
      ethers.utils.isAddress(requiredBalance.outputTokenAddress)
    ) {
      let amount = '0';
      try {
        amount = await this.getERC20Balance(
          requiredBalance.outputTokenAddress,
          originalSigner,
        );
      } catch (e: any) {
        console.warn(
          `Could not get erc20 balance: `,
          requiredBalance.outputTokenAddress,
          e,
        );
      }
      return {
        tokenAddress: requiredBalance.outputTokenAddress,
        amount,
      };
    }

    throw new Error(
      `Not implemented balance type for token ${requiredBalance.outputTokenAddress}`,
    );
  }

  private async getERC20Balance(
    outputTokenAddress: string,
    originalSigner: ethers.Signer,
  ) {
    const tokenContract = new ethers.Contract(
      outputTokenAddress,
      ['function balanceOf(address account) external view returns (uint256)'],
      originalSigner.provider || originalSigner,
    );
    const amount = (
      await tokenContract.balanceOf(await originalSigner.getAddress())
    )?.toString();
    return amount;
  }

  private async simulateEstimateGasLimit(
    chainId: number,
    transaction: ethers.utils.Deferrable<TransactionRequest>,
    overrides?: {
      type: string;
      accounts: (string | Promise<string | undefined> | undefined)[];
      token: string;
      amount: BigNumberish;
    }[],
  ): Promise<BigNumber> {
    const response = await axios.post(
      `${BALANCE_RAMP_BACKEND[this.config.env].simulateEstimateGasLimit}`,
      {
        transaction: {
          chainId,
          ...(await transaction),
        },
        overrides: overrides || [
          {
            type: 'addBalance',
            accounts: [transaction.from],
            token: ethers.constants.AddressZero,
            amount: ethers.utils.parseEther('10000000000000'),
          },
        ],
      },
      {
        timeout: 5000,
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

  private async getGasFeeData(originalSigner: ethers.Signer): Promise<
    | {
        gasPrice?: BigNumber;
        maxFeePerGas?: BigNumber;
        maxPriorityFeePerGas?: BigNumber;
      }
    | undefined
  > {
    let gasPrice;
    let maxFeePerGas;
    let maxPriorityFeePerGas;

    try {
      const chainId = await originalSigner.getChainId();
      const result = await axios.get(
        `${BALANCE_RAMP_BACKEND[this.config.env].getGasFeeData(chainId)}`,
        {
          timeout: 5000,
        },
      );
      if (result.data.gasPrice) {
        gasPrice = BigNumber.from(result.data.gasPrice);
      }
      if (result.data.maxFeePerGas) {
        maxFeePerGas = BigNumber.from(result.data.maxFeePerGas);
      }
      if (result.data.maxPriorityFeePerGas) {
        maxPriorityFeePerGas = BigNumber.from(result.data.maxPriorityFeePerGas);
      }
    } catch (e: any) {
      console.warn(
        `Could not get gas fee data from API, falling back to provider: `,
        e,
      );
    }

    if (!gasPrice && (!maxFeePerGas || !maxPriorityFeePerGas)) {
      const feeData = await originalSigner.getFeeData();
      const isLegacy = feeData?.gasPrice && !feeData?.maxFeePerGas;
      if (!gasPrice) {
        gasPrice = isLegacy
          ? feeData?.gasPrice || (await originalSigner.getGasPrice())
          : undefined;
      }
      if (!maxFeePerGas) {
        maxFeePerGas = feeData?.maxFeePerGas || undefined;
      }
      if (!maxPriorityFeePerGas) {
        maxPriorityFeePerGas = feeData?.maxPriorityFeePerGas || undefined;
      }
    }

    return {
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
    };
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
      preferredPaymentMethod: requiredBalance.preferredPaymentMethod,
      chainId,
      walletAddress,
      outputTokenAddress:
        requiredBalance.outputTokenAddress || ethers.constants.AddressZero,
      outputAmount: requiredBalance.outputAmount?.toString() || '',
      outputDecimals: requiredBalance.outputDecimals,
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

    const url = `${BALANCE_RAMP_BACKEND[this.config.env].startSession}`;
    this.iframe.src = url;
    this.show();

    const intervalRequest = setInterval(() => {
      this.iframe?.contentWindow?.postMessage(
        {
          flair: true,
          type: 'BalanceRampRequest',
          rampRequest,
        },
        '*',
      );
    }, 500);

    const handleInitialized = (event: any) => {
      if (
        event?.data?.flair &&
        event?.data?.type === 'BalanceRampInitialized'
      ) {
        clearInterval(intervalRequest);
        window.removeEventListener('message', handleInitialized);
      }
    };
    window.addEventListener('message', handleInitialized);
  }

  hide() {
    this.modalOverlay.style.opacity = '0';
    setTimeout(() => {
      this.modalOverlay.style.display = 'none';
    }, 300);
    this.iframe.src = 'about:blank';
  }

  show() {
    this.modalOverlay.style.display = 'block';
    setTimeout(() => {
      this.modalOverlay.style.opacity = '1';
    }, 10);
  }

  private injectModal() {
    const onload = () => {
      this.modalOverlay = document.createElement('div');
      this.modalOverlay.style.display = 'none';
      this.modalOverlay.className = 'balance-ramp-modal-overlay';
      (this.config.portalElement || document.body).appendChild(
        this.modalOverlay,
      );

      this.modalContent = document.createElement('div');
      this.modalContent.className = 'balance-ramp-modal-content';
      this.modalOverlay.appendChild(this.modalContent);

      // add css styles for modal overlay
      const style = document.createElement('style');
      style.id = 'balance-ramp-styles';
      style.innerHTML = `
        .balance-ramp-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background-color: rgba(255, 255, 255, 0.5);
            transition-property: all;
            transition-duration: 300ms;
            opacity: 0;
        }
        .balance-ramp-modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            max-width: 600px;
            height: 100%;
            max-height: 750px;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
        }
        .balance-ramp-modal-content iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    `;
      document.querySelector(`#balance-ramp-styles`)?.remove();
      document.head.appendChild(style);
    };

    if (['loaded', 'interactive', 'complete'].includes(document.readyState)) {
      onload();
    } else {
      window.addEventListener('load', onload, false);
    }
  }

  private injectIframe() {
    this.iframe = document.createElement('iframe');
    this.iframe.allow = 'usb';
    this.modalContent.appendChild(this.iframe);

    window?.addEventListener('message', async (event) => {
      const message = event.data;
      if (!message.flair) {
        return;
      }

      switch (event.data.type) {
        case 'BalanceRampCancelled':
        case 'BalanceRampFailure':
          this.hide();
          break;
        default:
          break;
      }
    });
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
          } else if (message.type === 'BalanceRampCancelled') {
            reject('Payment was cancelled by user.');
          } else if (message.type === 'BalanceRampFailure') {
            reject(message.data);
          } else if (message.type === 'BalanceRampInitialized') {
            // ignore
          } else {
            reject('Unknown message type: ' + event?.data?.type);
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
      const totalGasFees = BigNumber.from(
        requiredBalance.estimatedGasPrice || 0,
      )
        .add(requiredBalance.estimatedMaxFeePerGas || 0)
        .add(requiredBalance.estimatedMaxPriorityFeePerGas || 0)
        .mul(requiredBalance.estimatedGasLimit || 100_000);

      const totalRequiredBalance = BigNumber.from(
        requiredBalance.outputAmount,
      ).add(totalGasFees);

      let currentBalance;
      while (!currentBalance || currentBalance.lt(totalRequiredBalance)) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        try {
          currentBalance = await signer.getBalance();
        } catch (e) {}
      }

      return;
    } else if (requiredBalance.outputTokenAddress) {
      /**
       * For ERC20 balance
       */
      const totalRequiredBalance = BigNumber.from(requiredBalance.outputAmount);

      let currentBalance;
      while (!currentBalance || currentBalance.lt(totalRequiredBalance)) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        try {
          currentBalance = BigNumber.from(
            (await this.getERC20Balance(
              requiredBalance.outputTokenAddress,
              signer,
            )) || '0',
          );
        } catch (e) {}
      }

      return;
    }

    throw new Error(`Missing outputTokenAddress for regularlyCheckForBalance`);
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
