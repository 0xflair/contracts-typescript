import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  newValue?: BigNumberish;
};

type ArgsType = [newValue: BigNumberish];

export const usePublicSalePriceUpdater = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  newValue,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
    functionName: 'setPublicSalePrice',
    contractAddress,
    signerOrProvider,
    args: [newValue] as ArgsType,
  });
};
