import { Provider } from '@ethersproject/providers';
import { ContractVersion } from '@flair-sdk/contracts-registry';
import { BigNumberish, BytesLike, Signer } from 'ethers';

import { useContractAbi, useContractWriteAndWait } from '../../../common';

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
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721OwnerMintExtension',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    contractAddress,
    signerOrProvider,
    functionName: 'mintByOwner',
    args: [toAddress, mintCount] as ArgsType,
  });
};
