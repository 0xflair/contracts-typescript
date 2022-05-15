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
};

type ArgsType = [toAddress: BytesLike, mintCount: BigNumberish];

export const useOwnerMinter = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  toAddress,
  mintCount,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721OwnerMintExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'mintByOwner',
    args: [toAddress, mintCount] as ArgsType,
  });
};
