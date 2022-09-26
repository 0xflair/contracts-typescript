import { BigNumber, BigNumberish } from 'ethers';
import { useMemo } from 'react';

import { PredefinedReadContractConfig } from '../../../common';
import { useContractRead } from '../../../common/hooks/useContractRead';
import { useSaleTier } from './useSaleTier';
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
  const { data: tierInfo } = useSaleTier({
    chainId,
    contractAddress,
    tierId,
    enabled: enabled && tierId !== undefined,
  });

  const { data: tierSupply } = useTieredSalesTotalMinted({
    chainId,
    contractAddress,
    tierId,
    enabled: enabled && tierId !== undefined,
  });

  const result = useContractRead<BigNumberish, ArgsType>({
    contractReference: 'flair-sdk:finance/sales/ITieredSales',
    functionName: 'remainingForTier',
    chainId,
    contractAddress,
    args: [tierId] as ArgsType,
    enabled: enabled && tierId !== undefined,
    ...restOfConfig,
  });

  const data = useMemo(() => {
    if (
      result.data === undefined ||
      tierInfo === undefined ||
      tierSupply === undefined
    ) {
      return undefined;
    }

    const remainingForTier = BigNumber.from(result.data || 0);
    const maxAllocation = BigNumber.from(tierInfo.maxAllocation || 0);
    const mintedSupply = BigNumber.from(tierSupply || 0);

    if (maxAllocation.gt(0)) {
      if (maxAllocation.sub(mintedSupply).lt(remainingForTier)) {
        return maxAllocation.sub(mintedSupply);
      }
    }

    return remainingForTier;
  }, [result, tierInfo, tierSupply]);

  return {
    ...result,
    data,
  } as const;
};
