import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { ReadContractConfig } from '@wagmi/core';
import { BytesLike, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  enabled?: boolean;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  role?: BytesLike;
  address?: BytesLike;
};

export const useOzHasRole = ({
  contractVersion,
  enabled = true,
  contractAddress,
  signerOrProvider,
  role,
  address,
  ...restOfConfig
}: Config) => {
  return useContractRead<boolean>({
    contractVersion,
    contractFqn: 'openzeppelin/access/AccessControl',
    functionName: 'hasRole',
    args: [role, address],
    enabled: Boolean(enabled && role && address),
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
