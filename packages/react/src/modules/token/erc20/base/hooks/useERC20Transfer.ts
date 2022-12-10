import { BigNumberish, BytesLike, Signer } from 'ethers';

import { useContractWriteAndWait } from '../../../../../common';

type Config = {
  contractAddress?: string;
  to?: BytesLike;
  amount?: BigNumberish;
  prepare?: boolean;
};

export const useERC20Transfer = ({
  contractAddress,
  prepare,
  to,
  amount,
}: Config) => {
  return useContractWriteAndWait({
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfer',
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
    functionName: 'transfer(address,uint256)',
    contractAddress,
    confirmations: 1,
    args: [to, amount],
    prepare: Boolean(prepare && contractAddress && to && amount),
  });
};
