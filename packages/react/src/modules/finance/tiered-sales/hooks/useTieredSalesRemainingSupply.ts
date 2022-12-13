import { BigNumber, BigNumberish } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';
import { useSaleTierConfig } from './useSaleTierConfig';
import { useTieredSalesTotalMinted } from './useTieredSalesTotalMinted';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTieredSalesRemainingSupply = ({
  chainId,
  contractAddress,
  enabled = true,
  tierId,
  ...restOfConfig
}: Config) => {
  const [error, setError] = useState<Error | string>();
  const [data, setData] = useState<BigNumber>();

  const { call: getTierInfo } = useSaleTierConfig({
    chainId,
    contractAddress,
    tierId,
    enabled: enabled && tierId !== undefined,
  });

  const { call: getTierTotalMinted } = useTieredSalesTotalMinted({
    chainId,
    contractAddress,
    tierId,
    enabled: enabled && tierId !== undefined,
  });

  const hook = useContractRead<BigNumberish, ArgsType>({
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tierId',
            type: 'uint256',
          },
        ],
        name: 'remainingForTier',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    cacheTime: 24 * 60 * 60 * 1000,
    staleTime: 0,
    functionName: 'remainingForTier(uint256)',
    chainId,
    contractAddress,
    args: [tierId] as ArgsType,
    enabled: enabled && tierId !== undefined,
    ...restOfConfig,
  });

  const call = useCallback(
    async (tierId?: BigNumberish) => {
      try {
        setError(undefined);

        const remainingSupply = await hook.call(
          tierId !== undefined ? { args: [tierId] } : undefined,
        );
        const tierInfo = await getTierInfo(
          tierId !== undefined ? { args: [tierId] } : undefined,
        );
        const tierMinted = await getTierTotalMinted(
          tierId !== undefined ? { args: [tierId] } : undefined,
        );

        if (
          remainingSupply === undefined ||
          tierInfo === undefined ||
          tierMinted === undefined
        ) {
          setData(undefined);
          return undefined;
        }

        const remainingForTier = BigNumber.from(remainingSupply || 0);
        const maxAllocation = BigNumber.from(tierInfo.maxAllocation || 0);
        const mintedSupply = BigNumber.from(tierMinted || 0);

        if (maxAllocation.gt(0)) {
          if (maxAllocation.gt(mintedSupply)) {
            if (maxAllocation.sub(mintedSupply).lt(remainingForTier)) {
              return maxAllocation.sub(mintedSupply);
            }
          } else {
            return BigNumber.from(0);
          }
        }

        setData(remainingForTier);
        return remainingForTier;
      } catch (error: any) {
        setData(undefined);
        setError(error);
      }
    },
    [getTierInfo, getTierTotalMinted, hook],
  );

  useEffect(() => {
    if (enabled && tierId !== undefined) {
      call();
    }
  }, [call, enabled, tierId]);

  return {
    ...hook,
    error: error || hook.error,
    data,
    call,
  } as const;
};
