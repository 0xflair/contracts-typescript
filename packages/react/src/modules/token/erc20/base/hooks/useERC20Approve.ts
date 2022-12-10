import { BigNumberish, BytesLike, Signer } from 'ethers';

import { useContractWriteAndWait } from '../../../../../common';

type Config = {
  contractAddress?: string;
  spender?: BytesLike;
  amount?: BigNumberish;
  prepare?: boolean;
};

export const useERC20Approve = ({
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
    contractAddress,
    confirmations: 1,
    args: [spender as BytesLike, amount as BigNumberish],
    prepare: Boolean(prepare && contractAddress && spender && amount),
  });
};
