import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
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

type ArgsType = [role?: BytesLike, address?: BytesLike];

export const useOzRoleGranter = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  role,
  address,
  ...restOfConfig
}: Config) => {
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'openzeppelin/access/AccessControl',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'grantRole',
    args: [role, address],
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
