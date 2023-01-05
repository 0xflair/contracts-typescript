import {
  Environment,
  TransactionData,
  TransactionListener,
} from '@flair-sdk/common';
import {
  ContractCall,
  EIP165InterfaceID,
  FacetManifest,
} from '@flair-sdk/registry';
import * as React from 'react';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { SmartContract, useChainId, useSmartContract } from '../../../common';
import { useWalletContext } from '../../wallet';
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
    proposedCallsData?: TransactionData;
  };

  isLoading: {
    proposedCallsLoading?: boolean;
    diamondLoading?: boolean;
    smartContractLoading?: boolean;
  };

  error: {
    proposedCallsError?: Error | string | null;
    diamondError?: string | Error | null;
    smartContractError?: string | Error | null;
  };

  setConfigValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setProposedCalls: React.Dispatch<React.SetStateAction<ContractCall[]>>;
  setProposedCallsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProposedCallsError: React.Dispatch<
    React.SetStateAction<Error | string | undefined>
  >;
  setProposedCallsData: React.Dispatch<
    React.SetStateAction<TransactionData | undefined>
  >;

  registerListener: (id: string, listener: TransactionListener) => void;
  invokeListeners: (data: TransactionData) => Promise<void>;

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
  const [listeners, setListeners] = useState<
    Record<string, TransactionListener>
  >({});
  const [configValues, setConfigValues] = useState<Record<string, any>>();
  const [contractFacets, setContractFacets] = useState<FacetManifest[]>();
  const [proposedCalls, setProposedCalls] = useState<ContractCall[]>([]);
  const [proposedCallsData, setProposedCallsData] = useState<TransactionData>();
  const [proposedCallsLoading, setProposedCallsLoading] =
    useState<boolean>(false);
  const [proposedCallsError, setProposedCallsError] = useState<
    Error | string
  >();

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

  const {
    state: { preferredChainId },
    setPreferredChainId,
    setAllowedNetworks,
  } = useWalletContext();

  const { isConnecting, isReconnecting } = useAccount();

  useEffect(() => {
    if (
      isConnecting ||
      isReconnecting ||
      !diamond?.chainId?.toString() ||
      !diamond?.contractAddress?.toString()
    ) {
      return;
    }
    const t = setTimeout(() => {
      if (diamond?.chainId?.toString() !== preferredChainId?.toString()) {
        setPreferredChainId(Number(chainId));
        setAllowedNetworks([Number(chainId)]);
      }
    }, 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, isConnecting, isReconnecting]);

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
      if (proposedCallsLoading) {
        return;
      }
      setProposedCalls((calls) =>
        [...calls.filter((existing) => existing.id !== call.id), call].filter(
          (c) => c.function && c.args !== undefined,
        ),
      );
    },
    [proposedCallsLoading],
  );

  const refresh = useCallback(() => {
    refreshDiamond().then(() => refreshSmartContract());
  }, [refreshDiamond, refreshSmartContract]);

  const registerListener = useCallback(
    (id: string, listener: TransactionListener) => {
      setListeners((listeners) => ({ ...listeners, [id]: listener }));
    },
    [],
  );

  const invokeListeners = useCallback(
    async (data: TransactionData) => {
      for await (const listener of Object.values(listeners)) {
        await listener(data);
      }
    },
    [listeners],
  );

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
      proposedCallsData,
    },

    isLoading: { proposedCallsLoading, diamondLoading, smartContractLoading },

    error: { proposedCallsError, diamondError, smartContractError },

    setConfigValues,
    setProposedCalls,

    setProposedCallsLoading,
    setProposedCallsError,
    setProposedCallsData,

    registerListener,
    invokeListeners,

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
  return (
    context ||
    ({
      data: {},
      isLoading: false,
      error: `Must be used within <DiamondProvider>`,
    } as unknown as DiamondContextValue)
  );
};
