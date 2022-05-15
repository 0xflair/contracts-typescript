import '@wagmi/core';

import { ContractVersion } from '@0xflair/contracts-registry';
import { BigNumber } from 'ethers';
import { useBalance } from 'wagmi';

type Config = {
  version?: ContractVersion;
  contractAddress?: string;
};

export const useProceedsAvailable = ({ contractAddress }: Config) => {
  const { data, ...rest } = useBalance({
    addressOrName: contractAddress,
  });

  return {
    data: data ? BigNumber.from(data.value) : undefined,
    ...rest,
  };
};
