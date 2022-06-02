import { ContractVersion } from '@0xflair/contracts-registry';
import { ReadContractConfig, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  ticketTokenIds?: BigNumberish[];
};

export const useStreamTotalReleasedBulk = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  ticketTokenIds,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish>({
    contractVersion,
    contractFqn: 'streams/ERC721/presets/ERC721HolderVestedDistributor',
    functionName: 'getTotalReleasedBulk',
    contractAddress,
    signerOrProvider,
    args: [ticketTokenIds],
    ...restOfConfig,
  });
};
