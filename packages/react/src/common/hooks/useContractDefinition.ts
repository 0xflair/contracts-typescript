import {
  ContractDefinition,
  ContractFqn,
  ContractVersion,
  loadContract,
} from '@flair-sdk/registry';
import { useEffect, useState } from 'react';

type Config = {
  contractFqn?: ContractFqn;
  contractVersion: ContractVersion;
};

export const useContractDefinition = ({
  contractFqn,
  contractVersion = 'v1',
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
