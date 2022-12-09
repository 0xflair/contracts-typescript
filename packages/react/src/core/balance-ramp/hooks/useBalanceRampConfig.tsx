import { Environment } from '@flair-sdk/common';

import { useAxiosPost } from '../../../common';
import { BALANCE_RAMP_BACKEND } from '../constants';
import { BalanceRampBackendConfig, BalanceRampRequest } from '../types';

type Config = {
  env?: Environment;
  enabled?: boolean;
  rampRequest?: BalanceRampRequest;
};

export function useBalanceRampConfig({
  env = Environment.PROD,
  enabled = true,
  rampRequest,
}: Config) {
  return useAxiosPost<BalanceRampBackendConfig>({
    url: `${BALANCE_RAMP_BACKEND[env].getBackendConfig}`,
    data: rampRequest,
    enabled,
  });
}
