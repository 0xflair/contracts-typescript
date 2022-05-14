import { loadContract, Version } from '@0xflair/contracts-registry';
import { ZERO_ADDRESS } from '@0xflair/react-common';
import { useMemo } from 'react';
import { useChainId } from 'wagmi/dist/declarations/src/hooks';

type Config = {
  version?: Version;
  chainId?: number;
};

export const useUnorderedForwarderAddress = (args: Config) => {
  const chain = (useChainId(args) || args.chainId) as number | undefined;

  return useMemo(() => {
    try {
      const definition = loadContract(
        'common/meta-transactions/UnorderedForwarder',
        args.version
      );

      return definition.address?.[Number(chain)] ?? ZERO_ADDRESS;
    } catch (e) {
      console.warn(
        `Could not load UnorderedForwarder contract for chain ${chain}: `,
        e
      );
      return ZERO_ADDRESS;
    }
  }, [args.version, chain]);
};
