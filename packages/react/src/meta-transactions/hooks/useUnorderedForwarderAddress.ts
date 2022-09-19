import { ZERO_ADDRESS } from '@flair-sdk/common';
import {
  ContractVersion,
  LATEST_VERSION,
  loadContract,
} from '@flair-sdk/contracts-registry';
import { useMemo } from 'react';

import { useChainId } from '../../common';

export const useUnorderedForwarderAddress = (
  chainId?: number,
  contractVersion: ContractVersion = LATEST_VERSION,
) => {
  const resolvedChainId = useChainId(chainId);

  return useMemo(() => {
    if (!resolvedChainId) {
      return ZERO_ADDRESS;
    }

    try {
      const definition = loadContract(
        'common/UnorderedForwarder',
        contractVersion,
      );

      return definition?.address?.[resolvedChainId] ?? ZERO_ADDRESS;
    } catch (e) {
      console.warn(
        `Could not load UnorderedForwarder contract for chain ${resolvedChainId}: `,
        e,
      );
      return ZERO_ADDRESS;
    }
  }, [contractVersion, resolvedChainId]);
};
