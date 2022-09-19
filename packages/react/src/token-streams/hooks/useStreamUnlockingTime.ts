import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../common';

type ArgsType = [BigNumberish | BigNumberish[] | []];

export const useStreamUnlockingTime = (
  config: PredefinedReadContractConfig<ArgsType>,
) => {
  return useContractRead<BigNumberish[], ArgsType>({
    contractFqn: 'streams/ERC721/extensions/ERC721StakingExtension',
    functionName: Array.isArray(config.args?.[0])
      ? 'unlockingTime(uint256[])'
      : 'unlockingTime(uint256)',
    ...config,
  });
};
