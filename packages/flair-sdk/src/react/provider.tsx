import { WalletProvider } from '@0xflair/react-wallet';

type Config = {
  appName?: string;
  infuraId?: string;
};

type Props = Config & {
  children?: React.ReactNode;
  wagmiOverrides?: Record<string, any>;
};

export const FlairProvider = (props: Props) => {
  const { children, appName, infuraId, wagmiOverrides } = props;

  return (
    <WalletProvider
      appName={appName}
      infuraId={infuraId}
      wagmiOverrides={wagmiOverrides}
    >
      {children}
    </WalletProvider>
  );
};
