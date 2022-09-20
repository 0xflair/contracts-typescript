import { getInterfaceId } from '@flair-sdk/common';
import { ContractFqn, loadContract } from '@flair-sdk/registry';
import { BigNumberish, ethers } from 'ethers';
import { useMemo } from 'react';
import reactQuery from 'react-query';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from './useContractRead';

type Config = PredefinedReadContractConfig<[BigNumberish]> & {
  extensionFqn?: ContractFqn;
};

export const useSupportsInterface = ({
  contractAddress,
  contractVersion = 'v1',
  extensionFqn,
  ...restOfConfig
}: Config) => {
  const interfaceId = useMemo(() => {
    if (!extensionFqn) {
      return null;
    }

    try {
      const definition = loadContract(extensionFqn, contractVersion);
      const iface = new ethers.utils.Interface(definition?.artifact.abi || []);

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
