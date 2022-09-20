import { Provider } from '@ethersproject/providers';
import { ContractVersion } from '@flair-sdk/registry';
import { BigNumberish, BytesLike, Signer } from 'ethers';

import { useContractAbi, useContractWriteAndWait } from '../../../../common';

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
