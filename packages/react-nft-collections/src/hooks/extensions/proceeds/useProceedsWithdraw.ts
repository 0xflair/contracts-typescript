import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = {
  version?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

type ArgsType = [];

export const useProceedsWithdraw = ({
  version,
  contractAddress,
  signerOrProvider,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    version,
    contractFqn: 'collections/ERC721/extensions/ERC721SimpleProceedsExtension',
    functionName: 'withdraw',
    contractAddress,
    signerOrProvider,
  });
};
