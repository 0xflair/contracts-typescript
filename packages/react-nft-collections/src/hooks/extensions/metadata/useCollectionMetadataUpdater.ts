import { Version } from '@0xflair/contracts-registry';
import { Environment, ZERO_ADDRESS } from '@0xflair/react-common';
import { useIpfsFileUploader, useIpfsJsonUploader } from '@0xflair/react-ipfs';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { useCallback } from 'react';

import { useCollectionMetadataUriUpdater } from './useCollectionMetadataUriUpdater';

export type NftCollectionMetadataUpdates = {
  collectionName?: string;
  collectionSymbol?: string;
  collectionDescription?: string;
  collectionImageFile?: File;
  collectionImageUri?: string;
  additionalMetadataAttributes?: Record<string, any>;
};

type Config = {
  env?: Environment;
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider;
  metadataUpdates?: NftCollectionMetadataUpdates;
};

export const useCollectionMetadataUpdater = ({
  env = Environment.PROD,
  version,
  contractAddress = ZERO_ADDRESS,
  signerOrProvider,
  metadataUpdates,
}: Config) => {
  const {
    data: setCollectionMetadataUriDate,
    error: setCollectionMetadataUriError,
    isLoading: setCollectionMetadataUriLoading,
    writeAndWait: setCollectionMetadataUri,
  } = useCollectionMetadataUriUpdater({
    contractAddress,
    signerOrProvider,
    version,
  });

  const {
    data: collectionImageUploaderUri,
    isLoading: collectionImageUploaderLoading,
    error: collectionImageUploaderError,
    uploadToIpfs: collectionImageUpload,
  } = useIpfsFileUploader({
    env,
    autoUpload: false,
  });

  const {
    data: collectionMetadataUploaderUri,
    isLoading: collectionMetadataUploaderLoading,
    error: collectionMetadataUploaderError,
    uploadToIpfs: collectionMetadataUpload,
  } = useIpfsJsonUploader({
    env,
    autoUpload: false,
  });

  const uploadCollectionMetadata = useCallback(
    async (args?: { metadataUpdates: NftCollectionMetadataUpdates }) => {
      const updates = args?.metadataUpdates || metadataUpdates;

      let collectionImageUri = updates?.collectionImageUri;
      if (updates?.collectionImageFile) {
        collectionImageUri = await collectionImageUpload({
          fromFile: updates?.collectionImageFile,
        });
      }

      const collectionMetadataUri = await collectionMetadataUpload({
        jsonContent: {
          name: updates?.collectionName,
          image: collectionImageUri,
          description: updates?.collectionDescription,
          ...(updates?.additionalMetadataAttributes || {}),
        },
      });

      return { collectionMetadataUri, collectionImageUri };
    },
    [metadataUpdates, collectionImageUpload, collectionMetadataUpload]
  );

  const updateCollectionMetadataUri = useCallback(
    async (args: { collectionMetadataUri?: string }) => {
      if (!args.collectionMetadataUri && !collectionMetadataUploaderUri) return;

      await setCollectionMetadataUri([
        (args.collectionMetadataUri || collectionMetadataUploaderUri) as string,
      ]);
    },
    [collectionMetadataUploaderUri, setCollectionMetadataUri]
  );

  const uploadAndUpdateCollectionMetadata = useCallback(async () => {
    const { collectionImageUri, collectionMetadataUri } =
      await uploadCollectionMetadata();

    if (contractAddress && contractAddress !== ZERO_ADDRESS) {
      await updateCollectionMetadataUri({
        collectionMetadataUri,
      });
    } else {
      console.warn(
        `Could not set collectionMetadataUri (${collectionMetadataUri}) because contractAddress is not provided (${contractAddress})`
      );
    }

    return { collectionImageUri, collectionMetadataUri };
  }, [uploadCollectionMetadata, contractAddress, updateCollectionMetadataUri]);

  return [
    {
      data: {
        collectionImageUploaderUri,
        collectionMetadataUploaderUri,
        ...setCollectionMetadataUriDate,
      },
      error:
        setCollectionMetadataUriError ||
        collectionImageUploaderError ||
        collectionMetadataUploaderError,
      loading:
        setCollectionMetadataUriLoading ||
        collectionImageUploaderLoading ||
        collectionMetadataUploaderLoading,
    },
    uploadAndUpdateCollectionMetadata,
  ] as const;
};
