import { BigNumberish, BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

type Config = PredefinedReadContractConfig & {
  tokenId?: BigNumberish;
};

type ArgsType = [tokenId?: BigNumberish];

export const useERC721TokenUri = ({ tokenId, enabled, ...config }: Config) => {
  return useContractRead<BytesLike, ArgsType>({
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'tokenURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'tokenURI(uint256)',
    args: tokenId !== undefined ? [tokenId] : undefined,
    enabled: Boolean(enabled && tokenId !== undefined),
    ...config,
  });
};
