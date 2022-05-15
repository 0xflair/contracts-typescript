import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BytesLike, Signer } from 'ethers';

type Config = {
  version?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const useCollectionMetadataUriUpdater = ({
  version,
  contractAddress,
  signerOrProvider,
}: Config) => {
  return useContractWriteAndWait<[BytesLike]>({
    contractFqn:
      'collections/ERC721/extensions/ERC721CollectionMetadataExtension',
    version,
    contractAddress,
    signerOrProvider,
    functionName: 'setContractURI',
  });
};
