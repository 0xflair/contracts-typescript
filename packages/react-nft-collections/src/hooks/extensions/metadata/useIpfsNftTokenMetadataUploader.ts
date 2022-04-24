import { Environment } from '@0xflair/react-common';
import { useIpfsFileUploader, useIpfsJsonUploader } from '@0xflair/react-ipfs';
import { useCallback } from 'react';

import { NftTokenMetadata } from '../../../types';

export type NftTokenMetadataInput = NftTokenMetadata & {
  imageFile?: File;
  animationFile?: File;
};

type Config = {
  env?: Environment;
  newMetadata?: NftTokenMetadataInput;
};

export const useIpfsNftTokenMetadataUploader = ({
  env = Environment.PROD,
  newMetadata,
}: Config) => {
  const [
    {
      data: imageUri,
      loading: imageUploaderLoading,
      error: imageUploaderError,
    },
    uploadImage,
  ] = useIpfsFileUploader({
    env,
    autoUpload: false,
  });

  const [
    {
      data: animationUri,
      loading: animationUploaderLoading,
      error: animationUploaderError,
    },
    uploadAnimation,
  ] = useIpfsFileUploader({
    env,
    autoUpload: false,
  });

  const [
    {
      data: metadataUri,
      loading: metadataUploaderLoading,
      error: metadataUploaderError,
    },
    uploadMetadata,
  ] = useIpfsJsonUploader({
    env,
    autoUpload: false,
  });

  const uploadNftTokenMetadata = useCallback(async () => {
    let imageUri = newMetadata?.image;
    if (newMetadata?.imageFile) {
      imageUri = await uploadImage({
        fromFile: newMetadata?.imageFile,
      });
    }

    let animationUri = newMetadata?.animation_url;
    if (newMetadata?.animationFile) {
      animationUri = await uploadAnimation({
        fromFile: newMetadata?.animationFile,
      });
    }

    const metadataUri = await uploadMetadata({
      jsonContent: {
        ...newMetadata,
        image: imageUri,
        animation_url: animationUri,
      } as NftTokenMetadata,
    });

    return { imageUri, animationUri, metadataUri };
  }, [newMetadata, uploadImage, uploadAnimation, uploadMetadata]);

  return [
    {
      data: {
        metadataUri,
        imageUri,
        animationUri,
      },
      error:
        metadataUploaderError || imageUploaderError || animationUploaderError,
      loading:
        metadataUploaderLoading ||
        imageUploaderLoading ||
        animationUploaderLoading,
    },
    uploadNftTokenMetadata,
  ] as const;
};
