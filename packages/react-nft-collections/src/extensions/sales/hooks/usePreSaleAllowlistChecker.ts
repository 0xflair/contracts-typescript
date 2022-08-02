import { ContractVersion } from '@0xflair/contracts-registry';
import { useAddressListMerkleProof } from '@0xflair/react-address-lists';
import { Environment, useContractRead } from '@0xflair/react-common';
import { BigNumberish, BytesLike } from 'ethers';
import { useCallback } from 'react';
import versioning from 'versioning';

import { usePreSaleAllowlistMerkleRoot } from './usePreSaleAllowlistMerkleRoot';

type Config = {
  env?: Environment;
  enabled?: boolean;
  chainId?: number;
  contractVersion?: ContractVersion;
  contractAddress?: string;
  minterAddress?: BytesLike;
};

export const usePreSaleAllowlistChecker = ({
  env = Environment.PROD,
  enabled = true,
  chainId,
  contractVersion,
  contractAddress,
  minterAddress,
}: Config) => {
  const readyToRead = Boolean(
    enabled && minterAddress && contractAddress && chainId,
  );

  const leafMode = 'address-only';
  // TODO Use this when simple sale supports allowance in allowlists
  // const leafMode =
  //   !contractVersion || versioning.gte(contractVersion, 'v1.19')
  //     ? 'address-with-allowance'
  //     : 'address-only';

  const {
    data: merkleRoot,
    error: merkleRootError,
    isLoading: merkleRootLoading,
  } = usePreSaleAllowlistMerkleRoot({
    chainId,
    contractAddress,
    enabled: readyToRead,
  });

  const {
    data: proofData,
    error: proofError,
    isLoading: proofLoading,
    refetch: fetchProof,
  } = useAddressListMerkleProof({
    env,
    address: minterAddress,
    leafMode,
    rootHash: merkleRoot,
    enabled: readyToRead,
  });

  const {
    data: isPreSaleAllowListed,
    error: onPreSaleAllowListError,
    isLoading: onPreSaleAllowListLoading,
    refetch: onPreSaleAllowListRead,
  } = useContractRead<
    boolean,
    [BytesLike, BytesLike[]] | [BytesLike, BigNumberish, BytesLike[]]
  >({
    chainId,
    contractVersion,
    enabled: Boolean(readyToRead && minterAddress && proofData?.merkleProof),
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'onPreSaleAllowList',
    contractAddress,
    cacheOnBlock: false,
    cacheTime: 1,
    args:
      minterAddress && proofData?.merkleProof
        ? leafMode === 'address-only'
          ? [minterAddress, proofData.merkleProof]
          : [
              minterAddress,
              Number(proofData.merkleMetadata?.maxAllowance),
              proofData.merkleProof,
            ]
        : undefined,
  });

  const onPreSaleAllowList = useCallback(() => {
    fetchProof().then(() => {
      return onPreSaleAllowListRead();
    });
  }, [fetchProof, onPreSaleAllowListRead]);

  return {
    data: {
      isAllowlisted: isPreSaleAllowListed,
      allowlistProof: proofData.merkleProof || undefined,
      allowlistMetadata: proofData.merkleMetadata || undefined,
    },
    error: onPreSaleAllowListError || proofError || merkleRootError,
    isLoading: onPreSaleAllowListLoading || proofLoading || merkleRootLoading,
    reCheck: onPreSaleAllowList,
  } as const;
};
