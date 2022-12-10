import { BigNumberish, BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useDefaultRoyalty = (config: PredefinedReadContractConfig) => {
  const { data, ...rest } = useContractRead<
    [receiver: BytesLike, bps: BigNumberish]
  >({
    abi: [
      {
        inputs: [],
        name: 'defaultRoyalty',
        outputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              {
                internalType: 'uint16',
                name: 'bps',
                type: 'uint16',
              },
            ],
            internalType: 'struct IRoyaltyInternal.TokenRoyalty',
            name: '',
            type: 'tuple',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'defaultRoyalty()',
    ...config,
  });

  return {
    data: {
      receiver: data?.[0],
      bps: data?.[1],
      percent: data?.[1] !== undefined ? Number(data[1]) / 100 : undefined,
    },
    ...rest,
  };
};
