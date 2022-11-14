import { Connector } from '@wagmi/core';

import { CustodyType } from '../../types';

export interface ExtendedConnector extends Connector {
  name: string;
  available: boolean;
  ready: boolean;
  custodyType: CustodyType;
  icon?: string | ((props: any) => JSX.Element);
}
