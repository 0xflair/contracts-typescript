import { BigNumber } from 'ethers';
import { keccak256 } from 'ethers/lib/utils';

import { BalanceResolver } from '../types';
import { calculateUniqueTransactionIdentifier } from '../utils';

export const balanceRampNativeValueResolve: BalanceResolver = async (
  context,
) => {
  if (context.transactionRequest) {
    const {
      config,
      estimatedGasPrice,
      estimatedMaxFeePerGas,
      estimatedMaxPriorityFeePerGas,
      estimatedGasLimit,
      transactionRequest,
    } = context;
    const { value } = transactionRequest;
    const txValueRaw = (await value) || BigNumber.from(0);

    if (!txValueRaw || BigNumber.from(txValueRaw).isZero()) {
      return;
    }

    const txValue = BigNumber.from(txValueRaw.toString());

    const txUniqueHash = await calculateUniqueTransactionIdentifier(
      context.transactionRequest,
    );

    return {
      idempotencyKey: txUniqueHash,
      outputTokenAddress: '0x0000000000000000000000000000000000000000',
      outputDecimals: 18,
      outputAmount: txValue.toString(),
      estimatedGasPrice: estimatedGasPrice?.toString(),
      estimatedMaxFeePerGas: estimatedMaxFeePerGas?.toString(),
      estimatedMaxPriorityFeePerGas: estimatedMaxPriorityFeePerGas?.toString(),
      estimatedGasLimit: estimatedGasLimit?.toString(),
      requiresKyc: false,
      ignoreCurrentBalance:
        config.ignoreCurrentBalance ||
        Boolean(
          (await context?.transactionRequest?.customData)
            ?.rampIgnoreCurrentBalance,
        ),
      paymentMethod: (await context?.transactionRequest?.customData)
        ?.rampPaymentMethod,
    };
  }

  return;
};
