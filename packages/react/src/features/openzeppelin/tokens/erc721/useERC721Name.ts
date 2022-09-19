import { BytesLike } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../../../common';

export const useERC721Name = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractFqn: 'openzeppelin/token/ERC721/extensions/IERC721Metadata',
    functionName: 'name',
    ...config,
  });
};
