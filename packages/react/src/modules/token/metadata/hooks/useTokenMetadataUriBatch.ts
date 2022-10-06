import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react';
import { BigNumberish, BytesLike } from 'ethers';

type ArgsType = [tokenIds: BigNumberish[]];

type Config = {
  tokenIds?: BigNumberish[];
} & PredefinedReadContractConfig<ArgsType>;

export const useTokenMetadataUriBatch = ({
  chainId,
  contractAddress,
  enabled = true,
  tokenIds,
  ...restOfConfig
}: Config) => {
  const result = useContractRead<BytesLike[], ArgsType>({
    contractReference:
      'flair-sdk:token/ERC1155/facets/metadata/IERC1155MetadataExtra',
    functionName: 'uriBatch(uint256[])',
    chainId,
    contractAddress,
    args: (tokenIds?.length ? [tokenIds] : []) as ArgsType,
    enabled: Boolean(enabled && tokenIds?.length),
    ...restOfConfig,
  });

  // Create a mapping from token ID to URI
  const mapping =
    tokenIds &&
    result.data?.reduce((acc, uri, index) => {
      if (tokenIds[index]) {
        acc[tokenIds[index].toString()] = uri;
      }
      return acc;
    }, {} as Record<string, BytesLike>);

  return { ...result, data: mapping } as const;
};
