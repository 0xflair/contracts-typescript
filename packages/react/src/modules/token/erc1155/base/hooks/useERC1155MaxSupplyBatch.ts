import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react';
import { BigNumberish } from 'ethers';

type ArgsType = [tokenIds: BigNumberish[]];

type Config = {
  tokenIds?: BigNumberish[];
} & PredefinedReadContractConfig<ArgsType>;

export const useERC1155MaxSupplyBatch = ({
  chainId,
  contractAddress,
  enabled = true,
  tokenIds,
  ...restOfConfig
}: Config) => {
  const result = useContractRead<BigNumberish[], ArgsType>({
    contractReference:
      'flair-sdk:token/ERC1155/extensions/supply/IERC1155SupplyExtra',
    functionName: 'maxSupplyBatch(uint256[])',
    chainId,
    contractAddress,
    args: (tokenIds?.length ? [tokenIds] : []) as ArgsType,
    enabled: Boolean(enabled && tokenIds?.length),
    ...restOfConfig,
  });

  // Create a mapping from token ID to maxSupply
  const mapping =
    tokenIds &&
    result.data?.reduce((acc, maxSupply, index) => {
      acc[tokenIds[index].toString()] = maxSupply?.toString();
      return acc;
    }, {} as Record<string, BigNumberish>);

  return { ...result, data: mapping } as const;
};
