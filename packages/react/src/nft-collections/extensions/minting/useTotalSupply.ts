import { BigNumberish } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../../common';

export const useTotalSupply = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'collections/ERC721/extensions/ERC721AutoIdMinterExtension',
    functionName: 'totalSupply',
    ...config,
  });
};
