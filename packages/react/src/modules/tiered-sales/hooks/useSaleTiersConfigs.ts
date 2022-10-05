import '@wagmi/core';

import { findContractByReference } from '@flair-sdk/registry';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import _ from 'lodash';
import { useMemo } from 'react';

import { PredefinedReadContractConfig } from '../../../common';
import { useMultiCallRead } from '../../../common/hooks/useMultiCallRead';
import { Tier } from '../types';
import { normalizeTiers } from '../util';

type ArgsType = [tierId: BigNumberish];

type Config = {
  chainId?: number;
  contractAddress?: string;
  enabled?: boolean;
} & PredefinedReadContractConfig<ArgsType>;

export const useSaleTiersConfigs = ({
  chainId,
  contractAddress,
  enabled,
}: Config) => {
  const contractInterface = useMemo(() => {
    return new ethers.utils.Interface([
      'function tiers(uint256) view returns ((uint256,uint256,address,uint256,uint256,bytes32,uint256,uint256))',
    ]);
  }, []);

  // Create an array of calls to get tiers by index from 0 to 20
  const calls = useMemo(() => {
    const calls = [];
    for (let i = 0; i < 20; i++) {
      calls.push({
        id: `tier-${i}`,
        function: 'tiers(uint256)',
        args: [i],
      });
    }
    return calls;
  }, []);

  const result = useMultiCallRead<Tier[]>({
    chainId,
    addressOrName: contractAddress as string,
    contractInterface,
    enabled: Boolean(enabled && contractAddress),
    calls,
  });

  const normalizedTiers = useMemo(() => {
    if (!result.data) return undefined;
    const tiers = normalizeTiers(_.fromPairs(_.toPairs(result.data || [])));
    return _.fromPairs(
      _.toPairs(tiers || {}).filter(
        ([, tier]) =>
          tier.maxAllocation && BigNumber.from(tier.maxAllocation).gt(0),
      ),
    );
  }, [result.data]);

  return {
    ...result,
    data: normalizedTiers,
  };
};
