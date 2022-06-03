import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';
import { useCallback } from 'react';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  ticketTokenIds?: BigNumberish | BigNumberish[];
};

type ArgsType = [ticketTokenIds: BigNumberish | BigNumberish[]];

export const useStreamClaimer = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  ticketTokenIds,
}: Config) => {
  const claimBulkHook = useContractWriteAndWait<ArgsType>({
    contractVersion,
    contractFqn: 'streams/ERC721/core/ERC721BaseDistributor',
    functionName: 'claimBulk',
    contractAddress,
    signerOrProvider,
    args: [ticketTokenIds] as ArgsType,
  });
  const claimHook = useContractWriteAndWait<ArgsType>({
    contractVersion,
    contractFqn: 'streams/ERC721/core/ERC721BaseDistributor',
    functionName: 'claim',
    contractAddress,
    signerOrProvider,
    args: [ticketTokenIds] as ArgsType,
  });

  const claim = useCallback(
    (args?: { ticketTokenIds?: BigNumberish | BigNumberish[] }) => {
      const tickets = args?.ticketTokenIds || ticketTokenIds;
      const isSingleTicket = ticketTokenIds && !Array.isArray(ticketTokenIds);

      if (isSingleTicket) {
        return claimHook.writeAndWait([tickets as BigNumberish]);
      }

      return claimBulkHook.writeAndWait([tickets as BigNumberish[]]);
    },
    [claimBulkHook, claimHook, ticketTokenIds]
  );

  const isSingleTicket = ticketTokenIds && !Array.isArray(ticketTokenIds);

  return {
    ...(isSingleTicket ? claimHook : claimBulkHook),
    claim,
  };
};
