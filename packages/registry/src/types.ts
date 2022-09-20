type EIP165InterfaceID = string;

export type FacetManifest = {
  category: string;
  title: string;
  notice: string;
  icon?: string;
  repo: string;
  ref: string;
  fqn: string;
  version: string;
  addresses: Record<string, string>;
  providesInterfaces: EIP165InterfaceID[];
  functionSelectors: string[];
  peerDependencies: EIP165InterfaceID[];
  requiredDependencies: EIP165InterfaceID[];
};
