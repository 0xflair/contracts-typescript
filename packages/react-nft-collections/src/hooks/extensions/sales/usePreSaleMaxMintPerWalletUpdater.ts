import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
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
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'setPreSaleMaxMintPerWallet',
    contractAddress,
    signerOrProvider,
    args: [newLimit] as ArgsType,
  });
};
