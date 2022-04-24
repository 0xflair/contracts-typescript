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

export const usePlaceholderUri = ({
  contractAddress,
  version,
  signerOrProvider,
  skip,
  watch,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
    version
  );

  const readyToRead = Boolean(!skip && contractAddress && signerOrProvider);

  const [{ data, error, loading }, placeholderURIRead] = useContractRead(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'placeholderURI',
    {
      skip: !readyToRead,
      watch,
    }
  );

  return [
    {
      data: data ? data.toString() : undefined,
      error: !data ? error : undefined,
      loading,
    },
    placeholderURIRead,
  ] as const;
};
