import {
  ContractCall,
  EIP165InterfaceID,
  Environment,
  FacetManifest,
  SmartContract,
  useChainId,
  useSmartContract,
} from '@flair-sdk/react';
import * as React from 'react';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { useDiamond } from '../hooks/useDiamond';
import { Diamond } from '../types';

type DiamondContextValue = {
  data: {
    env?: Environment;
    chainId?: number;
    diamond?: Diamond;
    smartContract?: SmartContract;

    contractFacets?: FacetManifest[];
    contractInterfaces?: EIP165InterfaceID[];

    configValues?: Record<string, any>;
    proposedCalls?: ContractCall[];
    processingCalls?: boolean;
    processingError?: Error | string;
  };

  isLoading: {
    diamondLoading?: boolean;
    smartContractLoading?: boolean;
  };

  error: {
    diamondError?: string | Error | null;
    smartContractError?: string | Error | null;
  };

  setConfigValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setProposedCalls: React.Dispatch<React.SetStateAction<ContractCall[]>>;
  setProcessingCalls: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessingError: React.Dispatch<
    React.SetStateAction<Error | string | undefined>
  >;
  proposeCall: (call: ContractCall) => void;
  refresh: () => void;
};

export const DiamondContext = React.createContext<DiamondContextValue | null>(
  null,
);

type FunctionalChildren = (
  contextValue: DiamondContextValue,
) => ReactNode | ReactNode[];

type Props = {
  env?: Environment;
  chainId?: number;
  contractAddress?: string;
  diamondId?: string;
  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const DiamondProvider = ({
  env = Environment.PROD,
  chainId: chainId_,
  contractAddress: contractAddress_,
  diamondId,
  children,
}: Props) => {
  const [configValues, setConfigValues] = useState<Record<string, any>>();
  const [contractFacets, setContractFacets] = useState<FacetManifest[]>();
  const [proposedCalls, setProposedCalls] = useState<ContractCall[]>([]);
  const [processingCalls, setProcessingCalls] = useState<boolean>(false);
  const [processingError, setProcessingError] = useState<Error | string>();

  const {
    data: diamond,
    error: diamondError,
    isLoading: diamondLoading,
    sendRequest: refreshDiamond,
  } = useDiamond({
    env,
    chainId: chainId_,
    contractAddress: contractAddress_,
    diamondId,
  });

  const chainId = useChainId(
    diamond?.contractAddress && diamond?.chainId
      ? diamond?.chainId
      : chainId_
      ? Number(chainId_)
      : undefined,
  );

  const {
    data: smartContract,
    error: smartContractError,
    isLoading: smartContractLoading,
    refetch: refreshSmartContract,
  } = useSmartContract({
    env,
    chainId,
    contractAddress: diamond?.contractAddress,
  });

  /**
   * Set the current facets based on smart contract analysis
   */
  useEffect(() => {
    if (!smartContract?.facets?.length) {
      return;
    }
    setContractFacets(smartContract.facets as any[]);
  }, [contractFacets, smartContract?.facets]);

  /**
   * Set config values based on off-chain diamond data
   */
  useEffect(() => {
    if (configValues !== undefined || !diamond?.config) {
      return;
    }
    setConfigValues(diamond.config);
  }, [configValues, diamond]);

  /**
   * Set supported EIP165 interfaces based on current facets
   */
  const contractInterfaces = useMemo(() => {
    return contractFacets
      ?.map((facet) => facet.providesInterfaces)
      .filter((i) => Boolean(i))
      .flat() as EIP165InterfaceID[];
  }, [contractFacets]);

  /**
   * Allow proposing contract calls to be added to a queue
   */
  const proposeCall = useCallback(
    (call: ContractCall) => {
      if (processingCalls) {
        return;
      }

      setProposedCalls((calls) =>
        [...calls.filter((existing) => existing.id !== call.id), call].filter(
          (c) => c.contract && c.function && c.args !== undefined,
        ),
      );
    },
    [processingCalls],
  );

  const refresh = useCallback(() => {
    refreshDiamond().then(() => refreshSmartContract());
  }, [refreshDiamond, refreshSmartContract]);

  const value = {
    data: {
      env,
      chainId,
      diamond,
      smartContract,

      configValues,
      contractFacets,
      contractInterfaces,
      proposedCalls,
      processingCalls,
      processingError,
    },

    isLoading: { diamondLoading, smartContractLoading },

    error: { diamondError, smartContractError },

    setConfigValues,
    setProposedCalls,
    setProcessingCalls,
    setProcessingError,
    proposeCall,
    refresh,
  };

  return React.createElement(
    DiamondContext.Provider,
    { value },
    typeof children === 'function' ? children(value) : children,
  );
};

export const useDiamondContext = () => {
  const context = React.useContext(DiamondContext);
  if (!context) throw Error('Must be used within <DiamondProvider>');
  return context;
};