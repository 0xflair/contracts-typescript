import { BigNumberish, BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

type Config = PredefinedReadContractConfig & {
  walletAddress?: BytesLike;
};

type ArgsType = [walletAddress?: BigNumberish];

export const useERC721Balance = ({
  walletAddress,
  enabled,
  ...config
}: Config) => {
  return useContractRead<BytesLike, ArgsType>({
    contractInterface: ['function balanceOf(address) view returns (uint256)'],
    functionName: 'balanceOf(address)',
    args: walletAddress !== undefined ? [walletAddress] : undefined,
    enabled: Boolean(enabled && walletAddress !== undefined),
    ...config,
  });
};
