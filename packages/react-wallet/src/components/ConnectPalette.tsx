import { classNames } from '@0xflair/react-common';
import {
  GenericWalletIcon,
  GnosisSafeIcon,
  MagicLinkIcon,
  MetaMaskIcon,
  TrustWalletIcon,
  WalletConnectIcon,
  WalletLinkIcon,
} from '@0xflair/react-icons';
import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useRef } from 'react';
import { useConnect } from 'wagmi';

import { WalletComponentWrapper } from './WalletComponentWrapper';

export type ConnectPaletteProps = {
  as?: keyof JSX.IntrinsicElements;
  paletteClassName?: string;
  walletButtonClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;

  metamaskButtonLabel?: React.ReactNode;
  metamaskButtonDescription?: React.ReactNode;
  coinbaseButtonLabel?: React.ReactNode;
  coinbaseButtonDescription?: React.ReactNode;
  gnosisSafeButtonLabel?: React.ReactNode;
  gnosisSafeButtonDescription?: React.ReactNode;
  walletConnectButtonLabel?: React.ReactNode;
  walletConnectButtonDescription?: React.ReactNode;
  custodialWalletButtonLabel?: React.ReactNode;
  custodialWalletButtonDescription?: React.ReactNode;

  custodialWalletSeparator?: React.ReactNode;
};

export const ConnectPalette = (props: ConnectPaletteProps) => {
  const activeButtonRef = useRef(null);
  const { connectors, connect } = useConnect();

  const connectorInjected = connectors.find((c) => c.id == 'injected');
  const connectorWalletConnect = connectors.find(
    (c) => c.id == 'walletConnect',
  );
  const connectorCoinbaseWallet = connectors.find(
    (c) => c.id == 'coinbaseWallet',
  );
  const connectorGnosisSafe = connectors.find((c) => c.id == 'safe');
  const connectorMagic = connectors.find((c) => c.id == 'magic');

  const injectedAvailable =
    window?.['ethereum'] || MetaMaskOnboarding.isMetaMaskInstalled();

  const paletteClassName =
    props.paletteClassName || 'inline-flex flex-col gap-4';
  const descriptionClassName =
    props.descriptionClassName || 'hidden sm:inline-block opacity-60';
  const buttonClassName =
    props.walletButtonClassName ||
    'inline-flex w-full gap-2 items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const iconClassName = props.iconClassName || '-ml-0.5 mr-2 h-12 w-12';

  return (
    <WalletComponentWrapper as={props.as} className={paletteClassName}>
      {connectorInjected && (
        <>
          {injectedAvailable ? (
            <button
              ref={activeButtonRef}
              type="button"
              className={classNames(
                'flair connect-button connector-injected',
                `connector-${connectorInjected.name
                  .replaceAll(' ', '-')
                  .toLowerCase()}`,
                buttonClassName,
              )}
              onClick={() => connect(connectorInjected)}
            >
              {!connectorInjected.name ||
              connectorInjected.name == 'MetaMask' ? (
                <MetaMaskIcon className={iconClassName} />
              ) : connectorInjected.name == 'Trust Wallet' ? (
                <TrustWalletIcon className={iconClassName} />
              ) : (
                <GenericWalletIcon className={iconClassName} />
              )}
              {props.metamaskButtonLabel ||
                connectorInjected.name ||
                'MetaMask'}
              {props.metamaskButtonDescription ? (
                <span className={descriptionClassName}>
                  {props.metamaskButtonDescription}
                </span>
              ) : null}
            </button>
          ) : (
            <a
              target={'_blank'}
              href={`https://metamask.app.link/dapp/${window.location.href}`}
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
      {connectorWalletConnect && (
        <button
          type="button"
          ref={!injectedAvailable ? activeButtonRef : undefined}
          className={classNames(
            'flair connect-button connector-wallet-connect',
            buttonClassName,
          )}
          onClick={() => connect(connectorWalletConnect)}
        >
          <WalletConnectIcon className={iconClassName} />
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
          className={classNames(
            'flair connect-button connector-coinbase',
            buttonClassName,
          )}
          onClick={() => connect(connectorCoinbaseWallet)}
        >
          <WalletLinkIcon className={iconClassName} />
          {props.coinbaseButtonLabel || 'Coinbase Wallet'}
          {props.coinbaseButtonDescription ? (
            <span className={descriptionClassName}>
              {props.coinbaseButtonDescription}
            </span>
          ) : null}
        </button>
      )}

      {connectorGnosisSafe && (
        <>
          {connectorGnosisSafe.ready ? (
            <button
              type="button"
              className={classNames(
                'flair connect-button connector-gnosis-safe',
                buttonClassName,
              )}
              onClick={() => connect(connectorGnosisSafe)}
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
      )}

      {connectorMagic && (
        <>
          {props.custodialWalletSeparator ? (
            props.custodialWalletSeparator
          ) : (
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">OR</span>
              </div>
            </div>
          )}
          <button
            type="button"
            className={buttonClassName}
            onClick={() => connect(connectorMagic)}
          >
            <MagicLinkIcon className={iconClassName} />
            {props.custodialWalletButtonLabel || 'Quick wallet'}
            <span className={descriptionClassName}>
              {props.custodialWalletButtonDescription ||
                'via Email, Github, Google, Twitter.'}
            </span>
          </button>
        </>
      )}
    </WalletComponentWrapper>
  );
};
