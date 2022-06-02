import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { ReadContractConfig } from '@wagmi/core';
import { BigNumberish, BytesLike, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  enabled?: boolean;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  accountAddress?: BytesLike;
};

type Args = [accountAddress?: BytesLike];

export const useERC20BalanceOf = ({
  contractVersion,
  enabled,
  contractAddress,
  signerOrProvider,
  accountAddress,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, Args>({
    contractVersion,
    enabled,
    contractFqn: 'openzeppelin/token/ERC20/ERC20',
    functionName: 'balanceOf',
    contractAddress,
    signerOrProvider,
    args: [accountAddress],
    ...restOfConfig,
  });
};
