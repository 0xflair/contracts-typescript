import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  newValue?: BigNumberish;
};

type ArgsType = [newValue: BigNumberish];

export const useStreamClaimEndUpdater = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  newValue,
}: Config) => {
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'streams/ERC721/presets/ERC721HolderVestedDistributor',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'setClaimEnd',
    contractAddress,
    signerOrProvider,
    args: [newValue] as ArgsType,
  });
};
