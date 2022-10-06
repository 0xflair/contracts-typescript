import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig } from '../../../../common';
import { useSaleTierConfig } from './useSaleTierConfig';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTieredSalesMaxAllocation = ({
  chainId,
  contractAddress,
  enabled,
  tierId,
  ...restOfConfig
}: Config) => {
  const result = useSaleTierConfig({
    chainId,
    contractAddress,
    tierId,
    enabled,
    ...restOfConfig,
  });

  return {
    ...result,
    data: result.data?.maxAllocation,
  } as const;
};
