import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { ReadContractConfig } from '@wagmi/core';
import { BigNumberish, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  enabled?: boolean;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

type Args = [];

export const useERC20TotalSupply = ({
  contractVersion,
  enabled,
  contractAddress,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, Args>({
    contractVersion,
    enabled,
    contractFqn: 'openzeppelin/token/ERC20/ERC20',
    functionName: 'totalSupply',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
