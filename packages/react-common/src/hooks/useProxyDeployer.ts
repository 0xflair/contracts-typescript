import '@ethersproject/abstract-provider';

import { ContractDefinition } from '@0xflair/contracts-registry';
import { Contract, Signer, utils } from 'ethers';
import * as React from 'react';

import { useCancel } from './useCancel';
import { useChainId } from './useChainId';
import { useFlairFactoryContract } from './useFlairFactoryContract';

export type ProxyDeployerConfig = {
  chainId?: number;
  contract?: ContractDefinition;
  signer?: Signer;
};

type State = {
  contract?: Partial<Contract>;
  error?: Error;
  isLoading?: boolean;
};

const initialState: State = {
  isLoading: false,
};

export const useProxyDeployer = <ArgsType extends any[]>({
  chainId,
  contract,
  signer,
}: Partial<ProxyDeployerConfig>) => {
  const resolvedChainId = useChainId(chainId);
  const flairFactory = useFlairFactoryContract({
    chainId,
  });

  const isSupported = Boolean(
    resolvedChainId &&
      contract?.address?.[resolvedChainId] &&
      contract.artifact.abi.find((i) => i.name === 'initialize')
  );

  const [state, setState] = React.useState<State>(initialState);

  const cancelQuery = useCancel();
  const deployContract = React.useCallback(
    async (...args: ArgsType) => {
      if (!flairFactory) {
        console.warn(`Factory is not loaded yet`);
        return;
      }
      if (!contract) {
        console.warn(`Contract target is not defined yet`);
        return;
      }
      if (!isSupported || !contract.address) {
        console.warn(`Contract target is not deployed as yet`);
        return;
      }

      let didCancel = false;
      cancelQuery(() => {
        didCancel = true;
      });

      try {
        setState((x) => ({ ...x, error: undefined, isLoading: true }));

        const iface = new utils.Interface(contract.artifact.abi);
        const salt = utils.randomBytes(32);
        const data = iface.encodeFunctionData('initialize', [
          ...args,
          await signer?.getAddress(),
        ]);

        const deployTransaction = await flairFactory.cloneDeterministicSimple(
          contract?.address?.[resolvedChainId as number],
          salt,
          data
        );

        if (!didCancel) {
          setState((x) => ({
            ...x,
            contract: { deployTransaction },
          }));
        }

        const receipt = await deployTransaction.wait();
        const event = receipt?.events?.find((e) => e.event === 'ProxyCreated');
        const emittedAddress = event?.args?.[1];

        if (!didCancel) {
          setState((x) => ({
            ...x,
            contract: { deployTransaction, address: emittedAddress },
          }));
        }

        if (!didCancel) {
          setState((x) => ({ ...x, isLoading: false }));
        }

        return {
          data: {
            contract: { deployTransaction, address: emittedAddress },
            receipt,
          },
          error: undefined,
        };
      } catch (error_) {
        const error = <Error>error_;

        if (!didCancel) {
          setState((x) => ({ ...x, error, isLoading: false }));
        }

        return { data: undefined, error };
      }
    },
    [cancelQuery, contract, flairFactory, isSupported, resolvedChainId, signer]
  );

  return {
    isSupported,
    data: state.contract,
    error: state.error,
    isLoading: state.isLoading,
    deployContract,
  } as const;
};
