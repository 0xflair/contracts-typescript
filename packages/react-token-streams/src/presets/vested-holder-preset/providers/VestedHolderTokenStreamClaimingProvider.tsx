import { BigNumberish } from 'ethers';
import * as React from 'react';
import { ReactNode } from 'react';

import {
  StreamClaimingContextValue,
  useStreamClaimingContext,
} from '../../../common/providers';
import {
  useStreamTotalReleasedBulk,
  useStreamVestingRate,
  useStreamVestingTimeUnit,
} from '../hooks';

type VestedHolderStreamClaimingValue = {
  data: StreamClaimingContextValue['data'] & {
    // On-chain values
    vestingRate?: BigNumberish;
    vestingTimeUnit?: BigNumberish;
    totalReleasedAmount?: BigNumberish;
  };

  isLoading: StreamClaimingContextValue['isLoading'] & {
    // On-chain values
    vestingRateLoading?: boolean;
    vestingTimeUnitLoading?: boolean;
    totalReleasedAmountLoading?: boolean;
  };

  error: StreamClaimingContextValue['error'] & {
    vestingRateError?: string | Error | null;
    vestingTimeUnitError?: string | Error | null;
    totalReleasedAmountError?: string | Error | null;
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
    contractVersion: data.contractVersion,
    contractAddress: data.contractAddress,
  });
  const {
    data: vestingTimeUnit,
    error: vestingTimeUnitError,
    isLoading: vestingTimeUnitLoading,
  } = useStreamVestingTimeUnit({
    chainId: data?.chainId,
    contractVersion: data.contractVersion,
    contractAddress: data.contractAddress,
  });
  const {
    data: totalReleasedAmount,
    error: totalReleasedAmountError,
    isLoading: totalReleasedAmountLoading,
  } = useStreamTotalReleasedBulk({
    chainId: data?.chainId,
    contractVersion: data.contractVersion,
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
