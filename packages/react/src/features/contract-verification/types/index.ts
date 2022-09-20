import { ContractFqn, ContractVersion } from '@flair-sdk/registry';

export type ContractVerification = {
  chainId: number;
  ownerAddress: string;
  address: string;
  contractFqn: ContractFqn;
  contractVersion?: ContractVersion;
  encodedConstructorArguments?: string;
  guid?: string;
  state?: 'submitted' | 'pending' | 'failed' | 'succeeded';
  submittedAt: number;
  attemptedAt?: number;
  processedAt?: number;
  processingError?: string;
  checkedAt?: number;
  checkedError?: string;
};
