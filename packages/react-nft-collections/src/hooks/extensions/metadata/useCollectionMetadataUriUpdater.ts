import { Version } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BytesLike, Signer } from 'ethers';

type Config = {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider;
};

export const useCollectionMetadataUriUpdater = ({
  version,
  contractAddress,
  signerOrProvider,
}: Config) => {
  return useContractWriteAndWait<[BytesLike]>({
    contractKey:
      'collections/ERC721/extensions/ERC721CollectionMetadataExtension',
    version,
    contractAddress,
    signerOrProvider,
    functionName: 'setContractURI',
  });
};
