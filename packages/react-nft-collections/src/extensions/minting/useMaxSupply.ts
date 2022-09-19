import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react-common';
import { BigNumberish } from 'ethers';

export const useMaxSupply = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'collections/ERC721/extensions/ERC721AutoIdMinterExtension',
    functionName: 'maxSupply',
    ...config,
  });
};
