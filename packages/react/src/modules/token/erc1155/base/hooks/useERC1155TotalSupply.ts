import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react';
import { BigNumberish } from 'ethers';

type ArgsType = [tokenId: BigNumberish];

type Config = {
  tokenId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useERC1155TotalSupply = ({
  chainId,
  contractAddress,
  enabled = true,
  tokenId,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractReference:
      'flair-sdk:token/ERC1155/extensions/supply/IERC1155Supply',
    functionName: 'totalSupply',
    args: [tokenId] as ArgsType,
    enabled: Boolean(enabled && tokenId),
    ...restOfConfig,
  });
};
