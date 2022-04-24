import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { useContractRead } from 'wagmi';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  skip?: boolean;
  watch?: boolean;
};

export const useOzOwner = ({
  contractAddress,
  version,
  signerOrProvider,
  skip,
  watch,
}: Config) => {
  const contract = loadContract('openzeppelin/access/Ownable', version);

  const [{ data, error, loading }, ownerRead] = useContractRead(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'owner',
    {
      skip: skip || !contractAddress,
      watch,
    }
  );

  return [
    {
      data,
      error,
      loading,
    },
    ownerRead,
  ] as const;
};
