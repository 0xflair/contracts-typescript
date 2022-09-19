import { Provider } from '@ethersproject/providers';
import { ContractVersion } from '@flair-sdk/contracts-registry';
import { WriteContractConfig } from '@wagmi/core';
import { BytesLike, Signer } from 'ethers';

import { useContractAbi, useContractWriteAndWait } from '../../../common';

type Config = Partial<WriteContractConfig> & {
  contractVersion?: ContractVersion;
  enabled?: boolean;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  operator?: BytesLike;
  approved?: boolean;
};

type ArgsType = [operator?: BytesLike, approved?: boolean];

export const useERC721SetApprovalForAll = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  operator,
  approved,
  ...restOfConfig
}: Config) => {
  const contractInterface = useContractAbi({
    contractVersion,
    contractFqn: 'openzeppelin/token/ERC721/ERC721',
  });

  return useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'setApprovalForAll',
    args: [operator, approved],
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};