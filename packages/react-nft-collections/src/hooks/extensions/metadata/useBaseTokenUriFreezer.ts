import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
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
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn:
      'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
  });

  return useContractWriteAndWait({
    contractInterface,
    contractAddress,
    signerOrProvider,
    functionName: 'freezeBaseURI',
  });
};
