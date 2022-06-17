import { NftToken } from '@0xflair/react-nft-tokens';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumberish, BytesLike } from 'ethers';
import * as React from 'react';
import { ReactNode } from 'react';

import { useStreamClaimingContext } from '../../../common/providers';
import { TokenStream } from '../../../common/types';
import {
  useStreamTotalReleasedBulk,
  useStreamVestingRate,
  useStreamVestingTimeUnit,
} from '../hooks';

type VestedHolderStreamClaimingValue = {
  data: {
    // Resources
    stream?: TokenStream | null;
    nfts?: NftToken[] | null;

    // On-chain values
    claimTokenSymbol?: BytesLike;
    vestingRate?: BigNumberish;
    vestingTimeUnit?: BigNumberish;
    totalClaimedAmount?: BigNumberish;
    totalClaimableAmount?: BigNumberish;
    totalReleasedAmount?: BigNumberish;

    // Helpers
    canClaim?: boolean;

    // Transaction
    txReceipt?: TransactionReceipt;
    txResponse?: TransactionResponse;
  };

  isLoading: {
    // Resources
    nftsLoading?: boolean;
    streamLoading?: boolean;

    // On-chain values
    claimTokenSymbolLoading?: boolean;
    vestingRateLoading?: boolean;
    vestingTimeUnitLoading?: boolean;
    totalClaimedAmountLoading?: boolean;
    totalClaimableAmountLoading?: boolean;
    totalReleasedAmountLoading?: boolean;

    // Transaction
    claimLoading?: boolean;
  };

  error: {
    streamError?: string | Error | null;
    nftsError?: string | Error | null;
    claimTokenSymbolError?: string | Error | null;
    vestingRateError?: string | Error | null;
    vestingTimeUnitError?: string | Error | null;
    totalClaimedAmountError?: string | Error | null;
    totalClaimableAmountError?: string | Error | null;
    totalReleasedAmountError?: string | Error | null;
    claimError?: string | Error | null;
  };

  claim: (args?: {
    ticketTokenIds?: BigNumberish | BigNumberish[];
  }) => Promise<any>;
};

export const VestedHolderStreamClaimingContext =
  React.createContext<VestedHolderStreamClaimingValue | null>(null);

type FunctionalChildren = (
  contextValue: VestedHolderStreamClaimingValue
) => ReactNode | ReactNode[];

type Props = {
  children: FunctionalChildren | ReactNode | ReactNode[];
};

export const VestedHolderStreamClaimingProvider = ({ children }: Props) => {
  const { data, isLoading, error, claim } = useStreamClaimingContext();

  const {
    data: vestingRate,
    error: vestingRateError,
    isLoading: vestingRateLoading,
  } = useStreamVestingRate({
    chainId: data?.chainId,
    contractVersion: data.stream?.presetVersion,
    contractAddress: data.contractAddress,
  });
  const {
    data: vestingTimeUnit,
    error: vestingTimeUnitError,
    isLoading: vestingTimeUnitLoading,
  } = useStreamVestingTimeUnit({
    chainId: data?.chainId,
    contractVersion: data.stream?.presetVersion,
    contractAddress: data.contractAddress,
  });
  const {
    data: totalReleasedAmount,
    error: totalReleasedAmountError,
    isLoading: totalReleasedAmountLoading,
  } = useStreamTotalReleasedBulk({
    chainId: data?.chainId,
    contractAddress: data.contractAddress,
    ticketTokenIds: data.ticketTokenIds,
  });

  const value = {
    data: {
      // Common
      ...data,

      // Vested Holder
      vestingRate,
      vestingTimeUnit,
      totalReleasedAmount,
    },

    isLoading: {
      // Common
      ...isLoading,

      // Vested Holder
      vestingRateLoading,
      vestingTimeUnitLoading,
      totalReleasedAmountLoading,
    },

    error: {
      // Common
      ...error,

      // Vested Holder
      vestingRateError,
      vestingTimeUnitError,
      totalReleasedAmountError,
    },

    claim,
  };

  return React.createElement(
    VestedHolderStreamClaimingContext.Provider,
    { value },
    typeof children === 'function' ? children(value) : children
  );
};

export const useVestedHolderStreamClaimingContext = () => {
  const context = React.useContext(VestedHolderStreamClaimingContext);
  if (!context) throw Error('Must be used within <VestedHolderStreamProvider>');
  return context;
};
