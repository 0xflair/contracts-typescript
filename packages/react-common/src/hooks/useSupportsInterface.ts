import { getInterfaceId } from '@0xflair/common';
import { ContractFqn, loadContract } from '@0xflair/contracts-registry';
import { BigNumberish, ethers } from 'ethers';
import { useMemo } from 'react';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from './useContractRead';

type Config = PredefinedReadContractConfig<[BigNumberish]> & {
  extensionFqn?: ContractFqn;
};

export const useSupportsInterface = ({
  contractAddress,
  contractVersion,
  extensionFqn,
  ...restOfConfig
}: Config) => {
  const interfaceId = useMemo(() => {
    if (!extensionFqn) {
      return null;
    }

    try {
      const definition = loadContract(extensionFqn, contractVersion);
      const iface = new ethers.utils.Interface(definition.artifact.abi);

      return getInterfaceId(iface);
    } catch (e) {
      return null;
    }
  }, [extensionFqn, contractVersion]);

  const result = useContractRead<boolean, [BigNumberish]>({
    contractVersion,
    contractAddress,
    contractFqn: 'openzeppelin/utils/introspection/ERC165',
    functionName: 'supportsInterface',
    args: interfaceId ? [interfaceId] : undefined,
    enabled: Boolean(interfaceId && contractAddress),
    ...restOfConfig,
  });

  return {
    ...result,
    interfaceId,
  } as const;
};
