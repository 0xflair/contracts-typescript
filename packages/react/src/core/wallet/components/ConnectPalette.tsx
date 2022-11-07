import { classNames } from '@flair-sdk/common';
import {
  GenericWalletIcon,
  MagicLinkIcon,
  MetaMaskIcon,
  TorusIcon,
  TrustWalletIcon,
  WalletConnectIcon,
  WalletLinkIcon,
} from '@flair-sdk/icons';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useEffect, useRef, useState } from 'react';
import { Connector, useAccount, useConnect } from 'wagmi';

import { Spinner } from '../../ui';
import {
  LedgerLiveDeepLink,
  OmniWalletDeepLink,
  RainbowWalletDeepLink,
  TrustWalletDeepLink,
} from '../deeplinks';
import { ArgentWalletDeepLink } from '../deeplinks/argent-wallet';
import { DeepLinkConfig } from '../types/deep-links';
import { WalletComponentWrapper } from './WalletComponentWrapper';

export enum CustodyType {
  SELF = 'self-custody',
  FULL = 'full-custodial',
  MPC = 'mpc',
  UNKNOWN = 'unknown',
}

export type ConnectorMetadata = {
  custodyType: CustodyType;
  supported?: boolean;
};

export type ConnectPaletteProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  walletButtonClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;

  connectorLabel?: (
    connector: Connector<any, any, any>,
    metadata: ConnectorMetadata,
  ) => string;
  showConnector?: (
    connector: Connector<any, any, any>,
    metadata: ConnectorMetadata,
  ) => boolean;

  deepLinkLabel?: (config: DeepLinkConfig) => string;
  showDeepLink?: (config: DeepLinkConfig) => boolean;
};

export const ConnectPalette = (props: ConnectPaletteProps) => {
  const activeButtonRef = useRef(null);
  const { connectors, connect, isLoading, pendingConnector } = useConnect();
  const { isConnecting, isReconnecting } = useAccount();

  const connectorMetamask = connectors.find((c) => c.id == 'metaMask');
  const connectorInjected = connectors.find((c) => c.id == 'injected');
  const connectorWalletConnect = connectors.find(
    (c) => c.id == 'walletConnect',
  );
  const connectorCoinbaseWallet = connectors.find(
    (c) => c.id == 'coinbaseWallet',
  );
  const connectorMagic = connectors.find((c) => c.id == 'magic');
  const connectorWeb3Auth = connectors.find((c) => c.id == 'web3Auth');

  const metamaskAvailable = Boolean(
    window?.['ethereum'] || MetaMaskOnboarding.isMetaMaskInstalled(),
  );

  const className = props.className || 'inline-flex flex-col gap-2';
  const buttonClassName =
    props.walletButtonClassName ||
    'inline-flex w-full gap-2 items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const iconClassName = props.iconClassName || '-ml-0.5 h-6 w-6';

  const connectorLabel =
    props.connectorLabel ||
    ((c) => {
      if (c.id === 'magic') {
        return 'Email sign-in';
      }

      if (c.id === 'web3Auth') {
        return 'Torus (web3auth.io)';
      }

      return c.name || c.id;
    });

  const showConnector =
    props.showConnector || ((c, m) => m.supported === undefined || m.supported);

  const deepLinks = [
    LedgerLiveDeepLink({ connectors }),
    ArgentWalletDeepLink({ connectors }),
    TrustWalletDeepLink({ connectors }),
    RainbowWalletDeepLink({ connectors }),
    OmniWalletDeepLink({ connectors }),
  ];

  const isWorking = isLoading || isConnecting || isReconnecting;
  const pendingConnectorId = pendingConnector?.id;

  return (
    <WalletComponentWrapper as={props.as} className={className}>
      {connectorMetamask &&
        showConnector(connectorMetamask, {
          custodyType: CustodyType.SELF,
          supported: metamaskAvailable,
        }) && (
          <>
            {metamaskAvailable ? (
              <button
                ref={activeButtonRef}
                type="button"
                disabled={!connectorMetamask.ready || isWorking}
                className={classNames(
                  'flair connect-button connector connector-metamask',
                  `connector-${connectorMetamask.name
                    .replaceAll(' ', '-')
                    .toLowerCase()}`,
                  buttonClassName,
                )}
                onClick={() => connect({ connector: connectorMetamask })}
              >
                {isWorking && pendingConnectorId == connectorMetamask.id ? (
                  <Spinner />
                ) : (
                  <MetaMaskIcon className={iconClassName} />
                )}
                {connectorLabel?.(connectorMetamask, {
                  custodyType: CustodyType.SELF,
                  supported: metamaskAvailable,
                })}
              </button>
            ) : (
              <a
                target={'_blank'}
                href={`https://metamask.app.link/dapp/${window?.location.href}`}
                type="button"
                className={classNames(
                  'flair connect-button connector connector-metamask',
                  buttonClassName,
                )}
                rel="noreferrer"
              >
                <MetaMaskIcon className={iconClassName} />
                {connectorLabel?.(connectorMetamask, {
                  custodyType: CustodyType.SELF,
                  supported: metamaskAvailable,
                })}
              </a>
            )}
          </>
        )}

      {connectorInjected &&
        showConnector(connectorInjected, {
          custodyType: CustodyType.UNKNOWN,
          supported: connectorInjected.name != 'MetaMask',
        }) &&
        connectorInjected.name != 'MetaMask' && (
          <>
            <button
              ref={activeButtonRef}
              type="button"
              disabled={!connectorInjected.ready || isWorking}
              className={classNames(
                'flair connect-button connector connector-injected',
                `connector-${connectorInjected.name
                  .replaceAll(' ', '-')
                  .toLowerCase()}`,
                buttonClassName,
              )}
              onClick={() => connect({ connector: connectorInjected })}
            >
              {isWorking && pendingConnectorId == connectorInjected.id ? (
                <Spinner />
              ) : (
                <>
                  {connectorInjected.name == 'Trust Wallet' ? (
                    <TrustWalletIcon className={iconClassName} />
                  ) : (
                    <GenericWalletIcon className={iconClassName} />
                  )}
                </>
              )}
              {connectorInjected.name &&
              connectorInjected?.name?.toLowerCase() !== 'injected'
                ? connectorInjected.name
                : 'Browser Wallet'}
            </button>
          </>
        )}

      {connectorWalletConnect &&
        showConnector(connectorWalletConnect, {
          custodyType: CustodyType.UNKNOWN,
          supported: true,
        }) && (
          <button
            type="button"
            disabled={!connectorWalletConnect.ready || isWorking}
            ref={!metamaskAvailable ? activeButtonRef : undefined}
            className={classNames(
              'flair connect-button connector connector-wallet-connect',
              buttonClassName,
            )}
            onClick={() => connect({ connector: connectorWalletConnect })}
          >
            {isWorking && pendingConnectorId == connectorWalletConnect.id ? (
              <Spinner />
            ) : (
              <WalletConnectIcon className={iconClassName} />
            )}
            {connectorLabel?.(connectorWalletConnect, {
              custodyType: CustodyType.UNKNOWN,
              supported: true,
            })}
          </button>
        )}

      {connectorCoinbaseWallet &&
        showConnector(connectorCoinbaseWallet, {
          custodyType: CustodyType.FULL,
          supported: true,
        }) && (
          <button
            type="button"
            disabled={!connectorCoinbaseWallet.ready || isWorking}
            className={classNames(
              'flair connect-button connector connector-coinbase',
              buttonClassName,
            )}
            onClick={() => connect({ connector: connectorCoinbaseWallet })}
          >
            {isWorking && pendingConnectorId == connectorCoinbaseWallet.id ? (
              <Spinner />
            ) : (
              <WalletLinkIcon className={iconClassName} />
            )}
            {connectorLabel?.(connectorCoinbaseWallet, {
              custodyType: CustodyType.FULL,
              supported: true,
            })}
          </button>
        )}

      {connectorWeb3Auth &&
        showConnector(connectorWeb3Auth, {
          custodyType: CustodyType.MPC,
          supported: true,
        }) && (
          <button
            type="button"
            disabled={!connectorWeb3Auth.ready || isWorking}
            className={classNames(
              'flair connect-button connector connector-web3auth',
              buttonClassName,
            )}
            onClick={() => connect({ connector: connectorWeb3Auth })}
          >
            {isWorking && pendingConnectorId == connectorWeb3Auth.id ? (
              <Spinner />
            ) : (
              <TorusIcon className={iconClassName} />
            )}
            {connectorLabel?.(connectorWeb3Auth, {
              custodyType: CustodyType.FULL,
              supported: true,
            })}
          </button>
        )}

      {connectorMagic &&
        showConnector(connectorMagic, {
          custodyType: CustodyType.FULL,
          supported: true,
        }) && (
          <>
            <button
              type="button"
              className={classNames(
                'flair connect-button connector connector-magic',
                buttonClassName,
              )}
              onClick={() => connect({ connector: connectorMagic })}
              disabled={!connectorMagic.ready || isWorking}
            >
              {isWorking && pendingConnectorId == connectorMagic.id ? (
                <Spinner />
              ) : (
                <MagicLinkIcon className={iconClassName} />
              )}
              {connectorLabel?.(connectorMagic, {
                custodyType: CustodyType.FULL,
                supported: true,
              })}
            </button>
          </>
        )}

      {deepLinks.map((deepLink) =>
        !props.showDeepLink || props.showDeepLink(deepLink) ? (
          <DeepLinkButton
            key={deepLink.id}
            {...deepLink}
            buttonClassName={buttonClassName}
            iconClassName={iconClassName}
            customLabel={props.deepLinkLabel?.(deepLink)}
          />
        ) : null,
      )}
    </WalletComponentWrapper>
  );
};

export const DeepLinkButton = ({
  id,
  logo: Logo,
  getUri,
  name,
  customLabel,
  buttonClassName,
  iconClassName,
}: {
  customLabel?: string;
  buttonClassName?: string;
  iconClassName?: string;
} & DeepLinkConfig) => {
  const [uri, setUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    getUri().then(setUri);
  }, [getUri]);

  return (
    <a
      href={uri}
      target="_blank"
      className={classNames(
        'flair connect-button deep-link deep-' + id,
        buttonClassName,
      )}
    >
      <Logo className={iconClassName} />
      {customLabel || name}
    </a>
  );
};
