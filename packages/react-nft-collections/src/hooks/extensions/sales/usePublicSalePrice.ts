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

export const usePublicSalePrice = ({
  contractAddress,
  version,
  signerOrProvider,
  skip,
  watch = true,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/extensions/ERC721PublicSaleExtension',
    version
  );

  const [{ data, error, loading }, publicSalePriceRead] = useContractRead(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'publicSalePrice',
    {
      skip: !contractAddress || skip,
      watch,
    }
  );

  return [
    {
      data: data ? BigNumber.from(data) : undefined,
      error,
      loading,
    },
    publicSalePriceRead,
  ] as const;
};
