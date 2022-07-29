import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

import { Tier } from '../types';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTierSaleInformation = (config: Config) => {
  const result = useContractRead<any[], ArgsType>({
    contractFqn: 'collections/ERC721/extensions/ERC721TieringExtension',
    functionName: 'tiers',
    args: [config.tierId] as ArgsType,
    enabled: config.enabled && config.tierId !== undefined,
    ...config,
  });

  return {
    ...result,
    data: result?.data
      ? ({
          start: result.data[0],
          end: result.data[1],
          currency: result.data[2],
          price: result.data[3].toString(),
          maxPerWallet: result.data[4],
          merkleRoot: result.data[5],
          reserved: result.data[6],
          maxAllocation: result.data[7],
          isSavedOnChain: true,
        } as Tier)
      : undefined,
  };
};
