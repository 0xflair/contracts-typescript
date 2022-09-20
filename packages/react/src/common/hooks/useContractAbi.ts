import {
  ContractFqn,
  ContractVersion,
  loadContract,
} from '@flair-sdk/contracts-registry';
import { useMemo } from 'react';

export type Config = {
  contractVersion?: ContractVersion;
  contractFqn: ContractFqn;
};

export const useContractAbi = ({
  contractVersion = 'v1',
  contractFqn,
}: Config) => {
  const contract = useMemo(
    () => loadContract(contractFqn, contractVersion),
    [contractFqn, contractVersion],
  );

  return contract?.artifact.abi || [];
};
