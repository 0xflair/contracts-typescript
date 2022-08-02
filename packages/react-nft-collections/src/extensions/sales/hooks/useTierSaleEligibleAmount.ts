import {
  PredefinedReadContractConfig,
  useContractRead,
  ZERO_ADDRESS,
} from '@0xflair/react-common';
import { BigNumberish, BytesLike } from 'ethers';
import { useState } from 'react';

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

export const useTierSaleEligibleAmount = (config: Config) => {
  const [data, setData] = useState<BigNumberish | undefined>();
  const [error, setError] = useState();

  const result = useContractRead<BigNumberish, ArgsType>({
    contractFqn: 'collections/ERC721/extensions/ERC721TieringExtension',
    functionName: 'eligibleForTier',
    cacheOnBlock: false,
    cacheTime: 1,
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
    onSettled(data, error: any) {
      if (error) {
        if (
          [
            'NOT_STARTED',
            'MAXED_ALLOWANCE',
            'ALREADY_ENDED',
            'NOT_ALLOWLISTED',
          ].includes(error?.reason)
        ) {
          setData(0);
        }

        setError(error);
      } else {
        setData(data);
        setError(undefined);
      }
    },
    ...config,
  });

  return { ...result, error, data };
};
