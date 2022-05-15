import { ContractVersion } from '@0xflair/contracts-registry';
import { ReadContractConfig, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  version?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
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
  version,
  contractAddress,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead<ERC721FullFeaturedContractInfo>({
    version,
    contractFqn: 'collections/ERC721/presets/ERC721FullFeaturedCollection',
    functionName: 'getInfo',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
