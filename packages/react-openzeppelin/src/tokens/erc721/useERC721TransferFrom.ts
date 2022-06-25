import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractAbi, useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { WriteContractConfig } from '@wagmi/core';
import { BigNumberish, BytesLike, Signer } from 'ethers';

type Config = Partial<WriteContractConfig> & {
  contractVersion?: ContractVersion;
  enabled?: boolean;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  role?: BytesLike;
  from?: BytesLike;
  to?: BytesLike;
  tokenId?: BigNumberish;
};

type ArgsType = [from?: BytesLike, to?: BytesLike, tokenId?: BigNumberish];

export const useERC721TransferFrom = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  role,
  from,
  to,
  tokenId,
  ...restOfConfig
}: Config) => {
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'openzeppelin/token/ERC721/ERC721',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'transferFrom',
    args: [from, to, tokenId],
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
