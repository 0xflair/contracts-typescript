import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  newValue?: boolean;
};
type ArgsType = [newValue: boolean];

export const usePublicSaleStatusToggler = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  newValue,
}: Config) => {
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'togglePublicSaleStatus',
    contractAddress,
    signerOrProvider,
    args: [newValue] as ArgsType,
  });
};
