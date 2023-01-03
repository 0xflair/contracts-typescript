import {
  BALANCE_RAMP_BACKEND,
  BalanceRampRequest,
  BalanceRampRequestConfig,
} from '@flair-sdk/balance-ramp';
import { Environment } from '@flair-sdk/common';

import { useAxiosPost } from '../../../common';

type Config = {
  env?: Environment;
  enabled?: boolean;
  rampRequest?: BalanceRampRequest;
};

export function useBalanceRampRequestConfig({
  env = Environment.PROD,
  enabled = true,
  rampRequest,
}: Config) {
  return useAxiosPost<BalanceRampRequestConfig>({
    url: `${BALANCE_RAMP_BACKEND[env].getBackendConfig}`,
    data: rampRequest,
    enabled,
  });
}
