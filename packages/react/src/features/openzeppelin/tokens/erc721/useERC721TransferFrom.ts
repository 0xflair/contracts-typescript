import { Provider } from '@ethersproject/providers';
import { ContractVersion } from '@flair-sdk/registry';
import { WriteContractConfig } from '@wagmi/core';
import { BigNumberish, BytesLike, Signer } from 'ethers';

import { useContractAbi, useContractWriteAndWait } from '../../../../common';

type Config = Partial<WriteContractConfig> & {
  contractVersion?: ContractVersion;
  enabled?: boolean;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  from?: BytesLike;
  to?: BytesLike;
  tokenId?: BigNumberish;
};

type ArgsType = [from?: BytesLike, to?: BytesLike, tokenId?: BigNumberish];

export const useERC721TransferFrom = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
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
