import { BigNumberish, BytesLike, ethers } from 'ethers';
import { useMemo } from 'react';

import {
  PredefinedReadContractConfig,
  useMultiCallRead,
} from '../../../../common';

type ArgsType = [tokenIds: BigNumberish[]];

type Config = {
  tokenIds?: BigNumberish[];
} & PredefinedReadContractConfig<ArgsType>;

export const useTokenMetadataUriBatch = ({
  chainId,
  contractAddress,
  enabled = true,
  tokenIds,
  contractInterface: _contractInterface,
  ...restOfConfig
}: Config) => {
  const contractInterface = useMemo(() => {
    return new ethers.utils.Interface([
      'function uri(uint256) view returns (string)',
    ]);
  }, []);

  const result = useMultiCallRead<BytesLike[]>({
    chainId,
    addressOrName: contractAddress as string,
    contractInterface,
    enabled: Boolean(enabled && contractAddress),
    calls: tokenIds?.length
      ? tokenIds.map((tokenId) => ({
          id: `token-${tokenId}`,
          function: 'uri(uint256)',
          args: [tokenId],
        }))
      : [],
    ...restOfConfig,
  });

  // Create a mapping from token ID to URI
  const mapping =
    tokenIds &&
    result.data?.reduce((acc, uri, index) => {
      acc[tokenIds[index].toString()] = uri;
      return acc;
    }, {} as Record<string, BytesLike>);

  return { ...result, data: mapping } as const;
};
