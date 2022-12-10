import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig } from '../../../../common';
import { useSaleTierConfig } from './useSaleTierConfig';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTieredSalesReservedSupply = (config: Config) => {
  const result = useSaleTierConfig(config);

  return {
    ...result,
    data: result.data?.reserved,
  } as const;
};
