import { useAccount, useNetwork, useSigner } from 'wagmi';

import { WalletProvider } from '../../providers/wallet';
import { ConnectButton, ConnectButtonProps } from './ConnectButton';

export default {
  title: 'ConnectButton Component',
  decorators: [
    (Story: any) => (
      <WalletProvider>
        <Story />
      </WalletProvider>
    ),
  ],
};

export const Default = (args: ConnectButtonProps) => {
  const account = useAccount();
  const network = useNetwork();
  const { data: signer } = useSigner();

  return (
    <div className="bg-gray-100 p-8">
      <ConnectButton {...args}>
        Yay! Connected {signer?.signMessage.toString()}!
      </ConnectButton>
      <ul className="mt-5">
        {account?.data ? (
          <li>
            <div>{account?.data?.address}</div>
          </li>
        ) : (
          ''
        )}
        <li>
          Account: error={account.error} loading=
          {account.isLoading}
        </li>
        <li>
          Network: name={network.activeChain?.name} error={network.error}{' '}
          loading=
          {network.isLoading}
        </li>
      </ul>
    </div>
  );
};

Default.args = {
  label: 'Connect me',
} as ConnectButtonProps;
