import { Version } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';

type Config = {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  newLimit?: BigNumberish;
};

type ArgsType = [newLimit: BigNumberish];

export const usePreSaleMaxMintPerWalletUpdater = ({
  version,
  contractAddress,
  signerOrProvider,
  newLimit,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'setPreSaleMaxMintPerWallet',
    args: [newLimit] as ArgsType,
  });
};
