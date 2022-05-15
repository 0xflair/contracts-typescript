import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const useBaseTokenUriFreezer = ({
  contractAddress,
  contractVersion,
  signerOrProvider,
}: Config) => {
  return useContractWriteAndWait({
    contractVersion,
    contractFqn:
      'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'freezeBaseURI',
  });
};
