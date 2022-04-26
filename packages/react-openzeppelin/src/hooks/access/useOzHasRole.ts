import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { ReadContractConfig } from '@wagmi/core';
import { BytesLike, Signer } from 'ethers';
import { useContractRead } from 'wagmi';

type Config = ReadContractConfig & {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  enabled?: boolean;
  role?: BytesLike;
  address?: BytesLike;
};

export const useOzHasRole = ({
  contractAddress,
  version,
  signerOrProvider,
  enabled,
  role,
  address,
  ...restOfConfig
}: Config) => {
  const contract = loadContract('openzeppelin/access/AccessControl', version);

  const result = useContractRead(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'hasRole',
    {
      args: [role, address],
      enabled: Boolean(enabled && role && address),
      ...restOfConfig,
    }
  );

  return result;
};
