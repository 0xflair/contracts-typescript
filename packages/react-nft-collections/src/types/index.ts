import { Version } from '@0xflair/contracts-registry';

export enum NftCollectionPreset {
  ERC721FullFeaturedCollection = 'ERC721FullFeaturedCollection',
}

export type NftCollection<
  TConfig extends Record<string, any> = Record<string, any>
> = {
  _id: string;
  chainId: number;
  contractAddress: string;
  deployerAddress: string;
  deployTransaction: string;
  presetName: string;
  presetVersion: Version;
  config?: TConfig;
};

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
  creator: string;
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
