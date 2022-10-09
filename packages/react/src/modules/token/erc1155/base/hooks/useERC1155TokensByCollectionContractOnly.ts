import { Environment } from '@flair-sdk/common';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';

import { useNftTokensByCollection } from '../../../../../core/data-query/hooks/useNftTokensByCollection';
import {
  useTokenMetadataBaseUri,
  useTokenMetadataFallbackUri,
  useTokenMetadataUriBatch,
} from '../../../metadata';
import { MetadataURIMode } from '../../../metadata/types';
import { ERC1155Token } from '../../types';
import { useERC1155MaxSupplyBatch } from './useERC1155MaxSupplyBatch';

type Props = {
  env?: Environment;
  clientId?: string;
  chainId?: number;
  contractAddress?: string;
  walletAddress?: string;
  enabled?: boolean;
};

export const useERC1155TokensByCollectionContractOnly = ({
  env = Environment.PROD,
  clientId = 'none',
  chainId,
  contractAddress,
  enabled = true,
}: Props) => {
  const {
    data: collectionTokens,
    error: collectionTokensError,
    isLoading: collectionTokensLoading,
  } = useNftTokensByCollection({
    env,
    clientId,
    chainId,
    contractAddress,
    enabled,
  });

  const tokenIds = useMemo(() => {
    return Array.from(Array(100).keys());
    // if (collectionTokens === undefined && !collectionTokensLoading) {
    // if (!collectionTokens?.length && !collectionTokensLoading) {
    //   return Array.from(Array(100).keys());
    // }
    // return collectionTokens?.length
    //   ? collectionTokens?.map((token) => token.tokenId)
    //   : Array.from(Array(100).keys());
  }, []);

  const {
    data: collectionBaseUri,
    error: collectionBaseUriError,
    isLoading: collectionBaseUriLoading,
  } = useTokenMetadataBaseUri({
    chainId,
    contractAddress,
  });

  const {
    data: collectionFallbackUri,
    error: collectionFallbackUriError,
    isLoading: collectionFallbackUriLoading,
  } = useTokenMetadataFallbackUri({
    chainId,
    contractAddress,
  });

  const {
    data: tokenIdToMaxSupplyMapping,
    error: tokenIdToMaxSupplyMappingError,
    isLoading: tokenIdToMaxSupplyMappingLoading,
  } = useERC1155MaxSupplyBatch({
    chainId,
    contractAddress,
    tokenIds,
    enabled,
  });

  const {
    data: tokenIdToUriMapping,
    error: tokenIdToUriMappingError,
    isLoading: tokenIdToUriMappingLoading,
  } = useTokenMetadataUriBatch({
    chainId,
    contractAddress,
    tokenIds,
    enabled,
  });

  const combinedTokenIds = useMemo(() => {
    const combinedTokenIds: string[] =
      collectionTokens?.map((token) => token.tokenId.toString()) ?? [];
    Object.entries(tokenIdToMaxSupplyMapping || {}).map(
      ([tokenId, maxSupply]) => {
        if (maxSupply && BigNumber.from(maxSupply).gt(0)) {
          combinedTokenIds.push(tokenId.toString());
        }
      },
    );
    return [...new Set(combinedTokenIds)];
  }, [collectionTokens, tokenIdToMaxSupplyMapping]);

  const tokens = useMemo(() => {
    return combinedTokenIds.map((tokenId) => {
      const metadataURI =
        tokenIdToUriMapping?.[tokenId?.toString()]?.toString();
      const metadataMode =
        metadataURI === collectionFallbackUri?.toString() ||
        metadataURI === `${collectionBaseUri?.toString()}${tokenId?.toString()}`
          ? MetadataURIMode.AUTOMATED
          : MetadataURIMode.CUSTOM;
      return {
        tokenId,
        ...(collectionTokens?.find(
          (token) => token.tokenId?.toString() === tokenId?.toString(),
        ) ?? {}),
        maxSupply: tokenIdToMaxSupplyMapping?.[tokenId]?.toString(),
        customMetadataURI:
          metadataMode === MetadataURIMode.CUSTOM
            ? tokenIdToUriMapping?.[tokenId]?.toString()
            : undefined,
        finalMetadataURI: tokenIdToUriMapping?.[tokenId]?.toString(),
        metadataMode,
        isSavedOnChain: true,
      } as ERC1155Token;
    }) as ERC1155Token[];
  }, [
    collectionBaseUri,
    collectionFallbackUri,
    collectionTokens,
    combinedTokenIds,
    tokenIdToMaxSupplyMapping,
    tokenIdToUriMapping,
  ]);

  return {
    data: tokens,
    error:
      collectionTokensError ||
      tokenIdToMaxSupplyMappingError ||
      tokenIdToUriMappingError,
    isLoading:
      collectionTokensLoading ||
      tokenIdToMaxSupplyMappingLoading ||
      tokenIdToUriMappingLoading,
  } as const;
};
