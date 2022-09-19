import { DisconnectButton, WalletProvider } from '@flair-sdk/react-wallet';
import { useAccount, useNetwork } from 'wagmi';

export default {
  title: 'DisconnectButton Component',
  decorators: [
    (Story: any) => (
      <WalletProvider>
        <Story />
      </WalletProvider>
    ),
  ],
};

export const Default = () => {
  const account = useAccount();
  const network = useNetwork();

  return (
    <div className="bg-gray-100 p-8">
      <DisconnectButton />
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
};
