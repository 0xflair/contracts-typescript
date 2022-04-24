import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';
import { useContractRead } from 'wagmi';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  skip?: boolean;
  watch?: boolean;
};

export type ERC721FullFeaturedContractInfo = [
  maxSupply?: BigNumberish,
  totalSupply?: BigNumberish,
  callerBalance?: BigNumberish,
  preSalePrice?: BigNumberish,
  preSaleMaxMintPerWallet?: BigNumberish,
  preSaleAllowlistClaimed?: BigNumberish,
  preSaleStatus?: boolean | 'true' | 'false',
  publicSalePrice?: BigNumberish,
  publicSaleMaxMintPerTx?: BigNumberish,
  publicSaleStatus?: boolean | 'true' | 'false'
];

export const useERC721FullFeaturedContractInfo = ({
  contractAddress,
  version,
  signerOrProvider,
  skip,
  watch = true,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/presets/ERC721FullFeaturedCollection',
    version
  );

  const readyToRead = Boolean(!skip && contractAddress);

  const [{ data, error, loading }, readInfo] = useContractRead(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'getInfo',
    {
      skip: !readyToRead,
      watch,
    }
  );

  return [
    { data: data as ERC721FullFeaturedContractInfo, error, loading },
    readInfo,
  ] as const;
};
