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
    contractInterface: ['function tokenURI(uint256) view returns (string)'],
    functionName: 'tokenURI(uint256)',
    args: tokenId !== undefined ? [tokenId] : undefined,
    enabled: Boolean(enabled && tokenId !== undefined),
    ...config,
  });
};
