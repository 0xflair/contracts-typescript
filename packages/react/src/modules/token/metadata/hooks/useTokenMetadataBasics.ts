import { BytesLike } from 'ethers';
import { useMemo } from 'react';

import { useDiamondContext } from '../../../../core';
import { useTokenMetadataBaseUri } from './useTokenMetadataBaseUri';
import { useTokenMetadataFallbackUri } from './useTokenMetadataFallbackUri';
import { useTokenMetadataUriSuffix } from './useTokenMetadataUriSuffix';

type Props = {
  chainId?: number;
  contractAddress?: string;
  enabled?: boolean;
};

const TOKEN_BASICS_CARD_ID = 'admin:erc1155-token-metadata-basics';

export const useTokenMetadataBasics = ({ chainId, contractAddress }: Props) => {
  const {
    data: { configValues },
  } = useDiamondContext();

  const {
    data: collectionBaseUri,
    error: collectionBaseUriError,
    isLoading: collectionBaseUriLoading,
  } = useTokenMetadataBaseUri({
    chainId,
    contractAddress,
  });

  const {
    data: collectionUriSuffix,
    error: collectionUriSuffixError,
    isLoading: collectionUriSuffixLoading,
  } = useTokenMetadataUriSuffix({
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

  const configBaseUri = useMemo(() => {
    if (configValues?.[TOKEN_BASICS_CARD_ID]) {
      return configValues?.[TOKEN_BASICS_CARD_ID]?.baseURI as BytesLike;
    }
  }, [configValues]);

  const configUriSuffix = useMemo(() => {
    if (configValues?.[TOKEN_BASICS_CARD_ID]) {
      return configValues?.[TOKEN_BASICS_CARD_ID]?.uriSuffix as BytesLike;
    }
  }, [configValues]);

  const configFallbackUri = useMemo(() => {
    if (configValues?.[TOKEN_BASICS_CARD_ID]) {
      return configValues?.[TOKEN_BASICS_CARD_ID]?.fallbackURI as BytesLike;
    }
  }, [configValues]);

  const finalBaseURI = collectionBaseUri || configBaseUri || '';
  const finalURISuffix = collectionUriSuffix || configUriSuffix || '';
  const finalFallbackURI = collectionFallbackUri || configFallbackUri || '';

  return {
    data: {
      finalBaseURI,
      finalURISuffix,
      finalFallbackURI,
      collectionBaseUri,
      collectionUriSuffix,
      collectionFallbackUri,
      configBaseUri,
      configUriSuffix,
      configFallbackUri,
    },
    error:
      collectionBaseUriError ||
      collectionUriSuffixError ||
      collectionFallbackUriError,
    isLoading:
      collectionBaseUriLoading ||
      collectionUriSuffixLoading ||
      collectionFallbackUriLoading,
  } as const;
};
