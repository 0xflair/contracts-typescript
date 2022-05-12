import { KNOWN_CRYPTO_CURRENCIES } from '../constants/currencies';

export const useCryptoInfo = (symbol?: string) => {
  return KNOWN_CRYPTO_CURRENCIES.find((c) =>
    symbol?.toLowerCase().endsWith(c.symbol.toLowerCase())
  );
};
