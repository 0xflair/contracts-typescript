import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  toAddress?: BytesLike;
  mintCount?: BigNumberish;
  tokenURIs?: BytesLike[];
  access?: 'ByRole' | 'ByOwner';
};

type ArgsType = [
  toAddress: BytesLike,
  mintCount: BigNumberish,
  tokenURIs: BytesLike[],
];

export const useOneOfOneMinter = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  toAddress,
  mintCount,
  tokenURIs,
  access = 'ByOwner',
}: Config) => {
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721OneOfOneMintExtension',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    contractAddress,
    signerOrProvider,
    functionName:
      access === 'ByRole'
        ? 'mintWithTokenURIsByRole'
        : 'mintWithTokenURIsByOwner',
    args: [toAddress, mintCount, tokenURIs] as ArgsType,
  });
};
