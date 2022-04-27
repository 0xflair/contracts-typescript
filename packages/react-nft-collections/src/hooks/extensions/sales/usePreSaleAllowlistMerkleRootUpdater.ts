import { Version } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BytesLike, Signer } from 'ethers';

type Config = {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  newRoot?: BytesLike;
};

type ArgsType = [newRoot: BytesLike];

export const usePreSaleAllowlistMerkleRootUpdater = ({
  version,
  contractAddress,
  signerOrProvider,
  newRoot,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'setAllowlistMerkleRoot',
    contractAddress,
    signerOrProvider,
    args: [newRoot] as ArgsType,
  });
};
