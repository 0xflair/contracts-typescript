import { PredefinedReadContractConfig } from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

import { useTierSaleInformation } from './useTierSaleInformation';

type ArgsType = [tierId: BigNumberish];

type Config = {
  tierId?: BigNumberish;
} & PredefinedReadContractConfig<ArgsType>;

export const useTierSaleReserved = ({
  chainId,
  contractAddress,
  enabled,
  tierId,
  ...restOfConfig
}: Config) => {
  const result = useTierSaleInformation({
    chainId,
    contractAddress,
    tierId,
    enabled,
    ...restOfConfig,
  });

  return {
    ...result,
    data: result.data?.reserved,
  } as const;
};
