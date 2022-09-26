import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig } from '../../../common';
import { useSaleTier } from './useSaleTier';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTieredSalesReservedSupply = ({
  chainId,
  contractAddress,
  enabled,
  tierId,
  ...restOfConfig
}: Config) => {
  const result = useSaleTier({
    chainId,
    contractAddress,
    tierId,
    enabled,
    ...restOfConfig,
  });

  return {
    ...result,
    data: result.data?.reserved,
  } as const;
};
