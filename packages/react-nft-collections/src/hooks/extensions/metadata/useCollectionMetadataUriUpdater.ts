import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BytesLike, Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const useCollectionMetadataUriUpdater = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
}: Config) => {
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn:
      'collections/ERC721/extensions/ERC721CollectionMetadataExtension',
  });

  return useContractWriteAndWait<[BytesLike]>({
    contractInterface,
    contractAddress,
    signerOrProvider,
    functionName: 'setContractURI',
  });
};
