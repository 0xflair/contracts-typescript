import '@wagmi/core';

import { BigNumber, BigNumberish, ethers } from 'ethers';
import _ from 'lodash';
import { useMemo } from 'react';

import { PredefinedReadContractConfig } from '../../../../common';
import { useMultiCallRead } from '../../../../common/hooks/useMultiCallRead';
import { Tier } from '../types';
import { normalizeTiers } from '../util';

type ArgsType = [tierId: BigNumberish];

type Config = {
  chainId?: number;
  contractAddress?: `0x${string}`;
  enabled?: boolean;
} & PredefinedReadContractConfig<ArgsType>;

const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tierId',
        type: 'uint256',
      },
    ],
    name: 'tiers',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'start',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'end',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxPerWallet',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'merkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'reserved',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxAllocation',
            type: 'uint256',
          },
        ],
        internalType: 'struct ITieredSalesInternal.Tier',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const useSaleTiersConfigs = ({
  chainId,
  contractAddress,
  enabled,
  cacheTime,
  staleTime,
  cacheOnBlock,
}: Config) => {
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
    address: contractAddress || ethers.constants.AddressZero,
    abi,
    enabled: Boolean(enabled && contractAddress),
    calls,
    cacheTime: cacheTime || 24 * 60 * 60 * 1000,
    staleTime: staleTime || 0,
    cacheOnBlock: cacheOnBlock || false,
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
  } as const;
};
