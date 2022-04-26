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
};

type ArgsType = [toAddress: BytesLike, mintCount: BigNumberish];

export const useOwnerMinter = ({
  contractAddress,
  version,
  signerOrProvider,
  toAddress,
  mintCount,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721OwnerMintExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'mintByOwner',
    args: [toAddress, mintCount] as ArgsType,
  });
};
