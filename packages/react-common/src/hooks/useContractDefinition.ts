import {
  ContractDefinition,
  ContractFqn,
  ContractVersion,
  LATEST_VERSION,
  loadContract,
} from '@0xflair/contracts-registry';
import { useEffect, useState } from 'react';

type Config = {
  contractFqn?: ContractFqn;
  contractVersion: ContractVersion;
};

export const useContractDefinition = ({
  contractFqn,
  contractVersion = LATEST_VERSION,
}: Config) => {
  const [definition, setDefinition] = useState<ContractDefinition>();

  useEffect(() => {
    if (!contractFqn) {
      setDefinition(undefined);
      return;
    }

    try {
      const definition = loadContract(contractFqn, contractVersion);
      setDefinition(definition);
    } catch (error) {
      setDefinition(undefined);
    }
  }, [contractFqn, contractVersion]);

  return definition;
};
