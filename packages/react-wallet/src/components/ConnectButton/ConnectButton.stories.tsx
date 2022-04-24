import { useAccount, useNetwork } from 'wagmi';

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
  const [account] = useAccount({
    fetchEns: true,
  });
  const [network] = useNetwork();

  return (
    <div className="bg-gray-100 p-8">
      <ConnectButton {...args}>Yay! Connected!</ConnectButton>
      <ul className="mt-5">
        {account?.data ? (
          <li>
            <img src={account?.data?.ens?.avatar || ''} />
            <div>
              {account?.data?.ens?.name
                ? `${account?.data?.ens?.name} (${account?.data?.address})`
                : account?.data?.address}
            </div>
          </li>
        ) : (
          ''
        )}
        <li>
          Account: error={account.error} loading=
          {account.loading}
        </li>
        <li>
          Network: name={network.data.chain?.name} error={network.error}{' '}
          loading=
          {network.loading}
        </li>
      </ul>
    </div>
  );
};

Default.args = {
  label: 'Connect me',
} as ConnectButtonProps;
