import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BytesLike } from 'ethers';

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
