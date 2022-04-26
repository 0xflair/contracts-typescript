import { Version } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider;
};

export const useBaseTokenUriFreezer = ({
  contractAddress,
  version,
  signerOrProvider,
}: Config) => {
  return useContractWriteAndWait({
    version,
    contractKey:
      'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'freezeBaseURI',
  });
};
