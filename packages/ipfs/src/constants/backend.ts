import { Environment } from '@flair-sdk/common';

export const FLAIR_IPFS_BACKEND = {
  [Environment.PROD]: 'https://api.flair.finance',
  [Environment.DEV]: 'http://localhost:3000',
};
