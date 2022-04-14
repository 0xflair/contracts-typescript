import ERC721SimpleCollectionArtifact from "contracts-v1.3/collections/ERC721/presets/ERC721SimpleCollection.json";
import ERC721SimpleCollectionSource from "contracts-v1.3/collections/ERC721/presets/ERC721SimpleCollection.sol";
import ERC721FullFeaturedCollectionArtifact from "contracts-v1.3/collections/ERC721/presets/ERC721FullFeaturedCollection.json";
import ERC721FullFeaturedCollectionSource from "contracts-v1.3/collections/ERC721/presets/ERC721FullFeaturedCollection.sol";
import ERC721FullFeaturedCollectionWyvernArtifact from "contracts-v1.3/collections/ERC721/presets/ERC721FullFeaturedCollectionWyvern.json";
import ERC721FullFeaturedCollectionWyvernSource from "contracts-v1.3/collections/ERC721/presets/ERC721FullFeaturedCollectionWyvern.sol";
import ERC721FullFeaturedCollectionZeroExArtifact from "contracts-v1.3/collections/ERC721/presets/ERC721FullFeaturedCollectionZeroEx.json";
import ERC721FullFeaturedCollectionZeroExSource from "contracts-v1.3/collections/ERC721/presets/ERC721FullFeaturedCollectionZeroEx.sol";

import ERC721AutoIdMinterExtensionArtifact from "contracts-v1.3/collections/ERC721/extensions/ERC721AutoIdMinterExtension.json";
import ERC721BulkifyExtensionArtifact from "contracts-v1.3/collections/ERC721/extensions/ERC721BulkifyExtension.json";
import ERC721OneOfOneMintExtensionArtifact from "contracts-v1.3/collections/ERC721/extensions/ERC721OneOfOneMintExtension.json";
import ERC721OwnerMintExtensionArtifact from "contracts-v1.3/collections/ERC721/extensions/ERC721OwnerMintExtension.json";
import ERC721PerTokenMetadataExtensionArtifact from "contracts-v1.3/collections/ERC721/extensions/ERC721PerTokenMetadataExtension.json";
import ERC721PrefixedMetadataExtensionArtifact from "contracts-v1.3/collections/ERC721/extensions/ERC721PrefixedMetadataExtension.json";
import ERC721PreSaleExtensionArtifact from "contracts-v1.3/collections/ERC721/extensions/ERC721PreSaleExtension.json";
import ERC721PublicSaleExtensionArtifact from "contracts-v1.3/collections/ERC721/extensions/ERC721PublicSaleExtension.json";
import ERC721RoleBasedMintExtensionArtifact from "contracts-v1.3/collections/ERC721/extensions/ERC721RoleBasedMintExtension.json";
import ERC721RoyaltyExtensionArtifact from "contracts-v1.3/collections/ERC721/extensions/ERC721RoyaltyExtension.json";
import ERC721SimpleProceedsExtensionArtifact from "contracts-v1.3/collections/ERC721/extensions/ERC721SimpleProceedsExtension.json";

export const CONTRACTS_V_1_3 = {
  //
  // ERC721 Collection Presets
  //
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
  // ERC721 Extensions
  'collections/ERC721/extensions/ERC721AutoIdMinterExtension': {
    artifact: ERC721AutoIdMinterExtensionArtifact,
  },
  'collections/ERC721/extensions/ERC721BulkifyExtension': {
    artifact: ERC721BulkifyExtensionArtifact,
  },
  'collections/ERC721/extensions/ERC721OneOfOneMintExtension': {
    artifact: ERC721OneOfOneMintExtensionArtifact,
  },
  'collections/ERC721/extensions/ERC721OwnerMintExtension': {
    artifact: ERC721OwnerMintExtensionArtifact,
  },
  'collections/ERC721/extensions/ERC721PerTokenMetadataExtension': {
    artifact: ERC721PerTokenMetadataExtensionArtifact,
  },
  'collections/ERC721/extensions/ERC721PrefixedMetadataExtension': {
    artifact: ERC721PrefixedMetadataExtensionArtifact,
  },
  'collections/ERC721/extensions/ERC721PreSaleExtension': {
    artifact: ERC721PreSaleExtensionArtifact,
  },
  'collections/ERC721/extensions/ERC721PublicSaleExtension': {
    artifact: ERC721PublicSaleExtensionArtifact,
  },
  'collections/ERC721/extensions/ERC721RoleBasedMintExtension': {
    artifact: ERC721RoleBasedMintExtensionArtifact,
  },
  'collections/ERC721/extensions/ERC721RoyaltyExtension': {
    artifact: ERC721RoyaltyExtensionArtifact,
  },
  'collections/ERC721/extensions/ERC721SimpleProceedsExtension': {
    artifact: ERC721SimpleProceedsExtensionArtifact,
  },
};
