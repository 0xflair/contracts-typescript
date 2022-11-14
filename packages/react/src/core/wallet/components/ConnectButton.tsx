import { XIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAccount } from 'wagmi';

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
};

export const ConnectButton = ({
  as,
  label = 'Connect',
  children,
  dialogProps,
  connectPalletteProps,
  ...attributes
}: ConnectButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isConnecting, isConnected } = useAccount();

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

  console.log(
    'BUTTON isConnecting, isConnected == ',
    isConnecting,
    isConnected,
  );

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
        closeTimeoutMS={150}
        isOpen={dialogOpen}
        onRequestClose={() => setDialogOpen(false)}
        portalClassName={'flair-component connect-dialog-portal'}
        className={
          dialogProps?.contentClassName ||
          'scroll-visible w-full h-full sm:w-auto sm:h-auto absolute max-w-lg p-4 mx-auto overflow-scroll align-middle sm:rounded-lg bg-white shadow-lg border border-gray-200 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' //// sm:align-middle justify-center inline-flex flex-col gap-4 transform transition-all
        }
        overlayClassName={
          dialogProps?.overlayClassName ||
          'fixed inset-0 filter backdrop-filter backdrop-blur transition-opacity w-screen h-screen overflow-scroll'
        }
        contentLabel={dialogProps?.title || 'Connect your wallet'}
      >
        <div className="max-h-96">
          <h3
            className={
              dialogProps?.headerClassName ||
              'text-xl mb-4 leading-6 font-medium text-gray-900 flex justify-between'
            }
          >
            <span>Connect your wallet</span>
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
          <ConnectPalette {...connectPalletteProps} />
          {dialogProps?.contentAppend}
        </div>
      </Modal>
    </>
  );
};
