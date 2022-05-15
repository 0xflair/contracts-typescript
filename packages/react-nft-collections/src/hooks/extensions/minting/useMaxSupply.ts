import { ContractVersion } from "@0xflair/contracts-registry";
import { ReadContractConfig, useContractRead } from "@0xflair/react-common";
import { Provider } from "@ethersproject/providers";
import { BigNumberish, Signer } from "ethers";

type Config = Partial<ReadContractConfig> & {
  version?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const useMaxSupply = ({
  contractAddress,
  version,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish>({
    version,
    contractFqn: "collections/ERC721/extensions/ERC721AutoIdMinterExtension",
    functionName: "maxSupply",
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
