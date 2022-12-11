import { BigNumber } from 'ethers';

import { BalanceResolver } from '../types';
import { calculateUniqueTransactionIdentifier } from '../utils';

export const balanceRampCustomDataResolve: BalanceResolver = async (
  context,
) => {
  if (context.transactionRequest) {
    const {
      config,
      estimatedGasPrice,
      estimatedMaxFeePerGas,
      estimatedMaxPriorityFeePerGas,
      estimatedGasLimit,
    } = context;

    try {
      const requiredAmounts = (await context.transactionRequest?.customData)
        ?.rampRequiredAmounts;

      if (!requiredAmounts || !requiredAmounts.length) {
        return;
      }

      const txUniqueHash = await calculateUniqueTransactionIdentifier(
        context.transactionRequest,
      );

      return {
        idempotencyKey: txUniqueHash,
        outputTokenAddress: requiredAmounts[0]?.token,
        outputDecimals: 18,
        outputAmount: BigNumber.from(requiredAmounts[0]?.value).toString(),
        estimatedGasPrice: estimatedGasPrice?.toString(),
        estimatedMaxFeePerGas: estimatedMaxFeePerGas?.toString(),
        estimatedMaxPriorityFeePerGas:
          estimatedMaxPriorityFeePerGas?.toString(),
        estimatedGasLimit: estimatedGasLimit?.toString(),
        requiresKyc: false,
        ignoreCurrentBalance:
          config.ignoreCurrentBalance ||
          Boolean(
            (await context?.transactionRequest?.customData)
              ?.rampIgnoreCurrentBalance,
          ),
        preferredPaymentMethod: (await context?.transactionRequest?.customData)
          ?.rampPreferredPaymentMethod,
      };
    } catch (e) {
      return;
    }
  }

  return;
};
