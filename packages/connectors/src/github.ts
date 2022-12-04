import { Web3AuthBaseConnector } from './base/web3auth-base';

export class GithubWeb3AuthConnector extends Web3AuthBaseConnector {
  // @ts-ignore
  readonly id = 'web3AuthGithub';
  // @ts-ignore
  name = 'Github';

  loginProvider = 'github';
  icon =
    'https://bafkreihy3glb5pusnnrhxpbfnhfueyhrkzf7sftkzcqfapg53ydwtmmroa.ipfs.nftstorage.link/';
}
