import { CustodyType } from '@flair-sdk/common';
import { Connector } from '@wagmi/core';

export interface ExtendedConnector extends Connector {
  name: string;
  available: boolean;
  ready: boolean;
  custodyType: CustodyType;
  icon?: string | Promise<string> | ((props: any) => JSX.Element);
}
