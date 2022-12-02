import { BigNumber } from 'ethers';
import { keccak256 } from 'ethers/lib/utils';

import { BalanceResolver } from '../types';

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
    const txValue = BigNumber.from(txValueRaw.toString());

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
      outputAmount: txValue.toString(),
      estimatedGasPrice: estimatedGasPrice?.toString(),
      estimatedMaxFeePerGas: estimatedMaxFeePerGas?.toString(),
      estimatedMaxPriorityFeePerGas: estimatedMaxPriorityFeePerGas?.toString(),
      estimatedGasLimit: estimatedGasLimit?.toString(),
      requiresKyc: false,
      ignoreCurrentBalance: config.ignoreCurrentBalance,
    };
  }

  return;
};
