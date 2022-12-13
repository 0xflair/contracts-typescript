import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';
import { Tier } from '../types';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useSaleTierConfig = (config: Config) => {
  const isValid =
    config.tierId !== undefined &&
    config.tierId !== null &&
    config.tierId !== '';

  const result = useContractRead<Tier & any[], ArgsType>({
    abi: [
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
    ],
    cacheTime: 24 * 60 * 60 * 1000,
    staleTime: 0,
    functionName: 'tiers(uint256)',
    args: isValid ? ([config.tierId] as ArgsType) : [0],
    enabled: config.enabled && isValid,
    ...config,
  });

  return {
    ...result,
    data: result?.data
      ? ({
          start: result.data[0].toString(),
          end: result.data[1].toString(),
          currency: result.data[2].toString(),
          price: result.data[3].toString(),
          maxPerWallet: result.data[4].toString(),
          merkleRoot: result.data[5].toString(),
          reserved: result.data[6].toString(),
          maxAllocation: result.data[7].toString(),
          isSavedOnChain: true,
        } as Tier)
      : undefined,
  };
};
