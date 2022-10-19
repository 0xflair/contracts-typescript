import { BigNumber } from 'ethers';
import { keccak256 } from 'ethers/lib/utils';

import { BalanceResolver } from '../types';

export const balanceRampNativeValueResolve: BalanceResolver = async (
  context,
) => {
  if (context.transactionRequest) {
    const {
      config,
      estimatedMaxFeePerGas,
      estimatedMaxPriorityFeePerGas,
      estimatedGasLimit,
      transactionRequest,
    } = context;
    const { value } = transactionRequest;
    const result = (await value) || BigNumber.from(0);
    const totalAmount = BigNumber.from(result.toString());

    return {
      idempotencyKey: keccak256(
        Buffer.from(
          `${transactionRequest.from}-${
            transactionRequest.data
          }-${value?.toString()}`,
        ),
      ),
      outputTokenAddress: '0x0000000000000000000000000000000000000000',
      outputDecimals: 18,
      outputAmount: totalAmount.toString(),
      estimatedMaxFeePerGas: estimatedMaxFeePerGas?.toString(),
      estimatedMaxPriorityFeePerGas: estimatedMaxPriorityFeePerGas?.toString(),
      estimatedGasLimit: estimatedGasLimit?.toString(),
      requiresKyc: false,
      ignoreCurrentBalance: config.ignoreCurrentBalance,
    };
  }

  return;
};
