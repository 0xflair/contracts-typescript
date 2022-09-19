import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../common';

type ArgsType = [];

export const useStreamMinStakingDuration = (
  config: PredefinedReadContractConfig<ArgsType>,
) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractFqn: 'streams/ERC721/extensions/ERC721StakingExtension',
    functionName: 'minStakingDuration',
    ...config,
  });
};
