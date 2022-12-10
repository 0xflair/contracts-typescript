import { BigNumberish, BytesLike } from 'ethers';

import {
  PredefinedContractWriteConfig,
  useContractWriteAndWait,
} from '../../../../../common';

type Config = PredefinedContractWriteConfig & {
  from?: BytesLike;
  to?: BytesLike;
  tokenId?: BigNumberish;
};

export const useERC721Transfer = ({
  prepare = true,
  from,
  to,
  tokenId,
  ...rest
}: Config) => {
  return useContractWriteAndWait({
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'transferFrom(address,address,uint256)',
    confirmations: 1,
    args: [from, to, tokenId],
    prepare: Boolean(prepare && from && to && tokenId),
    ...rest,
  });
};
