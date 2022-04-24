import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { BytesLike, Signer } from 'ethers';
import { useContractRead } from 'wagmi';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  skip?: boolean;
  watch?: boolean;
  role?: BytesLike;
  address?: BytesLike;
};

export const useOzHasRole = ({
  contractAddress,
  version,
  signerOrProvider,
  skip,
  watch,
  role,
  address,
}: Config) => {
  const contract = loadContract('openzeppelin/access/AccessControl', version);

  const [{ data, error, loading }, hasRole] = useContractRead(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'hasRole',
    {
      args: [role, address],
      skip: skip || !role || !address,
      watch,
    }
  );

  return [
    {
      data,
      error,
      loading,
    },
    hasRole,
  ] as const;
};
