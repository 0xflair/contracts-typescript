import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { ReadContractConfig } from '@wagmi/core';
import { Signer } from 'ethers';
import { useContractRead } from 'wagmi';

type Config = ReadContractConfig & {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  enabled?: boolean;
  watch?: boolean;
};

export const useOzOwner = ({
  contractAddress,
  version,
  signerOrProvider,
  enabled,
  ...restOfConfig
}: Config) => {
  const contract = loadContract('openzeppelin/access/Ownable', version);

  const result = useContractRead(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'owner',
    {
      enabled: Boolean(enabled && contractAddress),
      ...restOfConfig,
    }
  );

  return result;
};
