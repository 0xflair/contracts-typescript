import { BytesLike } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../../common';

export const useERC20Symbol = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractFqn: 'openzeppelin/token/ERC20/ERC20',
    functionName: 'symbol',
    ...config,
  });
};
