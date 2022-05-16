import {
  ContractFqn,
  ContractVersion,
  loadContract,
} from '@0xflair/contracts-registry';
import { Signer } from 'ethers';
import { useMemo } from 'react';

import { useContractDeployer } from './useContractDeployer';

type Props = {
  contractFqn?: ContractFqn;
  contractVersion?: ContractVersion;
  signer?: Signer;
};

export const useFlairContractDeployer = <Args extends any[] = any[]>({
  contractFqn,
  contractVersion,
  signer,
}: Props = {}) => {
  const contract = useMemo(
    () => contractFqn && loadContract(contractFqn, contractVersion),
    [contractFqn, contractVersion]
  );

  return useContractDeployer<Args>({
    contractInterface: contract?.artifact.abi,
    contractByteCode: contract?.artifact.bytecode,
    signer,
  });
};
