import { Version } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';

type Config = {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider;
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
  contractAddress,
  version,
  signerOrProvider,
  toAddress,
  mintCount,
  tokenURIs,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721OneOfOneMintExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'mintWithTokenURIsByOwner',
    args: [toAddress, mintCount, tokenURIs] as ArgsType,
  });
};
