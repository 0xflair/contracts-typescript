import { Environment } from '@flair-sdk/common';

import {
  balanceRampCustomDataResolve,
  balanceRampNativeValueResolve,
} from '../resolvers';
import { BalanceRampClientConfig } from '../types';
import { BalanceRampClient } from './balance-ramp.client';

let clientInstance: BalanceRampClient;

export const createBalanceRampClient = (
  config?: Partial<BalanceRampClientConfig>,
) => {
  clientInstance = new BalanceRampClient(
    Object.assign<
      any,
      Partial<BalanceRampClientConfig>,
      Partial<BalanceRampClientConfig>
    >(
      {},
      {
        env: Environment.PROD,
        resolvers: [
          balanceRampNativeValueResolve,
          balanceRampCustomDataResolve,
        ],
        ignoreCurrentBalance: false,
        maxGasLimit: 1_000_000,
        inputCurrency: 'USD',
        enabledChainIds: 'ALL',
      },
      config || {},
    ),
  );
  return clientInstance;
};

export const getBalanceRampClient = () => {
  if (!clientInstance) {
    clientInstance = createBalanceRampClient();
  }

  return clientInstance;
};
