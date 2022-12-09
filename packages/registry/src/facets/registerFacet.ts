import { generateFacetId } from './generateFacetId';
import { getFacetsRegistry } from './getFacetsRegistry';
import { FacetManifest } from './types';

export const registerFacet = (facet: FacetManifest) => {
  const registry = getFacetsRegistry();

  if (registry.find((f) => generateFacetId(f) === generateFacetId(facet))) {
    console.log(
      `Facet ${generateFacetId(facet)} already registered, skipping. `,
      facet,
    );
    return;
  }

  registry.push(facet);
};
