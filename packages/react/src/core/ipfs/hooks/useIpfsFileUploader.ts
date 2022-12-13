import { Environment } from '@flair-sdk/common';
import { FLAIR_IPFS_BACKEND, IpfsUploadResult } from '@flair-sdk/ipfs';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useCancel } from '../../../common';

async function ipfsUploadFiles(env: Environment, files: File[]) {
  const formData = new FormData();

  files.forEach((file) => formData.append('files[]', file));

  return axios
    .post<any, { data: IpfsUploadResult[] }>(
      `${FLAIR_IPFS_BACKEND[env]}/v1/ipfs/upload/files`,
      formData,
    )
    .then((res) => {
      return res.data;
    });
}

type State = {
  ipfsUrl?: string;
  error?: Error;
  isLoading?: boolean;
};

const initialState: State = {
  isLoading: false,
};

export function useIpfsFileUploader(options: {
  env?: Environment;
  autoUpload?: boolean;
  fromFile?: File;
}) {
  const { env = Environment.PROD, autoUpload, fromFile } = options;

  const [state, setState] = useState<State>(initialState);
  const [lastAutoUploaded, setLastAutoUploaded] = useState<File>();

  const cancelQuery = useCancel();
  const uploadToIpfs = useCallback(
    async (args?: { fromFile?: File }) => {
      let didCancel = false;
      cancelQuery(() => {
        didCancel = true;
      });

      if (!fromFile && !args?.fromFile) {
        if (!didCancel) {
          setState({
            error: new Error(
              `Must provide "File" to useIpfsFileUploader hook as option or as arg when calling uploadToIpfs`,
            ),
            isLoading: false,
          });
        }
        return;
      }

      try {
        setState({
          isLoading: true,
        });

        const result = await ipfsUploadFiles(env, [
          (fromFile || args?.fromFile) as File,
        ]);
        const ipfsUrl = `ipfs://${result[0].ipfsHash}`;

        if (!didCancel) {
          setState({ ipfsUrl, isLoading: false });
        }

        return ipfsUrl;
      } catch (error) {
        if (!didCancel) {
          setState({ error: error as Error, isLoading: false });
        }
      }
    },
    [cancelQuery, env, fromFile],
  );

  useEffect(() => {
    if (autoUpload && lastAutoUploaded !== fromFile) {
      setLastAutoUploaded(fromFile);
      uploadToIpfs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoUpload, fromFile]);

  return {
    data: state.ipfsUrl,
    error: state.error,
    isLoading: state.isLoading,
    uploadToIpfs,
  } as const;
}
