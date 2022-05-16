import { ContractVersion } from '@0xflair/contracts-registry';
import { ReadContractConfig, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export type ERC721OneOfOneContractInfo = [
  maxSupply?: BigNumberish,
  totalSupply?: BigNumberish,
  callerBalance?: BigNumberish
];

export const useERC721OneOfOneContractInfo = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead<ERC721OneOfOneContractInfo>({
    contractVersion,
    contractFqn: 'collections/ERC721/presets/ERC721OneOfOneCollection',
    functionName: 'getInfo',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
