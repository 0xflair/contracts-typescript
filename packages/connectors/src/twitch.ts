import { Web3AuthBaseConnector } from './base/web3auth-base';

export class TwitchWeb3AuthConnector extends Web3AuthBaseConnector {
  // @ts-ignore
  readonly id = 'web3AuthTwitch';
  // @ts-ignore
  readonly name = 'Twitch';

  loginProvider = 'twitch';

  icon =
    'https://bafkreiabc4iuedbsyklm5mij4prttpusfbzglelvf7w6ol6lubbmgzzss4.ipfs.nftstorage.link/';
}
