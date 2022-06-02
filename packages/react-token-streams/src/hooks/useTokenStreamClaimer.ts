import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  ticketTokenIds?: BigNumberish[];
};

type ArgsType = [ticketTokenIds: BigNumberish[]];

export const useTokenStreamClaimer = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  ticketTokenIds,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    contractVersion,
    contractFqn: 'streams/ERC721/core/ERC721BaseDistributor',
    functionName: 'claimBulk',
    contractAddress,
    signerOrProvider,
    args: [ticketTokenIds] as ArgsType,
  });
};
