import {
  MetaMaskIcon,
  WalletConnectIcon,
  WalletLinkIcon,
} from '@0xflair/react-icons';
import { Dialog, Transition } from '@headlessui/react';
import { LinkIcon } from '@heroicons/react/solid';
import MetaMaskOnboarding from '@metamask/onboarding';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useConnect } from 'wagmi';

export type ConnectButtonProps = {
  label?: string;
  children?: React.ReactNode;
  className?: string;
};

export const ConnectButton = (props: ConnectButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const activeButtonRef = useRef(null);
  const [{ data, error, loading }, connect] = useConnect();

  const connectorMetamask = data.connectors[0];
  const connectorWalletConnect = data.connectors[1];
  const connectorCoinbaseWallet = data.connectors[2];

  useEffect(() => {
    let didCancel = false;

    if (data.connected && dialogOpen) {
      if (!didCancel) {
        setDialogOpen(false);
      }
    }

    return () => {
      didCancel = true;
    };
  }, [data.connected, dialogOpen]);

  return (
    <>
      {data.connected && !error && !loading ? (
        props.children || <></>
      ) : (
        <button
          disabled={loading}
          className={
            props.className ||
            'inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
          }
          onClick={() => setDialogOpen(true)}
        >
          {props.label || 'Connect Wallet'}
        </button>
      )}
      <Transition.Root show={dialogOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-20 inset-0 overflow-y-auto"
          initialFocus={activeButtonRef}
          open={dialogOpen}
          onClose={setDialogOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div
                    className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100`}
                  >
                    <LinkIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Connect your wallet
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You need to either install{' '}
                        <a
                          target={'_blank'}
                          href={'https://metamask.io/'}
                          className={'text-indigo-600'}
                          rel="noreferrer"
                        >
                          MetaMask extension
                        </a>{' '}
                        on your browser or use{' '}
                        <a
                          target={'_blank'}
                          href={'https://walletconnect.org/'}
                          className={'text-indigo-600'}
                          rel="noreferrer"
                        >
                          WalletConnect
                        </a>{' '}
                        on your mobile.
                      </p>
                    </div>
                  </div>
                </div>

                <>
                  <div className="mt-5 sm:mt-6">
                    {MetaMaskOnboarding.isMetaMaskInstalled() ? (
                      <button
                        type="button"
                        className="inline-flex w-full items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => connect(connectorMetamask)}
                      >
                        <MetaMaskIcon className="-ml-0.5 mr-2 h-12 w-12" />
                        {/* <img
                          className="-ml-0.5 mr-2 h-12 w-12"
                          // src={metamaskImage}
                          aria-hidden="true"
                          alt={"MetaMask"}
                        /> */}
                        MetaMask
                      </button>
                    ) : (
                      <a
                        href={`https://metamask.app.link/dapp/${window.location.href}`}
                        type="button"
                        className="inline-flex w-full items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MetaMaskIcon className="-ml-0.5 mr-2 h-12 w-12" />
                        {/* <img
                          className="-ml-0.5 mr-2 h-12 w-12"
                          // src={MetamaskImage}
                          aria-hidden="true"
                          alt={"MetaMask"}
                        /> */}
                        MetaMask (mobile)
                      </a>
                    )}
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => connect(connectorWalletConnect)}
                    >
                      <WalletConnectIcon className="-ml-0.5 mr-2 h-12 w-12" />
                      {/* <img
                        className="-ml-0.5 mr-2 h-12 w-12"
                        // src={WalletConnectImage}
                        aria-hidden="true"
                        alt={"WalletConnect"}
                      /> */}
                      WalletConnect
                    </button>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => connect(connectorCoinbaseWallet)}
                    >
                      <WalletLinkIcon className="-ml-0.5 mr-2 h-12 w-12" />
                      {/* <img
                        className="-ml-0.5 mr-2 h-12 w-12"
                        // src={WalletLinkImage}
                        aria-hidden="true"
                        alt={"CoinBase Wallet"}
                      /> */}
                      Coinbase Wallet
                    </button>
                  </div>
                </>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
