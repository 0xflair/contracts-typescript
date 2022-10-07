import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig } from '../../../../common';
import { useContractRead } from '../../../../common/hooks/useContractRead';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTieredSalesTotalMinted = (config: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractInterface: [
      'function tierMints(uint256 tierId) external view returns (uint256)',
    ],
    cacheTime: 10,
    staleTime: 2,
    functionName: 'tierMints(uint256)',
    args: [config.tierId] as ArgsType,
    enabled:
      config.enabled &&
      config.tierId !== undefined &&
      config.tierId !== null &&
      config.tierId !== '',
    ...config,
  });
};
