import { getInterfaceId } from '@0xflair/common';
import {
  ContractFqn,
  ContractVersion,
  loadContract,
} from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { ethers, Signer } from 'ethers';
import { useMemo } from 'react';

import { ReadContractConfig, useContractRead } from './useContractRead';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  extensionFqn?: ContractFqn;
  signerOrProvider?: Signer | Provider | null;
};

export const useExtensionChecker = ({
  contractAddress,
  contractVersion,
  extensionFqn,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  const interfaceId = useMemo(() => {
    if (!extensionFqn) {
      return null;
    }

    const definition = loadContract(extensionFqn, contractVersion);
    const iface = new ethers.utils.Interface(definition.artifact.abi);

    return getInterfaceId(iface);
  }, [extensionFqn, contractVersion]);

  return useContractRead<boolean>({
    contractVersion,
    contractFqn: 'openzeppelin/utils/introspection/ERC165',
    functionName: 'supportsInterface',
    args: [interfaceId],
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
