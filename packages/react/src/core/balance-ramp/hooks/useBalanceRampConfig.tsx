import {
  BALANCE_RAMP_BACKEND,
  BalanceRampBackendConfig,
  BalanceRampRequest,
} from '@flair-sdk/balance-ramp';
import { Environment } from '@flair-sdk/common';

import { useAxiosPost } from '../../../common';

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
