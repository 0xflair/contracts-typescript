import { Connector } from '@wagmi/core';
import { ReactNode } from 'react';

export type DeepLinkConfig = {
  id: string;
  name: string;
  logo: React.FC<any>;
  getUri: () => Promise<string>;
};

export type DeepLinkContext = {
  connectors?: Connector<any, any, any>[];
};
