import {
  IpfsUploaderHook,
  IpfsUploaderOptions,
  IpfsUploadResult,
} from "../types";
import axios from "axios";
import { FLAIR_IPFS_BACKEND } from "../constants";
import { useCallback, useEffect, useState } from "react";
import { useCancel } from "@0xflair/react-common";

async function ipfsUploadFiles(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => formData.append("files[]", file));

  return axios
    .post<any, { data: IpfsUploadResult[] }>(
      `${FLAIR_IPFS_BACKEND.host}${FLAIR_IPFS_BACKEND.uploadUrl}`,
      formData
    )
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

export function useIpfsUploader(options: {
  autoUpload?: boolean;
  fromFile?: File;
}) {
  const { autoUpload, fromFile } = options;

  const [state, setState] = useState<State>(initialState);

  const cancelQuery = useCancel();
  const uploadToIpfs = useCallback(async () => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    if (!fromFile) {
      if (!didCancel) {
        setState({
          error: new Error(`Must provide File to useIpfsUploader hook`),
          loading: false,
        });
      }
      return;
    }

    try {
      setState({
        loading: true,
      });

      const result = await ipfsUploadFiles([fromFile]);
      const ipfsUrl = `ipfs://${result[0].ipfsHash}`;

      if (!didCancel) {
        setState({ ipfsUrl, loading: false });
      }
    } catch (error) {
      if (!didCancel) {
        setState({ error: error as Error, loading: false });
      }
    }
  }, [cancelQuery, fromFile]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (autoUpload) {
      uploadToIpfs();
    }
  }, [autoUpload, fromFile]);

  return [
    {
      data: state.ipfsUrl,
      error: state.error,
      loading: state.loading,
    },
    uploadToIpfs,
  ] as const;
}
