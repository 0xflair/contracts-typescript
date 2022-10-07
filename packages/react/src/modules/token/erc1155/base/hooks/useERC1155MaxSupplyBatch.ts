import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

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
    contractInterface: [
      'function maxSupplyBatch(uint256[] tokenIds) external view returns (uint256[])',
    ],
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
