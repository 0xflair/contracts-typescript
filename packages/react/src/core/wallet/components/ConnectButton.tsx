import { Web3AuthBaseConnector } from '@flair-sdk/connectors';
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  XIcon,
} from '@heroicons/react/solid/esm/index.js';
import { ConnectResult } from '@wagmi/core';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAccount, useConnect } from 'wagmi';

import { BareComponentProps } from '../../../common';
import { ConnectPalette, ConnectPaletteProps } from './ConnectPalette';

export type ConnectButtonProps = BareComponentProps & {
  label?: React.ReactNode;
  children?: React.ReactNode;
  dialogProps?: {
    title?: string;
    contentPrepend?: React.ReactNode;
    contentAppend?: React.ReactNode;
    overlayClassName?: string;
    headerClassName?: string;
    contentClassName?: string;
    closeWrapperClassName?: string;
    closeButtonClassName?: string;
  };
  connectPalletteProps?: ConnectPaletteProps;
  onConnect?: (result: ConnectResult) => void;
  popularOptions?: string[];
};

export const ConnectButton = ({
  as,
  label = 'Connect',
  children,
  dialogProps,
  connectPalletteProps,
  onConnect,
  popularOptions = [
    // Social Logins
    'google',
    'twitter',
    'discord',
    'github',

    // Wallets
    'metaMask',
    'injected',
    'walletConnect',
    'coinbaseWallet',
    'web3OnboardLedger',
  ],
  ...attributes
}: ConnectButtonProps) => {
  const [showPopularOptions, setShowPopularOptions] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isConnecting, isConnected } = useAccount();
  const { connectors } = useConnect();

  const hasLoginOptions = Boolean(connectors.find((c) => 'loginProvider' in c));

  useEffect(() => {
    let didCancel = false;

    if (isConnected && dialogOpen) {
      if (!didCancel) {
        setDialogOpen(false);
      }
    }

    return () => {
      didCancel = true;
    };
  }, [isConnected, dialogOpen]);

  const Component = as || 'button';

  return (
    <>
      {isConnected ? (
        <>{children}</>
      ) : (
        <Component
          disabled={isConnecting}
          onClick={() => setDialogOpen(true)}
          {...attributes}
        >
          {label}
        </Component>
      )}

      <Modal
        ariaHideApp={false}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        shouldReturnFocusAfterClose={true}
        shouldFocusAfterRender={true}
        closeTimeoutMS={150}
        isOpen={dialogOpen}
        onRequestClose={() => setDialogOpen(false)}
        portalClassName={'flair-component connect-dialog-portal'}
        className={
          dialogProps?.contentClassName ||
          'align-bottom sm:max-w-lg justify-center'
        }
        overlayClassName={
          dialogProps?.overlayClassName ||
          'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex justify-center overflow-scroll z-10'
        }
        contentLabel={dialogProps?.title || 'Sign-in'}
      >
        <div className="align-bottom bg-white sm:rounded-lg px-4 sm:p-4 sm:my-8 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg justify-center inline-flex flex-col gap-4">
          <h3
            className={
              dialogProps?.headerClassName ||
              'text-xl mb-4 leading-6 font-medium text-gray-900 flex justify-between'
            }
          >
            <span>{dialogProps?.title || 'Sign-in'}</span>
            <button
              type="button"
              className={
                dialogProps?.closeButtonClassName ||
                'bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }
              onClick={() => setDialogOpen(false)}
            >
              <span className="sr-only">Close</span>
              <XIcon className="close-icon h-6 w-6" aria-hidden="true" />
            </button>
          </h3>
          {dialogProps?.contentPrepend}
          {hasLoginOptions ? (
            <>
              <div className="flex flex-col gap-2">
                <h3>Continue with</h3>
                <ConnectPalette
                  onConnect={onConnect}
                  showConnector={(connector, metadata) => {
                    const providerName = (connector as Web3AuthBaseConnector)
                      ?.loginProvider;
                    const isLogin = Boolean(providerName);

                    if (showPopularOptions) {
                      return (
                        isLogin &&
                        (popularOptions.includes(connector.id) ||
                          popularOptions.includes(providerName))
                      );
                    }

                    return isLogin;
                  }}
                  showDeepLink={() => false}
                  {...connectPalletteProps}
                />
              </div>
            </>
          ) : null}
          <div className="flex flex-col gap-2">
            {hasLoginOptions ? <h3>Or connect your wallet</h3> : null}
            <ConnectPalette
              showConnector={(connector, metadata) => {
                const isWallet = !(connector as Web3AuthBaseConnector)
                  ?.loginProvider;

                if (showPopularOptions) {
                  return (
                    isWallet &&
                    (popularOptions.includes(connector.id) ||
                      popularOptions.includes(connector.name))
                  );
                }

                return isWallet;
              }}
              showDeepLink={(config) => {
                if (showPopularOptions) {
                  return popularOptions.includes(config.id);
                }

                return true;
              }}
              {...connectPalletteProps}
            />
            <div className="mt-4 w-full flex justify-center">
              <button
                onClick={() => setShowPopularOptions(!showPopularOptions)}
                className="flex items-center gap-1 text-indigo-600 text-xs"
              >
                {!showPopularOptions ? (
                  <ArrowSmUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowSmDownIcon className="h-4 w-4" />
                )}
                {!showPopularOptions ? 'Less options' : 'More options'}
              </button>
            </div>
          </div>

          {dialogProps?.contentAppend || (
            <span className="mt-1 text-xs text-center">
              By signing in, you agree with{' '}
              <a
                className="underline"
                href="https://flair.dev/terms"
                target="_blank"
                rel="noreferrer"
              >
                terms of service
              </a>
            </span>
          )}
        </div>
      </Modal>
    </>
  );
};
