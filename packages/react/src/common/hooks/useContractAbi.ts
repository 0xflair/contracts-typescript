import {
  ContractReference,
  findContractByReference,
} from '@flair-sdk/registry';
import { useMemo } from 'react';

export type Config = {
  contractReference: ContractReference;
};

export const useContractAbi = ({ contractReference }: Config) => {
  const contract = useMemo(() => {
    try {
      return findContractByReference(contractReference);
    } catch (error) {
      console.warn(`Failed to find contract manifest for ${contractReference}`);
      return undefined;
    }
  }, [contractReference]);

  return contract?.artifact?.abi;
};
