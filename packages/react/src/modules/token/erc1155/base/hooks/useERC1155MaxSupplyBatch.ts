import { BigNumberish, BytesLike } from 'ethers';

import { PredefinedReadContractConfig } from '../../../../../common';
import { useMultiCallRead } from '../../../../../common/hooks/useMultiCallRead';

type ArgsType = [tokenIds: BigNumberish[]];

type Config = {
  tokenIds?: BigNumberish[];
} & PredefinedReadContractConfig<ArgsType>;

export const useERC1155MaxSupplyBatch = ({
  enabled = true,
  tokenIds,
  ...restOfConfig
}: Config) => {
  const result = useMultiCallRead<BytesLike[]>({
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'maxSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    enabled,
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
