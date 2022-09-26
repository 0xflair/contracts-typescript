import { BigNumberish, BytesLike } from 'ethers';

import { PredefinedReadContractConfig } from '../../../common';
import { useContractRead } from '../../../common/hooks/useContractRead';

type ArgsType = [tierId: BigNumberish, walletAddress: BytesLike];

type Config = {
  tierId?: BigNumberish;
  walletAddress?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTieredSalesWalletMints = ({
  chainId,
  contractAddress,
  enabled = true,
  tierId,
  walletAddress,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractReference: 'flair-sdk:finance/sales/ITieredSales',
    functionName: 'walletMintedByTier',
    chainId,
    contractAddress,
    args: [tierId, walletAddress] as ArgsType,
    enabled: enabled && tierId !== undefined && walletAddress !== undefined,
    ...restOfConfig,
  });
};
