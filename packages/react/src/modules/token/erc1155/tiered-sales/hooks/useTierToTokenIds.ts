import { BigNumberish, BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

type ArgsType = [tierIds: BigNumberish[]];

type Config = {
  tierIds?: BigNumberish[];
} & PredefinedReadContractConfig<ArgsType>;

export const useTierToTokenIds = ({
  enabled = true,
  tierIds,
  ...restOfConfig
}: Config) => {
  const result = useContractRead<BigNumberish[], ArgsType>({
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256[]',
            name: 'tierIds',
            type: 'uint256[]',
          },
        ],
        name: 'tierToTokenId',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'tierToTokenId(uint256[])',
    args: (tierIds?.length ? [tierIds] : []) as ArgsType,
    enabled: Boolean(enabled && tierIds?.length),
    ...restOfConfig,
  });

  // Create a mapping from token ID to URI
  const mapping =
    tierIds &&
    result.data?.reduce((acc, tokenId, index) => {
      if (tierIds[index]) {
        acc[tierIds[index].toString()] = tokenId?.toString();
      }
      return acc;
    }, {} as Record<string, BytesLike>);

  return { ...result, data: mapping } as const;
};
