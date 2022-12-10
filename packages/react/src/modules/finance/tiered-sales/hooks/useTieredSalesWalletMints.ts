import { BigNumberish, BytesLike } from 'ethers';

import { PredefinedReadContractConfig } from '../../../../common';
import { useContractRead } from '../../../../common/hooks/useContractRead';

type ArgsType = [tierId: BigNumberish, walletAddress: BytesLike];

type Config = {
  tierId?: BigNumberish;
  walletAddress?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTieredSalesWalletMints = ({
  enabled = true,
  tierId,
  walletAddress,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tierId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
        ],
        name: 'walletMintedByTier',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'walletMintedByTier(uint256,address)',
    args: [tierId, walletAddress] as ArgsType,
    enabled: enabled && tierId !== undefined && walletAddress !== undefined,
    ...restOfConfig,
  });
};
