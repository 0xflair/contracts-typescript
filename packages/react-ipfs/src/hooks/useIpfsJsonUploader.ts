import { Environment, useCancel } from '@0xflair/react-common';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { FLAIR_IPFS_BACKEND } from '../constants';

async function ipfsUploadJson(
  env: Environment,
  jsonContent: Record<string, any>
) {
  return axios
    .post<string>(`${FLAIR_IPFS_BACKEND[env]}/v1/ipfs/upload/json`, jsonContent)
    .then((res) => {
      return res.data;
    });
}

type State = {
  ipfsUrl?: string;
  error?: Error;
  loading?: boolean;
};

const initialState: State = {
  loading: false,
};

export function useIpfsJsonUploader(options: {
  env?: Environment;
  autoUpload?: boolean;
  jsonContent?: Record<string, any>;
}) {
  const { env = Environment.PROD, autoUpload, jsonContent } = options;

  const [state, setState] = useState<State>(initialState);
  const [lastAutoUploaded, setLastAutoUploaded] = useState<any>();

  const cancelQuery = useCancel();
  const uploadToIpfs = useCallback(
    async (args?: { jsonContent?: Record<string, any> }) => {
      let didCancel = false;
      cancelQuery(() => {
        didCancel = true;
      });

      if (!jsonContent && !args?.jsonContent) {
        if (!didCancel) {
          setState({
            error: new Error(
              `Must provide "jsonContent" to useIpfsContentUploader hook as option or as arg when calling uploadToIpfs`
            ),
            loading: false,
          });
        }
        return;
      }

      try {
        setState({
          loading: true,
        });

        const ipfsHash = await ipfsUploadJson(
          env,
          (args?.jsonContent || jsonContent) as Record<string, any>
        );
        const ipfsUrl = `ipfs://${ipfsHash}`;

        if (!didCancel) {
          setState({ ipfsUrl, loading: false });
        }

        return ipfsUrl;
      } catch (error) {
        if (!didCancel) {
          setState({ error: error as Error, loading: false });
        }
      }
    },
    [cancelQuery, env, jsonContent]
  );

  useEffect(() => {
    const stringContent = JSON.stringify(jsonContent);
    if (autoUpload && lastAutoUploaded !== stringContent) {
      setLastAutoUploaded(stringContent);
      uploadToIpfs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoUpload, jsonContent]);

  return [
    {
      data: state.ipfsUrl,
      error: state.error,
      loading: state.loading,
    },
    uploadToIpfs,
  ] as const;
}
