import { Environment, useAxiosGet } from '@0xflair/react-common';
import { BytesLike } from 'ethers';

import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';
import { useAddressListMerkleMetadata } from './useAddressListMerkleMetadata';
import { useMerkleLeafAddressOnly } from './useMerkleLeafAddressOnly';
import { useMerkleLeafAddressWithAllowance } from './useMerkleLeafAddressWithAllowance';

type Config = {
  env?: Environment;
  enabled?: boolean;
  rootHash?: BytesLike;
  address?: BytesLike;
  leafMode?: 'address-only' | 'address-with-allowance';
};

export function useAddressListMerkleProof({
  env = Environment.PROD,
  enabled,
  rootHash,
  address,
  leafMode = 'address-with-allowance',
}: Config) {
  const {
    data: merkleMetadata,
    error: merkleMetadataError,
    isLoading: merkleMetadataLoading,
    sendRequest: getMerkleMetadata,
  } = useAddressListMerkleMetadata({
    env,
    address,
    rootHash,
    enabled: Boolean(enabled && rootHash && address),
  });

  const merkleLeafAddressOnly = useMerkleLeafAddressOnly({
    address,
  });

  const merkleLeafWithAllowance = useMerkleLeafAddressWithAllowance({
    address,
    maxAllowance: merkleMetadata?.maxAllowance,
  });

  const merkleLeaf =
    leafMode === 'address-only'
      ? merkleLeafAddressOnly
      : merkleLeafWithAllowance;

  const {
    data: merkleProofData,
    error: merkleProofError,
    isLoading: merkleProofLoading,
  } = useAxiosGet<{ proof: BytesLike[] }>({
    url: `${
      FLAIR_ADDRESS_LISTS_BACKEND[env]
    }/v2/address-list-merkle-trees/${rootHash}/proof/${merkleLeaf?.toString()}`,
    enabled: Boolean(enabled && rootHash && address && merkleLeaf),
  });

  return {
    data: { merkleProof: merkleProofData?.proof || undefined, merkleMetadata },
    error: merkleProofError || merkleMetadataError,
    isLoading: merkleProofLoading || merkleMetadataLoading,
    refetch: getMerkleMetadata,
  };
}
