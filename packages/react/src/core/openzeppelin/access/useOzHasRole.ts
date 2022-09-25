import { BytesLike } from 'ethers';

import { PredefinedReadContractConfig, useContractRead } from '../../../common';

type Config = PredefinedReadContractConfig<Args> & {
  role?: BytesLike;
  address?: BytesLike;
};

type Args = [role: BytesLike, address: BytesLike];

export const useOzHasRole = ({
  enabled = true,
  role,
  address,
  ...restOfConfig
}: Config) => {
  return useContractRead<boolean, Args>({
    contractFqn: 'openzeppelin/access/AccessControl',
    functionName: 'hasRole',
    args: role && address ? [role, address] : undefined,
    enabled: Boolean(enabled && role && address),
    ...restOfConfig,
  });
};
