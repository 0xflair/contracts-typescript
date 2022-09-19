import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react-common';
import { BytesLike } from 'ethers';

export const useERC721Name = (config: PredefinedReadContractConfig) => {
  return useContractRead<BytesLike>({
    contractFqn: 'openzeppelin/token/ERC721/extensions/IERC721Metadata',
    functionName: 'name',
    ...config,
  });
};
