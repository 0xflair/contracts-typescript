import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../../common';

type ArgsType = [];

export const useStreamClaimLockedUntil = (
  config: PredefinedReadContractConfig<ArgsType>,
) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractFqn: 'streams/ERC721/extensions/ERC721LockableClaimExtension',
    functionName: 'claimLockedUntil',
    ...config,
  });
};
