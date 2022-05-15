import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  newStatus?: boolean;
};

type ArgsType = [newStatus: boolean];

export const usePreSaleStatusToggler = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  newStatus,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'togglePreSaleStatus',
    contractAddress,
    signerOrProvider,
    args: [newStatus] as ArgsType,
  });
};
