import { SemanticVersion } from '../common';

export type FacetFqn = string;
// examples: flair-sdk:token/ERC1155/ERC1155 openzeppelin:token/ERC1155/ERC1155

export type FacetReference = string;
// examples: flair-sdk:token/ERC1155/ERC1155:^1.2.0

export type EIP165InterfaceID = string;
// examples: 0x80ac58cd

export type SourceReference = string;
// examples: git+ssh://github.com/flair-dao/contracts.git#my-branch   ...   npm:@flair-sdk/contracts@1.0.0

export type FunctionSignatureHash = string;
// examples: 0x80ac58cd

export type FunctionSignatureShorthand = string;
// examples: transfer(address,uint256)

export type FacetManifest = {
  // Mandatory
  addresses: Record<string, string>;
  functionSelectors: (FunctionSignatureHash | FunctionSignatureShorthand)[];

  // Recommended
  fqn?: FacetFqn;
  version?: SemanticVersion;
  providesInterfaces?: EIP165InterfaceID[];
  peerDependencies?: (EIP165InterfaceID | FacetReference)[];
  requiredDependencies?: (EIP165InterfaceID | FacetReference)[];

  // Informational
  category?: string;
  title?: string;
  author?: string;
  notice?: string;
  icon?: string;
  source?: string;
};
