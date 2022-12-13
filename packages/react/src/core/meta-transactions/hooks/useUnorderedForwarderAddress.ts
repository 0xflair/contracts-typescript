import { ZERO_ADDRESS } from '@flair-sdk/common';
import {
  ContractReference,
  findContractByReference,
} from '@flair-sdk/registry';
import { useMemo } from 'react';

import { useChainId } from '../../../common';

export const useUnorderedForwarderAddress = (
  chainId?: number,
  contractReference?: ContractReference,
) => {
  const resolvedChainId = useChainId(chainId);

  return useMemo(() => {
    if (!resolvedChainId) {
      return ZERO_ADDRESS;
    }

    try {
      const manifest = findContractByReference(
        contractReference || 'flair-sdk:common/UnorderedForwarder',
      );

      return manifest?.address?.[resolvedChainId] ?? ZERO_ADDRESS;
    } catch (e) {
      console.warn(
        `Could not load UnorderedForwarder contract for chain ${resolvedChainId}: `,
        e,
      );
      return ZERO_ADDRESS;
    }
  }, [contractReference, resolvedChainId]);
};
