import { PredefinedReadContractConfig } from '@0xflair/react-common';
import { BigNumber, BigNumberish } from 'ethers';
import { useMemo } from 'react';

import { useTierSaleReserved } from '.';
import { useTierSaleRemaining } from './useTierSaleRemaining';
import { useTierSaleTotalMinted } from './useTierSaleTotalMinted';

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<any>;

export const useTierSaleTotalSupply = ({
  tierId,
  chainId,
  contractAddress,
  contractVersion,
  ...restOfConfig
}: Config) => {
  const {
    data: totalMinted,
    error: totalMintedError,
    isLoading: totalMintedLoading,
  } = useTierSaleTotalMinted({
    chainId,
    contractAddress,
    contractVersion,
    tierId,
    ...restOfConfig,
  });

  const {
    data: totalRemaining,
    error: totalRemainingError,
    isLoading: totalRemainingLoading,
  } = useTierSaleRemaining({
    chainId,
    contractAddress,
    contractVersion,
    tierId: tierId,
    ...restOfConfig,
  });

  const {
    data: totalReserved,
    error: totalReservedError,
    isLoading: totalReservedLoading,
  } = useTierSaleReserved({
    chainId,
    contractAddress,
    contractVersion,
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
