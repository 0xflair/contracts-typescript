import { FacetManifest } from '@flair-sdk/registry';
import { ContractInterface } from 'ethers';

export type SmartContract<TInitialConfig = any, TInfo = any> = {
  _id: string;
  chainId: number;
  contractAddress: string;
  type?: ContractType;
  bytecode?: string;
  abi?: string;
  initialConfig?: TInitialConfig;
  features?: Feature[];
  facets?: FacetManifest[];
  info?: TInfo;
  analysisState?:
    | 'submitted'
    | 'detecting-features'
    | 'extract-information'
    | 'failed'
    | 'succeeded';
  analysisProcessingError?: string;
};

export enum ContractType {
  UNKNOWN = 'UNKNOWN',

  // Standards
  ERC20_TOKEN = 'ERC20_TOKEN',
  ERC721_TOKEN = 'ERC721_TOKEN',
  ERC1155_TOKEN = 'ERC1155_TOKEN',

  // Brand: Flair
  FLAIR_STREAM = 'FLAIR_STREAM',

  // Brand: Gnosis
  GNOSIS_MULTISIG_WALLET = 'GNOSIS_MULTISIG_WALLET',
}

export enum FeatureType {
  Interface = 'Interface',
  Function = 'Function',
}

export type FeatureFunction = {
  type: FeatureType.Function;
  tag: string;
  signature: string;
};

export type FeatureInterface = {
  type: FeatureType.Interface;
  tag: string;
  identifier: string;
  implyWhenAll?: Pick<Feature, 'tag' | 'type'>[];
};

export type FunctionCall = {
  interface: ContractInterface;
  functionName: string;
  args: any[];
};

export type Feature = FeatureFunction | FeatureInterface;

export type BareComponentProps<T extends HTMLElement = HTMLElement> = {
  as?: React.ElementType;
} & React.HTMLAttributes<T>;
