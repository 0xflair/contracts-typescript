import { Version } from '@0xflair/contracts-registry';
import { useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { ReadContractConfig } from '@wagmi/core';
import { BytesLike, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  version?: Version;
  enabled?: boolean;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  role?: BytesLike;
  address?: BytesLike;
};

export const useOzHasRole = ({
  version,
  enabled = true,
  contractAddress,
  signerOrProvider,
  role,
  address,
  ...restOfConfig
}: Config) => {
  return useContractRead({
    version,
    contractKey: 'openzeppelin/access/AccessControl',
    functionName: 'hasRole',
    args: [role, address],
    enabled: Boolean(enabled && role && address),
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
