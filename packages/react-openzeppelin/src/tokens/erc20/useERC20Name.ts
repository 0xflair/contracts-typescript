import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { ReadContractConfig } from '@wagmi/core';
import { BytesLike, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  enabled?: boolean;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

type Args = [];

export const useERC20Name = ({
  contractVersion,
  enabled,
  contractAddress,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead<BytesLike, Args>({
    contractVersion,
    enabled,
    contractFqn: 'openzeppelin/token/ERC20/ERC20',
    functionName: 'name',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
