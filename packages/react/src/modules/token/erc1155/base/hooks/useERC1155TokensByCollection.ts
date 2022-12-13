import { Environment } from '@flair-sdk/common';
import { BigNumber } from 'ethers';
import { rest } from 'lodash';
import { useMemo } from 'react';

import { useDiamondContext } from '../../../../../core';
import { ERC1155Token } from '../../types';
import { useERC1155TokensByCollectionContractOnly } from './useERC1155TokensByCollectionContractOnly';

type Props = {
  env?: Environment;
  clientId?: string;
  chainId?: number;
  contractAddress?: string;
  enabled?: boolean;
};

const ADMIN_ERC1155_TOKENS_CARD_ID = 'admin:erc1155-tokens';

export const useERC1155TokensByCollection = ({
  env = Environment.PROD,
  clientId = 'none',
  chainId,
  contractAddress,
  enabled = true,
}: Props) => {
  const { data: collectionTokens, ...rest } =
    useERC1155TokensByCollectionContractOnly({
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
  ]);

  return {
    ...rest,
    data: combinedTokens,
  };
};
