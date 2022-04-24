import { loadContract, Version } from '@0xflair/contracts-registry';
import { useContractDeployer } from '@0xflair/react-contracts';
import { BigNumberish, Signer } from 'ethers';

export type ERC721FullFeaturedContractDeployerConfig = {
  version?: Version;
  signer?: Signer;
};

export type ERC721FullFeaturedContractArguments = [
  collectionName: string,
  collectionSymbol: string,
  collectionMetadataUri: string,
  placeholderMetadataUri: string,
  maxSupply: BigNumberish,
  preSalePrice: BigNumberish,
  preSaleMaxPerWallet: BigNumberish,
  publicSalePrice: BigNumberish,
  maxMintPerTx: BigNumberish
];

export const useERC721FullFeaturedContractDeployer = <Contract = any>({
  version,
  signer,
}: ERC721FullFeaturedContractDeployerConfig) => {
  const contract = loadContract(
    'collections/ERC721/presets/ERC721FullFeaturedCollection',
    version
  );
  return useContractDeployer<ERC721FullFeaturedContractArguments>({
    contractInterface: contract.artifact.abi,
    contractByteCode: contract.artifact.bytecode,
    signer,
  });
};
