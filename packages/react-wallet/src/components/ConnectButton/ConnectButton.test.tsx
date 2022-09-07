import ReactDOM from 'react-dom';

import { WalletProvider } from '../../providers/wallet';
import { ConnectButton } from './ConnectButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <WalletProvider custodialWallet={true}>
      <ConnectButton label="Connect me">Yay! Connected</ConnectButton>
    </WalletProvider>,
    div,
  );
});
