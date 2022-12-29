import { normalizeIpfsUrl } from '@flair-sdk/ipfs';

import { Errors, Spinner, useRemoteJsonReader } from '../../../../core';
import { NftTokenMetadata } from '../types';

type Props = {
  uri?: string;
  metadata?: NftTokenMetadata;
  hideName?: boolean;
  hideDescription?: boolean;
  hideAttributes?: boolean;
  preferDedicatedGateway?: boolean;
  className?: string;
};

export const NftMetadataPreview = ({
  uri,
  metadata,
  hideName = false,
  hideDescription = false,
  hideAttributes = true,
  preferDedicatedGateway = false,
}: Props) => {
  const {
    data: remoteTokenMetadata,
    error: remoteTokenMetadataError,
    isLoading: remoteTokenMetadataLoading,
    sendRequest: fetchRemoteTokenMetadata,
  } = useRemoteJsonReader({
    uri: uri?.toString(),
    enabled: Boolean(uri),
    preferDedicatedGateway,
  });

  const finalMetadata = metadata || remoteTokenMetadata;

  return (
    <>
      {remoteTokenMetadataLoading ? (
        <span className="metadata-loading flex items-center gap-2">
          <Spinner /> Loading...
        </span>
      ) : remoteTokenMetadataError ? (
        <span className="metadata-error">
          <Errors
            title="Could not load metadata from URI"
            error={remoteTokenMetadataError}
          />
        </span>
      ) : !finalMetadata ? (
        <span className="metadata-error">
          {uri ? (
            <Errors
              title="Unknown error"
              error={'Metadata URI set but could not fetch!'}
            />
          ) : null}
        </span>
      ) : (
        <div className="metadata-wrapper flex flex-col items-start gap-2">
          {finalMetadata.image ? (
            <img
              src={normalizeIpfsUrl(
                finalMetadata.image,
                preferDedicatedGateway,
              )}
              className="metadata-image h-16 w-16 rounded-md"
            />
          ) : null}
          <div className="metadata-info">
            {!hideName && (
              <h4 className="metadata-title text-md font-bold">
                {finalMetadata.name || <span className="italic">No name</span>}
              </h4>
            )}
            {!hideDescription && (
              <p className="metadata-description mt-1">
                {finalMetadata.description || (
                  <span className="italic">No description</span>
                )}
              </p>
            )}
            {!hideAttributes && (
              <p className="metadata-attributes mt-1 text-neutral-700">
                {finalMetadata.attributes ? (
                  JSON.stringify(finalMetadata.attributes)
                ) : (
                  <span className="italic">No attributes</span>
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
