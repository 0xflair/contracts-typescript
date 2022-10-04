import { FacetManifest } from './types';

const FACETS_REGISTRY: FacetManifest[] = [];

export const getFacetsRegistry: () => FacetManifest[] = () => {
  return FACETS_REGISTRY;
};
