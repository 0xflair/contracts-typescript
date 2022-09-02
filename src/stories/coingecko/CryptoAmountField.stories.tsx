import 'react';

import { CoinGeckoProvider, CryptoAmountField } from '@0xflair/react-coingecko';
import { WalletProvider } from '@0xflair/react-wallet';

export default {
  title: 'CryptoAmountField Component',
  decorators: [
    (Story: any) => (
      <WalletProvider>
        <CoinGeckoProvider>
          <Story />
        </CoinGeckoProvider>
      </WalletProvider>
    ),
  ],
};

export const DefaultCryptoAmountField = (args) => {
  return (
    <div className="bg-gray-100 p-8">
      <CryptoAmountField {...args} />
    </div>
  );
};

DefaultCryptoAmountField.args = {
  label: 'Price',
  value: '0.088',
  description: 'The price of asset in ETH',
};
