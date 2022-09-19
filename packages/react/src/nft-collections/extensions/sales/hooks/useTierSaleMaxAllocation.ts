import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig } from '../../../../common';
import { useTierSaleInformation } from './useTierSaleInformation';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTierSaleMaxAllocation = ({
  chainId,
  contractAddress,
  enabled,
  tierId,
  ...restOfConfig
}: Config) => {
  const result = useTierSaleInformation({
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
