import { BigNumberish, BytesLike } from 'ethers';

import { useContractWriteAndWait } from '../../../../../common/hooks/useContractWriteAndWait';

type Config = {
  chainId?: number;
  contractAddress?: string;
  spender?: BytesLike;
  amount?: BigNumberish;
  prepare?: boolean;
};

export const useERC20Approve = ({
  chainId,
  contractAddress,
  prepare,
  spender,
  amount,
}: Config) => {
  return useContractWriteAndWait<[BytesLike, BigNumberish]>({
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'approve',
    chainId,
    contractAddress,
    confirmations: 1,
    args: [spender as BytesLike, amount as BigNumberish],
    prepare: Boolean(prepare && contractAddress && spender && amount),
  });
};
