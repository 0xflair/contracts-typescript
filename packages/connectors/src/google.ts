import { Web3AuthBaseConnector } from './base/web3auth-base';

export class GoogleWeb3AuthConnector extends Web3AuthBaseConnector {
  // @ts-ignore
  readonly id = 'web3AuthGoogle';
  // @ts-ignore
  name = 'Google';

  loginProvider = 'google';
  icon =
    'https://bafkreifhqfwotv2quxsmtq2m3j2olmaehg7vmkm3vy2l45png7whn4yjsa.ipfs.nftstorage.link/';
}
