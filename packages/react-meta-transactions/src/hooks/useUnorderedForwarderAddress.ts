import {
  ContractVersion,
  LATEST_VERSION,
  loadContract,
} from '@0xflair/contracts-registry';
import { useChainId, ZERO_ADDRESS } from '@0xflair/react-common';
import { useMemo } from 'react';

export const useUnorderedForwarderAddress = (
  chainId?: number,
  contractVersion: ContractVersion = LATEST_VERSION
) => {
  const resolvedChainId = useChainId(chainId);

  return useMemo(() => {
    if (!resolvedChainId) {
      return ZERO_ADDRESS;
    }

    try {
      const definition = loadContract(
        'common/meta-transactions/UnorderedForwarder',
        contractVersion
      );

      return definition.address?.[resolvedChainId] ?? ZERO_ADDRESS;
    } catch (e) {
      console.warn(
        `Could not load UnorderedForwarder contract for chain ${resolvedChainId}: `,
        e
      );
      return ZERO_ADDRESS;
    }
  }, [contractVersion, resolvedChainId]);
};
