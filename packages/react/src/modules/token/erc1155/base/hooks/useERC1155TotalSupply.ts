import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

type ArgsType = [tokenId: BigNumberish];

type Config = {
  tokenId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useERC1155TotalSupply = ({
  enabled = true,
  tokenId,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'totalSupply',
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
    functionName: 'totalSupply',
    args: [tokenId] as ArgsType,
    enabled: Boolean(enabled && tokenId),
    ...restOfConfig,
  });
};
