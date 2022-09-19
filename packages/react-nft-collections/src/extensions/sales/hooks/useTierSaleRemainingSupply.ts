import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react-common';
import { BigNumber, BigNumberish } from 'ethers';
import { useMemo } from 'react';

import { useTierSaleInformation } from './useTierSaleInformation';
import { useTierSaleTotalSupply } from './useTierSaleTotalSupply';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTierSaleRemainingSupply = ({
  chainId,
  contractAddress,
  enabled = true,
  tierId,
  ...restOfConfig
}: Config) => {
  const { data: tierInfo } = useTierSaleInformation({
    chainId,
    contractAddress,
    tierId,
    enabled: enabled && tierId !== undefined,
  });

  const { data: tierSupply } = useTierSaleTotalSupply({
    chainId,
    contractAddress,
    tierId,
    enabled: enabled && tierId !== undefined,
  });

  const result = useContractRead<BigNumberish, ArgsType>({
    contractFqn: 'collections/ERC721/extensions/ERC721TieringExtension',
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
