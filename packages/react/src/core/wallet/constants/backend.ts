import { Environment } from '@flair-sdk/common';

export const FLAIR_WALLET_BACKEND = {
  [Environment.PROD]: {
    host: 'https://api.flair.dev',
    loginEndpoint: '/v1/login',
  },
  [Environment.DEV]: {
    host: 'http://localhost:3000',
    loginEndpoint: '/v1/login',
  },
};
