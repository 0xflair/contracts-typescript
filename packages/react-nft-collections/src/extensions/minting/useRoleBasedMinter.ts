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
};

type ArgsType = [toAddress: BytesLike, mintCount: BigNumberish];

export const useRoleBasedMinter = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  toAddress,
  mintCount,
}: Config) => {
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'collections/ERC721/extensions/ERC721RoleBasedMintExtension',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    contractAddress,
    signerOrProvider,
    functionName: 'mintByRole',
    args: [toAddress, mintCount] as ArgsType,
  });
};
