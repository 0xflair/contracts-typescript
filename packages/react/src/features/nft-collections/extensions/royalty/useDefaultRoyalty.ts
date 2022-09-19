import { BigNumberish, BytesLike } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../../../common';

export const useDefaultRoyalty = (config: PredefinedReadContractConfig) => {
  const { data, ...rest } = useContractRead<
    [receiver: BytesLike, bps: BigNumberish]
  >({
    contractFqn: 'collections/ERC721/extensions/ERC721RoyaltyExtension',
    functionName: 'defaultRoyalty',
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
