import { useProvider } from 'wagmi';

export const useChainId = (chainId?: number) => {
  const provider = useProvider({ chainId });
  return provider?.network?.chainId || chainId;
};
