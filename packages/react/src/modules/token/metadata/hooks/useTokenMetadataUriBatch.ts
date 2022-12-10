import { BigNumberish, BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useMultiCallRead,
} from '../../../../common';

type ArgsType = [tokenIds: BigNumberish[]];

type Config = {
  tokenIds?: BigNumberish[];
} & PredefinedReadContractConfig<ArgsType>;

export const useTokenMetadataUriBatch = ({
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
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'uri',
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
    enabled,
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
