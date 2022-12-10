import { BigNumberish, BytesLike } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

type Config = PredefinedReadContractConfig & {
  walletAddress?: BytesLike;
};

type ArgsType = [walletAddress?: BigNumberish];

export const useERC721Balance = ({
  walletAddress,
  enabled,
  ...config
}: Config) => {
  return useContractRead<BytesLike, ArgsType>({
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
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
    functionName: 'balanceOf(address)',
    args: walletAddress !== undefined ? [walletAddress] : undefined,
    enabled: Boolean(enabled && walletAddress !== undefined),
    ...config,
  });
};
