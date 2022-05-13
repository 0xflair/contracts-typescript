import { Environment } from '@0xflair/common';
import * as axios from 'axios';

import { FLAIR_IPFS_BACKEND } from './constants';

type Config = {
  env?: Environment;
  flairClientId: string;
};

export class IpfsClient {
  private axiosClient: axios.Axios;

  constructor({ env, flairClientId }: Config) {
    this.axiosClient = axios.default.create({
      baseURL: FLAIR_IPFS_BACKEND[env || Environment.PROD],
      headers: {
        'Content-Type': 'application/json',
        'X-Flair-Client-Id': flairClientId,
      },
    });
  }

  public async uploadJson(data: object): Promise<string> {
    return this.axiosClient.post(`/v1/ipfs/upload/json`, data).then((res) => {
      return res.data;
    });
  }
}
