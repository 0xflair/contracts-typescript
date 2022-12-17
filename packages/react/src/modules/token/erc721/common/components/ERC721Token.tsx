import { normalizeIpfsUrl } from '@flair-sdk/ipfs';

import { useRemoteJsonReader } from '../../../../../core/ipfs';
import { Spinner } from '../../../../../core/ui/components';
import { Media } from '../../../metadata/components';
import { NftTokenMetadata } from '../../../metadata/types';
import { useERC721TokenUri } from '../../metadata/useERC721TokenUri';

export type ERC721TokenRenderOptions = {
  tokenId?: string;
  tokenUri?: string;
  tokenUriLoading?: boolean;
  tokenUriError?: Error | string | null;
  metadata?: NftTokenMetadata;
  metadataLoading?: boolean;
  metadataError?: Error | string | null;
};

type Props = {
  chainId?: number;
  contractAddress?: string;
  tokenId?: string;
  tokenUri?: string;
  metadata?: NftTokenMetadata;
  preferManagedGateway?: boolean | string;
  children?: (options: ERC721TokenRenderOptions) => React.ReactNode;
};

export const ERC721Token = ({
  chainId,
  contractAddress,
  tokenId,
  tokenUri,
  metadata,
  preferManagedGateway = false,
  children,
}: Props) => {
  const {
    data: tokenUriFromContract,
    error: tokenUriFromContractError,
    isLoading: tokenUriFromContractLoading,
  } = useERC721TokenUri({
    chainId,
    contractAddress,
    tokenId,
    enabled: Boolean(chainId && contractAddress && tokenId && !tokenUri),
  });

  const finalTokenUri = tokenUri || tokenUriFromContract;

  const {
    data: tokenMetadataFromUri,
    error: tokenMetadataFromUriError,
    isLoading: tokenMetadataFromUriLoading,
  } = useRemoteJsonReader<NftTokenMetadata>({
    uri: normalizeIpfsUrl(finalTokenUri?.toString(), preferManagedGateway),
    enabled: Boolean(finalTokenUri && !metadata),
  });

  const finalTokenMetadata = metadata || tokenMetadataFromUri;

  const finalChildren =
    children ||
    (({ tokenId, tokenUri, tokenUriLoading, metadata, metadataLoading }) => (
      <div>
        <div className="group aspect-w-10 aspect-h-10 block w-full overflow-hidden rounded-lg bg-neutral-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-100">
          {metadata?.animation_url || metadata?.image ? (
            <Media
              className="object-cover"
              uri={metadata?.animation_url || metadata?.image}
              preferManagedGateway={preferManagedGateway}
            />
          ) : metadataLoading || tokenUriLoading ? (
            <Spinner />
          ) : (
            <span className="h-full w-full flex items-center justify-center text-lg font-bold text-neutral-200">
              No Media
            </span>
          )}
        </div>
        <div className="mt-2 block truncate text-sm font-medium text-neutral-900">
          {metadata?.name}
        </div>
        <div className="block text-sm font-medium text-neutral-500 flex items-center justify-between px-1">
          <span className="flex gap-2 items-center">
            {tokenUri ? (
              <a
                href={normalizeIpfsUrl(
                  tokenUri?.toString(),
                  preferManagedGateway,
                )}
                target={'_blank'}
                rel="noreferrer"
              >
                #{tokenId}
              </a>
            ) : (
              <span>#{tokenId}</span>
            )}
          </span>
        </div>
      </div>
    ));

  return (
    <>
      {finalChildren({
        tokenId,
        tokenUri: finalTokenUri?.toString(),
        tokenUriLoading: tokenUriFromContractLoading,
        tokenUriError: tokenUriFromContractError,
        metadata: finalTokenMetadata,
        metadataLoading: tokenMetadataFromUriLoading,
        metadataError: tokenMetadataFromUriError,
      })}
    </>
  );
};
