import { Connector } from '@wagmi/core';

export type DeepLinkConfig = {
  id: string;
  name: string;
  logo: React.FC<any>;
  fire: () => Promise<void>;
};

export type DeepLinkContext = {
  connectors?: Connector<any, any, any>[];
};
