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
  chainId,
  contractAddress,
  enabled = true,
  tierIds,
  ...restOfConfig
}: Config) => {
  const result = useContractRead<BigNumberish[], ArgsType>({
    contractReference:
      'flair-sdk:token/ERC1155/facets/sales/ERC1155TieredSales',
    functionName: 'tierToTokenId(uint256[])',
    chainId,
    contractAddress,
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
