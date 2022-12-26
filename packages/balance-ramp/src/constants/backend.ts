import { Environment } from '@flair-sdk/common';

export const BALANCE_RAMP_BACKEND = {
  [Environment.PROD]: {
    startSession: 'https://app.flair.dev/public/balance-ramp/start',
    simulateEstimateGasLimit:
      'https://api.flair.dev/v1/balance-ramp/simulate/estimate-gas-limit',
    getGasFeeData: (chainId: number) =>
      `https://api.flair.dev/v1/balance-ramp/gas/${chainId}`,
    getBackendConfig: 'https://api.flair.dev/v1/balance-ramp/config',
  },
  [Environment.DEV]: {
    startSession: 'http://localhost:8000/public/balance-ramp/start',
    simulateEstimateGasLimit:
      'http://localhost:3000/v1/balance-ramp/simulate/estimate-gas-limit',
    getGasFeeData: (chainId: number) =>
      `http://localhost:3000/v1/balance-ramp/gas/${chainId}`,
    getBackendConfig: 'http://localhost:3000/v1/balance-ramp/config',
  },
};
