import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';

type ArgsType = [[newReceiver: BytesLike, newBasisPoints: BigNumberish]];

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  args?: ArgsType;
};

export const useDefaultRoyaltyUpdater = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  args,
}: Config) => {
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721RoyaltyExtension',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'setDefaultRoyalty',
    contractAddress,
    signerOrProvider,
    args: args ? (args as ArgsType) : undefined,
  });
};
