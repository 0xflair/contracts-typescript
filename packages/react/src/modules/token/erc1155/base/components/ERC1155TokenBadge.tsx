import { classNames } from '@flair-sdk/common';
import { normalizeIpfsUrl } from '@flair-sdk/ipfs';
import { BigNumberish } from 'ethers';
import { ReactNode, useMemo } from 'react';

import { useRemoteJsonReader } from '../../../../../core';
import { useTokenMetadataUri } from '../../../metadata';
import { NftTokenMetadata } from '../../../metadata/types';
import { ERC1155Token } from '../../types';
import { useERC1155TokensByCollection } from '../hooks';

type Props = {
  chainId?: number;
  contractAddress?: string;
  token?: ERC1155Token;
  tokenId?: BigNumberish;
  selected?: boolean;
  defaultRender?: ReactNode;
};

export const ERC1155TokenBadge = ({
  chainId,
  contractAddress,
  token: token_,
  tokenId,
  selected,
  defaultRender = (
    <span className="text-xs text-gray-300">Select an option</span>
  ),
}: Props) => {
  const { data: existingTokens } = useERC1155TokensByCollection({
    chainId,
    contractAddress,
  });

  const token = useMemo(() => {
    return (
      token_ ||
      existingTokens?.find(
        (t) => t.tokenId?.toString() == tokenId?.toString(),
      ) || {
        tokenId,
      }
    );
  }, [existingTokens, tokenId, token_]);

  const {
    data: { uri },
  } = useTokenMetadataUri({
    chainId,
    contractAddress,
    token,
  });

  const { data: remoteMetadata } = useRemoteJsonReader<NftTokenMetadata>({
    uri: uri.toString(),
  });

  return (
    <div className="flex items-center">
      {!token?.tokenId ? (
        <>{defaultRender}</>
      ) : (
        <>
          {remoteMetadata?.image ? (
            <img
              src={normalizeIpfsUrl(remoteMetadata?.image)}
              alt=""
              className="h-6 w-6 flex-shrink-0 rounded-full"
            />
          ) : null}
          <span
            className={classNames(
              selected ? 'font-semibold' : 'font-normal',
              remoteMetadata?.image ? 'ml-3' : '',
              'block truncate flex flex-col gap-2',
            )}
          >
            {remoteMetadata?.name?.toString() ||
              `Token # ${token?.tokenId?.toString()}`}
            {remoteMetadata?.name ? (
              <span className="text-xs text-gray-300">
                Token # {token?.tokenId?.toString()}
              </span>
            ) : null}
          </span>
        </>
      )}
    </div>
  );
};
