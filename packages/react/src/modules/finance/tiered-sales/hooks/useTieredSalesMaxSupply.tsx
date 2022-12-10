import { BigNumber, BigNumberish } from 'ethers';
import { useMemo } from 'react';

import { PredefinedReadContractConfig } from '../../../../common';
import { useTieredSalesRemainingSupply } from './useTieredSalesRemainingSupply';
import { useTieredSalesReservedSupply } from './useTieredSalesReservedSupply';
import { useTieredSalesTotalMinted } from './useTieredSalesTotalMinted';

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<any>;

export const useTieredSalesMaxSupply = ({
  tierId,
  chainId,
  contractAddress,
  ...restOfConfig
}: Config) => {
  const {
    data: totalMinted,
    error: totalMintedError,
    isLoading: totalMintedLoading,
  } = useTieredSalesTotalMinted({
    chainId,
    contractAddress,
    tierId,
    ...restOfConfig,
  });

  const {
    data: totalRemaining,
    error: totalRemainingError,
    isLoading: totalRemainingLoading,
  } = useTieredSalesRemainingSupply({
    chainId,
    contractAddress,
    tierId: tierId,
    ...restOfConfig,
  });

  const {
    data: totalReserved,
    error: totalReservedError,
    isLoading: totalReservedLoading,
  } = useTieredSalesReservedSupply({
    chainId,
    contractAddress,
    tierId: tierId,
    ...restOfConfig,
  });

  const data = useMemo(() => {
    let data = BigNumber.from(totalMinted || '0').add(
      BigNumber.from(totalRemaining || '0'),
    );

    if (BigNumber.from(totalReserved || '0').gt(data)) {
      data = BigNumber.from(totalReserved || '0');
    }

    return data;
  }, [totalMinted, totalRemaining, totalReserved]);

  return {
    data,
    error: totalMintedError || totalRemainingError || totalReservedError,
    isLoading:
      totalMintedLoading || totalRemainingLoading || totalReservedLoading,
  } as const;
};
