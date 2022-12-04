import { Web3AuthBaseConnector } from './base/web3auth-base';

export class DiscordWeb3AuthConnector extends Web3AuthBaseConnector {
  // @ts-ignore
  readonly id = 'web3AuthDiscord';
  // @ts-ignore
  name = 'Discord';

  loginProvider = 'discord';
  icon =
    'https://bafkreicrekdbzxpmaugfnaf7jwpnpttnux47iu3skt5qz4oibtoyccyd2q.ipfs.nftstorage.link/';
}
