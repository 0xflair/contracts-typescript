import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTierSaleTotalSupply = (config: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractFqn: 'collections/ERC721/extensions/ERC721TieringExtension',
    functionName: 'tierMints',
    args: [config.tierId] as ArgsType,
    enabled: config.enabled && config.tierId !== undefined,
    ...config,
  });
};
