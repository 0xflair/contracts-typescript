import {
  PredefinedReadContractConfig,
  useContractRead,
  ZERO_ADDRESS,
} from '@0xflair/react-common';
import { BigNumberish, BytesLike } from 'ethers';
import { useCallback, useMemo, useState } from 'react';

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

  useMemo(() => {
    setData(undefined);
    setError(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.tierId]);

  const result = useContractRead<BigNumberish, ArgsType>({
    contractFqn: 'collections/ERC721/extensions/ERC721TieringExtension',
    functionName: 'eligibleForTier',
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
    onSettled(data, error: any) {
      if (error) {
        if (!['NOT_STARTED', 'NOT_ALLOWLISTED'].includes(error?.reason)) {
          setError(error);
        }
      } else {
        setData(data);
        setError(undefined);
      }
    },
    ...config,
  });

  const call = useCallback(
    async (overrides?: {
      tierId?: BigNumberish;
      minterAddress?: BytesLike;
      maxAllowance?: BigNumberish;
      merkleProof?: BytesLike[];
    }) => {
      setData(undefined);
      setError(undefined);

      try {
        return await result.call({
          args: [
            overrides?.tierId || config.tierId || 0,
            overrides?.minterAddress || config.minterAddress || ZERO_ADDRESS,
            overrides?.maxAllowance || config.maxAllowance || 1,
            overrides?.merkleProof || config.merkleProof || [],
          ] as ArgsType,
        });
      } catch (error: any) {
        if (
          [
            'NOT_STARTED',
            'MAXED_ALLOWANCE',
            'ALREADY_ENDED',
            'NOT_ALLOWLISTED',
          ].includes(error?.reason)
        ) {
          return 0;
        }

        setData(undefined);
        setError(undefined);
      }
    },
    [config, result],
  );

  return { ...result, error, data, call } as const;
};
