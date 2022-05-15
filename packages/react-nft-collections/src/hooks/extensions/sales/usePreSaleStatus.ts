import { ContractVersion } from '@0xflair/contracts-registry';
import { ReadContractConfig, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const usePreSaleStatus = ({
  contractAddress,
  contractVersion,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead<boolean>({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'preSaleStatus',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
