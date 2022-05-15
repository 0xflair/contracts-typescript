import { ContractVersion } from '@0xflair/contracts-registry';
import { Environment, ZERO_ADDRESS } from '@0xflair/react-common';
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
  version?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  placeholderMetadata?: NftTokenMetadataInput;
};

export const usePlaceholderUpdater = ({
  env = Environment.PROD,
  version,
  contractAddress = ZERO_ADDRESS,
  signerOrProvider,
  placeholderMetadata,
}: Config) => {
  const {
    data: setPlaceholderUriDate,
    error: setPlaceholderUriError,
    isLoading: setPlaceholderUriLoading,
    writeAndWait: setPlaceholderUri,
  } = usePlaceholderUriUpdater({
    contractAddress,
    signerOrProvider,
    version,
  });

  const {
    data: placeholderMetadataUploaderUri,
    isLoading: placeholderMetadataUploaderLoading,
    error: placeholderMetadataUploaderError,
    uploadNftTokenMetadata: placeholderMetadataUpload,
  } = useIpfsNftTokenMetadataUploader({
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

    if (!contractAddress || contractAddress === ZERO_ADDRESS) {
      return;
    }

    setPlaceholderUri([metadataUri]);

    return { animationUri, imageUri, metadataUri };
  }, [contractAddress, placeholderMetadataUpload, setPlaceholderUri]);

  return {
    data: {
      ...placeholderMetadataUploaderUri,
      ...setPlaceholderUriDate,
    },
    error: setPlaceholderUriError || placeholderMetadataUploaderError,
    isLoading: setPlaceholderUriLoading || placeholderMetadataUploaderLoading,
    uploadPlaceholder,
  } as const;
};
