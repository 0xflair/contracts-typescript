import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig } from '../../../../common';
import { useContractRead } from '../../../../common/hooks/useContractRead';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTieredSalesTotalMinted = (config: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tierId',
            type: 'uint256',
          },
        ],
        name: 'tierMints',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    cacheTime: 24 * 60 * 60 * 1000,
    staleTime: 0,
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
