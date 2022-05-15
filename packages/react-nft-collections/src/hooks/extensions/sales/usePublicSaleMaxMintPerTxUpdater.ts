import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BytesLike, Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  newValue?: BytesLike;
};

type ArgsType = [newValue: BytesLike];

export const usePublicSaleMaxMintPerTxUpdater = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  newValue,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
    functionName: 'setPublicSaleMaxMintPerTx',
    contractAddress,
    signerOrProvider,
    args: [newValue] as ArgsType,
  });
};
