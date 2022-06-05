import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
import { BytesLike } from '@ethersproject/bytes';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  args?: [BytesLike];
};

export const useBaseTokenUriUpdater = ({
  contractAddress,
  contractVersion,
  signerOrProvider,
  args,
}: Config) => {
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn:
      'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
  });

  return useContractWriteAndWait({
    contractInterface,
    contractAddress,
    signerOrProvider,
    functionName: 'setBaseURI',
    args,
  });
};
