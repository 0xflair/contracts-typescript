import { BigNumberish, BytesLike } from 'ethers';

import { useContractWriteAndWait } from '../../../../common';

type Config = {
  contractAddress?: string;
  tokenAddresses?: BytesLike[];
  amounts?: BigNumberish[];
  prepare?: boolean;
};

export const useWithdrawByTokens = ({
  contractAddress,
  prepare,
  tokenAddresses,
  amounts,
}: Config) => {
  return useContractWriteAndWait({
    abi: [
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'claimTokens',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'amounts',
            type: 'uint256[]',
          },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'withdraw(address[],uint256[])',
    contractAddress,
    confirmations: 1,
    args: [tokenAddresses, amounts],
    prepare: Boolean(prepare && contractAddress && tokenAddresses && amounts),
  });
};
