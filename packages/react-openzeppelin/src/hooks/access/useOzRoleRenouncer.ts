import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { ReadContractConfig } from '@wagmi/core';
import { BytesLike, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  version?: ContractVersion;
  enabled?: boolean;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  role?: BytesLike;
  address?: BytesLike;
};

type Args = [role?: BytesLike, address?: BytesLike];

export const useOzRoleRenouncer = ({
  version,
  contractAddress,
  signerOrProvider,
  role,
  address,
  ...restOfConfig
}: Config) => {
  return useContractWriteAndWait<Args>({
    version,
    contractFqn: 'openzeppelin/access/AccessControl',
    functionName: 'renounceRole',
    args: [role, address],
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
