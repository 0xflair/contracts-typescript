import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react-common';
import { BigNumberish } from 'ethers';

export const usePublicSaleMaxMintPerTx = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
    functionName: 'publicSaleMaxMintPerTx',
    ...config,
  });
};
