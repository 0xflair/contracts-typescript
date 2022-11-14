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
          'align-bottom bg-white sm:rounded-lg px-4 sm:p-6 sm:my-8 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg w-full h-full sm:h-auto justify-center inline-flex flex-col gap-4'
        }
        overlayClassName={
          dialogProps?.overlayClassName ||
          'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center'
        }
        contentLabel={dialogProps?.title || 'Connect your wallet'}
      >
        <div className="max-h-96 scroll-visible">
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
