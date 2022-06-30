import '@ethersproject/abstract-provider';

import {
  ContractFqn,
  ContractVersion,
  loadContract,
} from '@0xflair/contracts-registry';
import { Signer } from 'ethers';
import { useMemo } from 'react';

import { useContractDeployer } from './useContractDeployer';
import { useProxyDeployer } from './useProxyDeployer';

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

  const contractDeployer = useContractDeployer<Args>({
    contractInterface: contract?.artifact.abi,
    contractByteCode: contract?.artifact.bytecode,
    signer,
  });

  const proxyDeployer = useProxyDeployer<Args>({
    contract,
    signer,
  });

  return proxyDeployer.isSupported ? proxyDeployer : contractDeployer;
};
