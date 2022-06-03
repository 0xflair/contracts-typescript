import { ContractVersion } from '@0xflair/contracts-registry';
import { ReadContractConfig, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  calculateUntil?: number;
};

export const useStreamClaimableAmount = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  calculateUntil,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish>({
    contractVersion,
    contractFqn: 'streams/ERC721/presets/ERC721HolderVestedDistributor',
    functionName: 'calculateClaimableAmountUntil',
    contractAddress,
    signerOrProvider,
    args: [calculateUntil],
    ...restOfConfig,
  });
};
