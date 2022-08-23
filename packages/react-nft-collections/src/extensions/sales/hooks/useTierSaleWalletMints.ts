import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish, BytesLike } from 'ethers';

type ArgsType = [tierId: BigNumberish, walletAddress: BytesLike];

type Config = {
  tierId?: BigNumberish;
  walletAddress?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTierSaleWalletMints = ({
  chainId,
  contractAddress,
  enabled = true,
  tierId,
  walletAddress,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractFqn: 'collections/ERC721/extensions/ERC721TieringExtension',
    functionName: 'walletMintedByTier',
    chainId,
    contractAddress,
    args: [tierId, walletAddress] as ArgsType,
    enabled: enabled && tierId !== undefined && walletAddress !== undefined,
    ...restOfConfig,
  });
};
