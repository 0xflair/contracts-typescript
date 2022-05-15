import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  newLimit?: BigNumberish;
};

type ArgsType = [newLimit: BigNumberish];

export const usePreSaleMaxMintPerWalletUpdater = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  newLimit,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'setPreSaleMaxMintPerWallet',
    contractAddress,
    signerOrProvider,
    args: [newLimit] as ArgsType,
  });
};
