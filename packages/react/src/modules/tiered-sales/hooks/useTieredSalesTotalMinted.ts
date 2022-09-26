import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig } from '../../../common';
import { useContractRead } from '../../../common/hooks/useContractRead';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTieredSalesTotalMinted = (config: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractReference: 'flair-sdk:finance/sales/ITieredSales',
    functionName: 'tierMints',
    args: [config.tierId] as ArgsType,
    enabled:
      config.enabled &&
      config.tierId !== undefined &&
      config.tierId !== null &&
      config.tierId !== '',
    ...config,
  });
};
