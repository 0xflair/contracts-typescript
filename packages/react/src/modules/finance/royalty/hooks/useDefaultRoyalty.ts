import { BigNumberish, BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useDefaultRoyalty = (config: PredefinedReadContractConfig) => {
  const { data, ...rest } = useContractRead<
    [receiver: BytesLike, bps: BigNumberish]
  >({
    contractInterface: [
      'function defaultRoyalty() view returns (address,uint16)',
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
