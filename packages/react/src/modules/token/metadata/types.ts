export enum MetadataURIMode {
  AUTOMATED = 'automated',
  CUSTOM = 'custom',
}

export enum MetadataURIFlavor {
  BASE_URI = 'base_uri',
  FALLBACK_URI = 'fallback_uri',
  CUSTOM_URI = 'custom_uri',
}

export type NftCollectionMetadata = {
  name?: string;
  image?: string;
  description?: string;
  external_link?: string;
  seller_fee_basis_points?: string;
  fee_recipient?: string;
};

export type NftTokenMetadata = {
  name?: string;
  image?: string;
  image_data?: string;
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
  description?: string;
  creator?: string;
  external_uri?: string;
  attributes?: NftTokenAttribute[];
};

export type NftTokenAttribute = {
  display_type?: NftAttributeDisplayType;
  trait_type?: string;
  value?: string;
};

export type NftAttributeDisplayType =
  | 'number'
  | 'boost_percentage'
  | 'boost_number'
  | 'date';
