import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';
import { Tier } from '../types';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useSaleTierConfig = (config: Config) => {
  const isValid =
    config.tierId !== undefined &&
    config.tierId !== null &&
    config.tierId !== '';

  const result = useContractRead<Tier & any[], ArgsType>({
    contractInterface: [
      'function tiers(uint256) view returns ((uint256 start,uint256 end,address currency,uint256 price,uint256 maxPerWallet,bytes32 merkleRoot,uint256 reserved,uint256 maxAllocation))',
    ],
    cacheTime: 60,
    staleTime: 5,
    functionName: 'tiers(uint256)',
    args: isValid ? ([config.tierId] as ArgsType) : [0],
    enabled: config.enabled && isValid,
    ...config,
  });

  return {
    ...result,
    data: result?.data
      ? ({
          start: result.data[0].toString(),
          end: result.data[1].toString(),
          currency: result.data[2].toString(),
          price: result.data[3].toString(),
          maxPerWallet: result.data[4].toString(),
          merkleRoot: result.data[5].toString(),
          reserved: result.data[6].toString(),
          maxAllocation: result.data[7].toString(),
          isSavedOnChain: true,
        } as Tier)
      : undefined,
  };
};
