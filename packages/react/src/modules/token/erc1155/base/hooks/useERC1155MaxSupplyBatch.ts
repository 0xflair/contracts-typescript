import { BigNumberish, BytesLike, ethers } from 'ethers';
import { useMemo } from 'react';

import { PredefinedReadContractConfig } from '../../../../../common';
import { useMultiCallRead } from '../../../../../common/hooks/useMultiCallRead';

type ArgsType = [tokenIds: BigNumberish[]];

type Config = {
  tokenIds?: BigNumberish[];
} & PredefinedReadContractConfig<ArgsType>;

export const useERC1155MaxSupplyBatch = ({
  chainId,
  contractAddress,
  enabled = true,
  tokenIds,
  contractInterface: _contractInterface,
  ...restOfConfig
}: Config) => {
  const contractInterface = useMemo(() => {
    return new ethers.utils.Interface([
      'function maxSupply(uint256 tokenId) external view returns (uint256)',
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
          function: 'maxSupply(uint256)',
          args: [tokenId],
        }))
      : [],
    ...restOfConfig,
  });

  // Create a mapping from token ID to URI
  const mapping =
    tokenIds &&
    result.data?.reduce((acc, value, index) => {
      acc[tokenIds[index].toString()] = value;
      return acc;
    }, {} as Record<string, BigNumberish>);

  return { ...result, data: mapping } as const;
};
