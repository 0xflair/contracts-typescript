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
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tierId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'minter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'maxAllowance',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proof',
            type: 'bytes32[]',
          },
        ],
        name: 'eligibleForTier',
        outputs: [
          {
            internalType: 'uint256',
            name: 'maxMintable',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'eligibleForTier(uint256,address,uint256,bytes32[])',
    cacheOnBlock: false,
    cacheTime: 24 * 60 * 60 * 1000,
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
