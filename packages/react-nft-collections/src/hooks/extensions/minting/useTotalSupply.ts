import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { BigNumber, Signer } from 'ethers';
import { useContractRead } from 'wagmi';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  skip?: boolean;
  watch?: boolean;
};

export const useTotalSupply = ({
  contractAddress,
  version,
  signerOrProvider,
  skip,
  watch = true,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/extensions/ERC721AutoIdMinterExtension',
    version
  );

  const [{ data, error, loading }, totalSupplyRead] = useContractRead(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'totalSupply',
    {
      skip,
      watch,
    }
  );

  return [
    {
      data: data ? BigNumber.from(data) : undefined,
      error,
      loading,
    },
    totalSupplyRead,
  ] as const;
};
