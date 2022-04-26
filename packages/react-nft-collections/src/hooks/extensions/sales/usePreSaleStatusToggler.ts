import { Version } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  newStatus?: boolean;
};

type ArgsType = [newStatus: boolean];

export const usePreSaleStatusToggler = ({
  version,
  contractAddress,
  signerOrProvider,
  newStatus,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'togglePreSaleStatus',
    args: [newStatus] as ArgsType,
  });
};
