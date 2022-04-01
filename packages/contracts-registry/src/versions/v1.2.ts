import ERC721SimpleCollectionArtifact from "contracts-v1.2/collections/ERC721/presets/ERC721SimpleCollection.json";
import ERC721SimpleCollectionSource from "contracts-v1.2/collections/ERC721/presets/ERC721SimpleCollection.sol";
import ERC721FullFeaturedCollectionArtifact from "contracts-v1.2/collections/ERC721/presets/ERC721FullFeaturedCollection.json";
import ERC721FullFeaturedCollectionSource from "contracts-v1.2/collections/ERC721/presets/ERC721FullFeaturedCollection.sol";
import ERC721FullFeaturedCollectionWyvernArtifact from "contracts-v1.2/collections/ERC721/presets/ERC721FullFeaturedWyvernCollection.json";
import ERC721FullFeaturedCollectionWyvernSource from "contracts-v1.2/collections/ERC721/presets/ERC721FullFeaturedWyvernCollection.sol";
import ERC721FullFeaturedCollectionZeroExArtifact from "contracts-v1.2/collections/ERC721/presets/ERC721FullFeaturedZeroExCollection.json";
import ERC721FullFeaturedCollectionZeroExSource from "contracts-v1.2/collections/ERC721/presets/ERC721FullFeaturedZeroExCollection.sol";

export const CONTRACTS_V_1_2 = {
  'collections/ERC721/presets/ERC721SimpleCollection': {
    artifact: ERC721SimpleCollectionArtifact,
    source: ERC721SimpleCollectionSource,
  },
  'collections/ERC721/presets/ERC721FullFeaturedCollection': {
    artifact: ERC721FullFeaturedCollectionArtifact,
    source: ERC721FullFeaturedCollectionSource,
  },
  'collections/ERC721/presets/ERC721FullFeaturedWyvernCollection': {
    artifact: ERC721FullFeaturedCollectionWyvernArtifact,
    source: ERC721FullFeaturedCollectionWyvernSource,
  },
  'collections/ERC721/presets/ERC721FullFeaturedZeroExCollection': {
    artifact: ERC721FullFeaturedCollectionZeroExArtifact,
    source: ERC721FullFeaturedCollectionZeroExSource,
  },
};
