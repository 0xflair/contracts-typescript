import { classNames } from '@flair-sdk/common';
import {
  GenericWalletIcon,
  GnosisSafeIcon,
  MagicLinkIcon,
  MetaMaskIcon,
  TrustWalletIcon,
  WalletConnectIcon,
  WalletLinkIcon,
} from '@flair-sdk/icons';
import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useRef } from 'react';
import { useAccount, useConnect } from 'wagmi';

import { Spinner } from '../../ui';
import { WalletComponentWrapper } from './WalletComponentWrapper';

export type ConnectPaletteProps = {
  as?: keyof JSX.IntrinsicElements;
  paletteClassName?: string;
  walletButtonClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;

  metamaskButtonLabel?: React.ReactNode;
  metamaskButtonDescription?: React.ReactNode;
  injectedButtonLabel?: React.ReactNode;
  injectedButtonDescription?: React.ReactNode;
  coinbaseButtonLabel?: React.ReactNode;
  coinbaseButtonDescription?: React.ReactNode;
  gnosisSafeButtonLabel?: React.ReactNode;
  gnosisSafeButtonDescription?: React.ReactNode;
  walletConnectButtonLabel?: React.ReactNode;
  walletConnectButtonDescription?: React.ReactNode;
  custodialWalletButtonLabel?: React.ReactNode;
  custodialWalletButtonDescription?: React.ReactNode;
  custodialWalletButtonClassName?: string;

  custodialWalletSeparator?: React.ReactNode;
};

export const ConnectPalette = (props: ConnectPaletteProps) => {
  const activeButtonRef = useRef(null);
  const { connectors, connect, isLoading, pendingConnector } = useConnect();
  const { connector, isConnecting } = useAccount();

  const connectorMetamask = connectors.find((c) => c.id == 'metaMask');
  const connectorInjected = connectors.find((c) => c.id == 'injected');
  const connectorWalletConnect = connectors.find(
    (c) => c.id == 'walletConnect',
  );
  const connectorCoinbaseWallet = connectors.find(
    (c) => c.id == 'coinbaseWallet',
  );
  const connectorGnosisSafe = connectors.find((c) => c.id == 'safe');
  const connectorMagic = connectors.find((c) => c.id == 'magic');

  const metamaskAvailable =
    window?.['ethereum'] || MetaMaskOnboarding.isMetaMaskInstalled();

  const paletteClassName =
    props.paletteClassName || 'inline-flex flex-col gap-2';
  const descriptionClassName =
    props.descriptionClassName || 'hidden sm:inline-block opacity-60';
  const buttonClassName =
    props.walletButtonClassName ||
    'inline-flex w-full gap-2 items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const iconClassName = props.iconClassName || '-ml-0.5 h-6 w-6';

  return (
    <WalletComponentWrapper as={props.as} className={paletteClassName}>
      {connectorMetamask && (
        <>
          {metamaskAvailable ? (
            <button
              ref={activeButtonRef}
              type="button"
              disabled={!connectorMetamask.ready}
              className={classNames(
                'flair connect-button connector-metamask',
                `connector-${connectorMetamask.name
                  .replaceAll(' ', '-')
                  .toLowerCase()}`,
                buttonClassName,
              )}
              onClick={() => connect({ connector: connectorMetamask })}
            >
              {isLoading && pendingConnector?.id == connectorMetamask.id ? (
                <Spinner />
              ) : (
                <MetaMaskIcon className={iconClassName} />
              )}
              {props.metamaskButtonLabel || 'MetaMask'}
              {props.metamaskButtonDescription ? (
                <span className={descriptionClassName}>
                  {props.metamaskButtonDescription}
                </span>
              ) : null}
            </button>
          ) : (
            <a
              target={'_blank'}
              href={`https://metamask.app.link/dapp/${window?.location.href}`}
              type="button"
              className={classNames(
                'flair connect-button connector-metamask',
                buttonClassName,
              )}
              rel="noreferrer"
            >
              <MetaMaskIcon className={iconClassName} />
              {props.metamaskButtonLabel || 'MetaMask'}
              {props.metamaskButtonDescription ? (
                <span className={descriptionClassName}>
                  {props.metamaskButtonDescription}
                </span>
              ) : null}
            </a>
          )}
        </>
      )}
      {connectorInjected && connectorInjected.name != 'MetaMask' && (
        <>
          <button
            ref={activeButtonRef}
            type="button"
            disabled={!connectorInjected.ready}
            className={classNames(
              'flair connect-button connector-injected',
              `connector-${connectorInjected.name
                .replaceAll(' ', '-')
                .toLowerCase()}`,
              buttonClassName,
            )}
            onClick={() => connect({ connector: connectorInjected })}
          >
            {isLoading && pendingConnector?.id == connectorInjected.id ? (
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
            {props.injectedButtonLabel ||
              connectorInjected.name ||
              'Injected Wallet'}
            {props.injectedButtonDescription ? (
              <span className={descriptionClassName}>
                {props.injectedButtonDescription}
              </span>
            ) : null}
          </button>
        </>
      )}
      {connectorWalletConnect && (
        <button
          type="button"
          disabled={!connectorWalletConnect.ready}
          ref={!metamaskAvailable ? activeButtonRef : undefined}
          className={classNames(
            'flair connect-button connector-wallet-connect',
            buttonClassName,
          )}
          onClick={() => connect({ connector: connectorWalletConnect })}
        >
          {isLoading && pendingConnector?.id == connectorWalletConnect.id ? (
            <Spinner />
          ) : (
            <WalletConnectIcon className={iconClassName} />
          )}
          {props.walletConnectButtonLabel || 'WalletConnect'}
          {props.walletConnectButtonDescription ? (
            <span className={descriptionClassName}>
              {props.walletConnectButtonDescription}
            </span>
          ) : null}
        </button>
      )}
      {connectorCoinbaseWallet && (
        <button
          type="button"
          disabled={!connectorCoinbaseWallet.ready}
          className={classNames(
            'flair connect-button connector-coinbase',
            buttonClassName,
          )}
          onClick={() => connect({ connector: connectorCoinbaseWallet })}
        >
          {isLoading && pendingConnector?.id == connectorCoinbaseWallet.id ? (
            <Spinner />
          ) : (
            <WalletLinkIcon className={iconClassName} />
          )}
          {props.coinbaseButtonLabel || 'Coinbase'}
          {props.coinbaseButtonDescription ? (
            <span className={descriptionClassName}>
              {props.coinbaseButtonDescription}
            </span>
          ) : null}
        </button>
      )}

      {/* {connectorGnosisSafe && (
        <>
          {connectorGnosisSafe.ready ? (
            <button
              type="button"
              className={classNames(
                'flair connect-button connector-gnosis-safe',
                buttonClassName,
              )}
              onClick={() => connect({ connector: connectorGnosisSafe })}
            >
              <GnosisSafeIcon className={iconClassName} />
              {props.gnosisSafeButtonLabel || 'Gnosis Safe'}
              {props.gnosisSafeButtonDescription ? (
                <span className={descriptionClassName}>
                  {props.gnosisSafeButtonDescription}
                </span>
              ) : null}
            </button>
          ) : (
            <a
              target={'_blank'}
              href={`https://help.gnosis-safe.io/en/articles/4022030-add-a-custom-safe-app`}
              type="button"
              className={classNames(
                'flair connect-button connector-metamask',
                buttonClassName,
              )}
              rel="noreferrer"
            >
              <GnosisSafeIcon className={iconClassName} />
              {props.gnosisSafeButtonLabel || 'Gnosis Safe'}
              <small className="text-xs italic text-slate-300">
                Must open as GnosisSafe custom app
              </small>
              {props.gnosisSafeButtonDescription ? (
                <span className={descriptionClassName}>
                  {props.gnosisSafeButtonDescription}
                </span>
              ) : null}
            </a>
          )}
        </>
      )} */}

      {connectorMagic && (
        <>
          {props.custodialWalletSeparator
            ? props.custodialWalletSeparator
            : null}
          <button
            type="button"
            className={classNames(
              buttonClassName,
              props.custodialWalletButtonClassName,
            )}
            onClick={() => connect({ connector: connectorMagic })}
          >
            <MagicLinkIcon className={iconClassName} />
            {props.custodialWalletButtonLabel || 'Email sign-in'}
            {props.custodialWalletButtonDescription ? (
              <span className={descriptionClassName}>
                {props.custodialWalletButtonDescription}
              </span>
            ) : null}
          </button>
        </>
      )}
    </WalletComponentWrapper>
  );
};
