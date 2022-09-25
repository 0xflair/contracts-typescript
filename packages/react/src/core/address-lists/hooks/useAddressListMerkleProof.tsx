import { Environment } from '@flair-sdk/common';
import { BytesLike } from 'ethers';
import { useCallback } from 'react';

import { useAxiosGet } from '../../../common';
import { FLAIR_ADDRESS_LISTS_BACKEND } from '../constants';
import { useAddressListMerkleMetadata } from './useAddressListMerkleMetadata';
import {
  generateMerkleLeadAddressOnly,
  useMerkleLeafAddressOnly,
} from './useMerkleLeafAddressOnly';
import {
  generateMerkleLeadAddressWithAllowance,
  useMerkleLeafAddressWithAllowance,
} from './useMerkleLeafAddressWithAllowance';

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
    refetch: getMerkleMetadata,
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
    sendRequest: getMerkleProof,
  } = useAxiosGet<{ proof: BytesLike[] }>({
    url: `${
      FLAIR_ADDRESS_LISTS_BACKEND[env]
    }/v2/address-list-merkle-trees/${rootHash}/proof/${merkleLeaf?.toString()}`,
    enabled: Boolean(enabled && rootHash && address && merkleLeaf),
  });

  const refetch = useCallback(
    () => getMerkleMetadata().then(() => getMerkleProof()),
    [getMerkleMetadata, getMerkleProof],
  );

  const call = useCallback(
    async (overrides?: {
      rootHash?: Config['rootHash'];
      address?: Config['address'];
      leafMode?: Config['leafMode'];
    }) => {
      const rootHashFinal = overrides?.rootHash || rootHash;
      const addressFinal = overrides?.address || address;

      if (!addressFinal || !rootHashFinal) {
        return;
      }

      const overrideMetadataResponse =
        overrides?.rootHash || overrides?.address
          ? await getMerkleMetadata({
              rootHash: rootHashFinal,
              address: addressFinal,
            })
          : undefined;

      const maxAllowanceFinal =
        overrideMetadataResponse?.maxAllowance || merkleMetadata?.maxAllowance;

      const overrideMerkleLeaf =
        overrides?.leafMode === 'address-only'
          ? generateMerkleLeadAddressOnly(addressFinal)
          : generateMerkleLeadAddressWithAllowance(
              addressFinal,
              maxAllowanceFinal,
            );

      const proofResponse = await getMerkleProof({
        url: `${
          FLAIR_ADDRESS_LISTS_BACKEND[env]
        }/v2/address-list-merkle-trees/${
          overrides?.rootHash || rootHash
        }/proof/${overrideMerkleLeaf || merkleLeaf}`,
      });

      return {
        merkleProof: proofResponse?.data.proof || merkleProofData?.proof,
        merkleMetadata: overrideMetadataResponse || merkleMetadata,
      };
    },
    [
      address,
      env,
      getMerkleMetadata,
      getMerkleProof,
      merkleLeaf,
      merkleMetadata,
      merkleProofData?.proof,
      rootHash,
    ],
  );

  return {
    data: {
      merkleProof: merkleProofData?.proof || undefined,
      merkleMetadata: merkleMetadata || undefined,
    },
    error: merkleProofError || merkleMetadataError,
    isLoading: merkleProofLoading || merkleMetadataLoading,
    refetch,
    call,
  } as const;
}
