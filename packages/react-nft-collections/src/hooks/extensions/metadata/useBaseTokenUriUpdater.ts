import { Version } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { BytesLike } from '@ethersproject/bytes';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider;
  args?: [BytesLike];
};

export const useBaseTokenUriUpdater = ({
  contractAddress,
  version,
  signerOrProvider,
  args,
}: Config) => {
  return useContractWriteAndWait({
    version,
    contractKey:
      'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'setBaseURI',
    args,
  });
};
