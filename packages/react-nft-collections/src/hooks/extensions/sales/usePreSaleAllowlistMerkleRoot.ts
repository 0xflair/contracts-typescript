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

export const usePreSaleAllowlistMerkleRoot = ({
  contractAddress,
  version,
  signerOrProvider,
  skip,
  watch = true,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/extensions/ERC721PreSaleExtension',
    version
  );

  const readyToRead = Boolean(!skip && contractAddress);

  const [{ data, error, loading }, preSaleAllowlistMerkleRootRead] =
    useContractRead(
      {
        addressOrName: contractAddress as string,
        contractInterface: contract.artifact.abi,
        signerOrProvider,
      },
      'preSaleAllowlistMerkleRoot',
      {
        skip: !readyToRead,
        watch,
      }
    );

  return [
    {
      data,
      error,
      loading,
    },
    preSaleAllowlistMerkleRootRead,
  ] as const;
};
