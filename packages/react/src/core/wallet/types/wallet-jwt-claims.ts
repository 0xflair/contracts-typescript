import { WalletAnalysis } from './wallet-analysis';

export type WalletJwtClaims = {
  // Wallet UUID
  sub: string;

  // Signature-verified Ethereum account address
  walletAddress?: string;

  // Verified discord user
  discordId?: string;
  discordUsername?: string;

  // Verified twitter username
  twitterUsername?: string;

  // Analysis of wallet
  walletAnalysis?: WalletAnalysis;

  // Standard JWT expiry timestamp
  exp: number;
};
