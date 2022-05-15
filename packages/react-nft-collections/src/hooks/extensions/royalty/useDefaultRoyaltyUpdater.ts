import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';

type ArgsType = [[newReceiver: BytesLike, newBasisPoints: BigNumberish]];

type Config = {
  version?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  args?: ArgsType;
};

export const useDefaultRoyaltyUpdater = ({
  version,
  contractAddress,
  signerOrProvider,
  args,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    version,
    contractFqn: 'collections/ERC721/extensions/ERC721RoyaltyExtension',
    functionName: 'setDefaultRoyalty',
    contractAddress,
    signerOrProvider,
    args: args ? (args as ArgsType) : undefined,
  });
};
