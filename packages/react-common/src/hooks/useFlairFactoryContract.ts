import '@ethersproject/abstract-provider';

import { loadContract } from '@0xflair/contracts-registry';
import { ethers } from 'ethers';
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

      return new ethers.Contract(address, definition.artifact.abi, signer);
    } catch (e) {
      console.warn(
        `Could not get flair factory contract for chain ${resolvedChainId}: `,
        e
      );
      return undefined;
    }
  }, [resolvedChainId, signer]);
};
