import '@ethersproject/abstract-provider';

import { loadContract } from '@0xflair/contracts-registry';
import { FlairFactory__factory } from '@0xflair/evm-contracts';
import { useMemo } from 'react';
import { useSigner } from 'wagmi';

import { useChainId } from './useChainId';

type Config = {
  chainId?: number;
};

export const useFlairFactoryContract = ({ chainId }: Config) => {
  const resolvedChainId = useChainId(chainId);
  const { data: signer } = useSigner();

  return useMemo(() => {
    try {
      if (!resolvedChainId) {
        return undefined;
      }

      const definition = loadContract('factory/FlairFactory');
      const address = definition?.address?.[resolvedChainId];

      if (!address || !signer) {
        return undefined;
      }

      return FlairFactory__factory.connect(address, signer);
    } catch (e) {
      console.warn(
        `Could not get flair factory contract for chain ${resolvedChainId}: `,
        e
      );
      return undefined;
    }
  }, [resolvedChainId, signer]);
};
