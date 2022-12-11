import { normalizeIpfsUrl } from '@flair-sdk/ipfs';

import { Errors, Spinner, useRemoteJsonReader } from '../../../../core';

type Props = {
  uri?: string;
  hideAttributes?: boolean;
  hideDescription?: boolean;
  className?: string;
};

export const NftMetadataPreview = ({
  uri,
  hideAttributes = true,
  hideDescription = false,
}: Props) => {
  const {
    data: remoteTokenMetadata,
    error: remoteTokenMetadataError,
    isLoading: remoteTokenMetadataLoading,
    sendRequest: fetchRemoteTokenMetadata,
  } = useRemoteJsonReader({
    uri: uri?.toString(),
    enabled: Boolean(uri),
  });

  return (
    <>
      {remoteTokenMetadataLoading ? (
        <span className="metadata-loading flex gap-2">
          <Spinner /> Loading...
        </span>
      ) : remoteTokenMetadataError ? (
        <span className="metadata-error">
          <Errors
            title="Could not load metadata from URI"
            error={remoteTokenMetadataError}
          />
        </span>
      ) : !remoteTokenMetadata ? (
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
          {remoteTokenMetadata.image ? (
            <img
              src={normalizeIpfsUrl(remoteTokenMetadata.image)}
              className="metadata-image h-16 w-16 rounded-md"
            />
          ) : null}
          <div className="metadata-info">
            <h4 className="metadata-title text-lg font-bold">
              {remoteTokenMetadata.name || (
                <span className="italic">No name</span>
              )}
            </h4>
            {!hideDescription && (
              <p className="metadata-description mt-1">
                {remoteTokenMetadata.description || (
                  <span className="italic">No description</span>
                )}
              </p>
            )}
            {!hideAttributes && (
              <p className="metadata-attributes mt-1 text-neutral-700">
                {remoteTokenMetadata.attributes ? (
                  JSON.stringify(remoteTokenMetadata.attributes)
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
