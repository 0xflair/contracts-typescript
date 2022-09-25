import { BigNumberish, BytesLike } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../../../common';

type Config = PredefinedReadContractConfig<Args> & {
  accountAddress?: BytesLike;
};

type Args = [accountAddress?: BytesLike];

export const useERC20BalanceOf = ({
  accountAddress,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, Args>({
    contractFqn: 'openzeppelin/token/ERC20/ERC20',
    functionName: 'balanceOf',
    args: accountAddress ? [accountAddress] : undefined,
    ...restOfConfig,
  });
};
