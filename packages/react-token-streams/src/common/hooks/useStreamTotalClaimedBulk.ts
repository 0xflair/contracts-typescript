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

export const useStreamTotalClaimedBulk = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  ticketTokenIds,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish>({
    contractVersion,
    contractFqn: 'streams/ERC721/core/ERC721BaseDistributor',
    functionName: 'getTotalClaimedBulk',
    contractAddress,
    signerOrProvider,
    args: [ticketTokenIds],
    ...restOfConfig,
  });
};
