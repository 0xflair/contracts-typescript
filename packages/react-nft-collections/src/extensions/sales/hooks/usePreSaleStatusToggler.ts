import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
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
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'togglePreSaleStatus',
    contractAddress,
    signerOrProvider,
    args: [newStatus] as ArgsType,
  });
};
