import { Environment } from '@flair-sdk/react';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';

import { useDiamondContext } from '../../../../../core';
import { ERC1155Token } from '../../types';
import { useERC1155TokensByCollection } from './useERC1155TokensByCollection';

type Props = {
  env?: Environment;
  clientId?: string;
  chainId?: number;
  contractAddress?: string;
  enabled?: boolean;
};

const ADMIN_ERC1155_TOKENS_CARD_ID = 'admin:erc1155-tokens';

export const useERC1155TokensByCollectionWithDiamondProvider = ({
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
  } = useERC1155TokensByCollection({
    env,
    enabled,
    clientId,
    chainId,
    contractAddress,
  });

  const {
    data: { configValues },
  } = useDiamondContext();

  const tokensERC1155TokensCard = configValues?.[ADMIN_ERC1155_TOKENS_CARD_ID]
    ?.tokens as ERC1155Token[] | undefined;

  const combinedTokens = useMemo(() => {
    const tokens = [...collectionTokens, ...(tokensERC1155TokensCard || [])];
    return tokens
      .filter((token, index) => {
        return (
          tokens.findIndex(
            (t) => t.tokenId?.toString() === token.tokenId?.toString(),
          ) === index
        );
      })
      .map((token) => {
        return {
          ...token,
          tokenId:
            token.tokenId !== undefined &&
            token.tokenId !== '' &&
            token.tokenId !== null
              ? BigNumber.from(token.tokenId)?.toString()
              : '',
        };
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    collectionTokens,
    collectionTokens?.length,
    tokensERC1155TokensCard,
    tokensERC1155TokensCard?.length,
    // finalBaseURI,
    // finalFallbackURI,
  ]);

  return {
    data: combinedTokens,
    error: collectionTokensError,
    isLoading: collectionTokensLoading,
  };
};
