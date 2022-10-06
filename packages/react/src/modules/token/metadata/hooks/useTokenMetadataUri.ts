import { useMemo } from 'react';

import { ERC1155Token } from '../../erc1155/types';
import { MetadataURIFlavor, MetadataURIMode } from '../types';
import { useTokenMetadataBasics } from './useTokenMetadataBasics';

type Props = {
  chainId?: number;
  contractAddress?: string;
  token?: ERC1155Token;
  enabled?: boolean;
};

export const useTokenMetadataUri = ({
  chainId,
  contractAddress,
  token,
  enabled = true,
}: Props) => {
  const {
    data: { finalBaseURI, finalURISuffix, finalFallbackURI },
    error,
    isLoading,
  } = useTokenMetadataBasics({
    chainId,
    contractAddress,
    enabled,
  });

  const data = useMemo(() => {
    if (token?.metadataMode === MetadataURIMode.CUSTOM) {
      return {
        mode: MetadataURIMode.CUSTOM,
        flavor: MetadataURIFlavor.CUSTOM_URI,
        uri: token?.customMetadataURI?.toString() || '',
        baseURI: finalBaseURI?.toString(),
        fallbackURI: finalFallbackURI?.toString(),
      };
    }

    if (finalFallbackURI) {
      return {
        mode: MetadataURIMode.AUTOMATED,
        flavor: MetadataURIFlavor.FALLBACK_URI,
        uri: finalFallbackURI?.toString(),
        baseURI: finalBaseURI?.toString(),
        fallbackURI: finalFallbackURI?.toString(),
      };
    }

    return {
      mode: MetadataURIMode.AUTOMATED,
      flavor: MetadataURIFlavor.BASE_URI,
      uri: `${finalBaseURI.toString()}${token?.tokenId?.toString()}${finalURISuffix.toString()}`,
      baseURI: finalBaseURI?.toString(),
      fallbackURI: finalFallbackURI?.toString(),
    };
  }, [
    finalBaseURI,
    finalFallbackURI,
    finalURISuffix,
    token?.customMetadataURI,
    token?.metadataMode,
    token?.tokenId,
  ]);

  return {
    data,
    error,
    isLoading,
  } as const;
};
