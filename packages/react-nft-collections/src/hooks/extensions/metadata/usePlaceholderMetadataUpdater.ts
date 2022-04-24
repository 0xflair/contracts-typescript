import { Version } from '@0xflair/contracts-registry';
import { Environment } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { useCallback } from 'react';

import {
  NftTokenMetadataInput,
  useIpfsNftTokenMetadataUploader,
} from './useIpfsNftTokenMetadataUploader';
import { usePlaceholderUriUpdater } from './usePlaceholderUriUpdater';

type Config = {
  env?: Environment;
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  placeholderMetadata?: NftTokenMetadataInput;
};

export const usePlaceholderUpdater = ({
  env = Environment.PROD,
  contractAddress,
  version,
  signerOrProvider,
  placeholderMetadata,
}: Config) => {
  const [
    {
      data: setPlaceholderUriDate,
      error: setPlaceholderUriError,
      loading: setPlaceholderUriLoading,
    },
    setPlaceholderUri,
  ] = usePlaceholderUriUpdater({
    contractAddress,
    signerOrProvider,
    version,
  });

  const [
    {
      data: placeholderMetadataUploaderUri,
      loading: placeholderMetadataUploaderLoading,
      error: placeholderMetadataUploaderError,
    },
    placeholderMetadataUpload,
  ] = useIpfsNftTokenMetadataUploader({
    env,
    newMetadata: placeholderMetadata,
  });

  const uploadPlaceholder = useCallback(async () => {
    const { animationUri, imageUri, metadataUri } =
      await placeholderMetadataUpload();

    if (!metadataUri) {
      console.warn(
        `Could not upload placeholder metadata and get metadataUri (${metadataUri})`
      );
      return;
    }

    setPlaceholderUri(metadataUri);

    return { animationUri, imageUri, metadataUri };
  }, [placeholderMetadataUpload, setPlaceholderUri]);

  return [
    {
      data: {
        ...placeholderMetadataUploaderUri,
        ...setPlaceholderUriDate,
      },
      error: setPlaceholderUriError || placeholderMetadataUploaderError,
      loading: setPlaceholderUriLoading || placeholderMetadataUploaderLoading,
    },
    uploadPlaceholder,
  ] as const;
};
