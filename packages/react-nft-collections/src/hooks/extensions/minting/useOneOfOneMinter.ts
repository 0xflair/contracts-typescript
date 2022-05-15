import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  toAddress?: BytesLike;
  mintCount?: BigNumberish;
  tokenURIs?: BytesLike[];
};

type ArgsType = [
  toAddress: BytesLike,
  mintCount: BigNumberish,
  tokenURIs: BytesLike[]
];

export const useOneOfOneMinter = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  toAddress,
  mintCount,
  tokenURIs,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721OneOfOneMintExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'mintWithTokenURIsByOwner',
    args: [toAddress, mintCount, tokenURIs] as ArgsType,
  });
};
