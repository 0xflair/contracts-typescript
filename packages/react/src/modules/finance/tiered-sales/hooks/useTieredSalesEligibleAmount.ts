import { ZERO_ADDRESS } from '@flair-sdk/common';
import { BigNumberish, BytesLike } from 'ethers';

import { PredefinedReadContractConfig } from '../../../../common';
import { useContractRead } from '../../../../common/hooks/useContractRead';

type ArgsType = [
  tierId: BigNumberish,
  minterAddress: BytesLike,
  maxAllowance: BigNumberish,
  merkleProof: BytesLike[],
];

type Config = {
  tierId?: BigNumberish;
  minterAddress?: BytesLike;
  maxAllowance?: BigNumberish;
  merkleProof?: BytesLike[];
} & PredefinedReadContractConfig<ArgsType>;

export const useTieredSalesEligibleAmount = (config: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractInterface: [
      'function eligibleForTier(uint256 tierId,address minter,uint256 maxAllowance,bytes32[] calldata proof) external view returns (uint256)',
    ],
    functionName: 'eligibleForTier(uint256,address,uint256,bytes32[])',
    cacheOnBlock: false,
    cacheTime: 0,
    staleTime: 0,
    args: [
      config.tierId || 0,
      config.minterAddress || ZERO_ADDRESS,
      config.maxAllowance || 1,
      config.merkleProof || [],
    ] as ArgsType,
    enabled:
      config.enabled &&
      config.tierId !== undefined &&
      config.minterAddress !== undefined,
    ...config,
  });
};
