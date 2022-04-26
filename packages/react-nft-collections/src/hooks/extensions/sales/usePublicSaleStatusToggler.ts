import { Version } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider;
  newValue?: boolean;
};
type ArgsType = [newValue: boolean];

export const usePublicSaleStatusToggler = ({
  version,
  contractAddress,
  signerOrProvider,
  newValue,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721PublicSaleExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'togglePublicSaleStatus',
    args: [newValue] as ArgsType,
  });
};
