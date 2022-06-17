import '@wagmi/core';

import { ContractVersion } from '@0xflair/contracts-registry';
import { BigNumber } from 'ethers';
import { useBalance } from 'wagmi';

type Config = {
  chainId?: number;
  contractVersion?: ContractVersion;
  contractAddress?: string;
};

export const useProceedsAvailable = ({ chainId, contractAddress }: Config) => {
  const { data, ...rest } = useBalance({
    chainId,
    addressOrName: contractAddress,
  });

  return {
    data: data ? BigNumber.from(data.value) : undefined,
    ...rest,
  };
};
