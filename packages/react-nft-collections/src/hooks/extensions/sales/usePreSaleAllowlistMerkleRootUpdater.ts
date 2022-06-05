import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BytesLike, Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  newRoot?: BytesLike;
};

type ArgsType = [newRoot: BytesLike];

export const usePreSaleAllowlistMerkleRootUpdater = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  newRoot,
}: Config) => {
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'setAllowlistMerkleRoot',
    contractAddress,
    signerOrProvider,
    args: [newRoot] as ArgsType,
  });
};
