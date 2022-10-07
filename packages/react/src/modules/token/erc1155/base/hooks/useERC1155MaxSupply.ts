import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

type ArgsType = [tokenId: BigNumberish];

type Config = {
  tokenId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useERC1155MaxSupply = ({
  chainId,
  contractAddress,
  enabled = true,
  tokenId,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractInterface: [
      'function maxSupply(uint256 tokenId) external view returns (uint256)',
    ],
    chainId,
    contractAddress,
    functionName: 'maxSupply(uint256)',
    args: [tokenId] as ArgsType,
    enabled: Boolean(enabled && tokenId),
    ...restOfConfig,
  });
};
