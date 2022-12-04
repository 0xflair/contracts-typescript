import { Web3AuthBaseConnector } from './base/web3auth-base';

export class TwitterWeb3AuthConnector extends Web3AuthBaseConnector {
  // @ts-ignore
  readonly id = 'web3AuthTwitter';
  // @ts-ignore
  readonly name = 'Twitter';

  loginProvider = 'twitter';
  icon =
    'https://bafkreihwrgeokgb2pexfqtrxdpszvwk2o6ifclbnmqlz4mhsumvtyyj2u4.ipfs.nftstorage.link/';
}
