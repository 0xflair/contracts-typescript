import { BigNumberish } from 'ethers';

import { MetadataURIMode } from '../metadata/types';

export type ERC1155Token = {
  tokenId?: BigNumberish;

  // Supply Extension
  maxSupply?: BigNumberish;

  // Metadata Facet
  metadataMode?: MetadataURIMode;
  customMetadataURI?: string;

  isSavedOnChain?: boolean;
};
