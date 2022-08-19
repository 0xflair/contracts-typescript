import { classNames } from '@0xflair/react-common';
import { XIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useConnect } from 'wagmi';

import { ConnectPalette, ConnectPaletteProps } from '../ConnectPalette';
import { WalletComponentWrapper } from '../WalletComponentWrapper';

export type ConnectButtonProps = {
  as?: keyof JSX.IntrinsicElements;
  label?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  dialogTitle?: string;
  dialogContentPrepend?: React.ReactNode;
  dialogContentAppend?: React.ReactNode;
  dialogOverlayClassName?: string;
  dialogContentClassName?: string;
  dialogCloseWrapperClassName?: string;
  dialogCloseButtonClassName?: string;
} & ConnectPaletteProps;

export const ConnectButton = (props: ConnectButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { error, isConnecting, isConnected } = useConnect();

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

  return (
    <WalletComponentWrapper
      as={props.as}
      className={classNames('connect-button-wrapper', props.wrapperClassName)}
    >
      {isConnected && !error && !isConnecting ? (
        props.children || <></>
      ) : (
        <button
          disabled={isConnecting}
          className={
            props.className ||
            'inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
          }
          onClick={() => setDialogOpen(true)}
        >
          {props.label || 'Connect Wallet'}
        </button>
      )}
      <Modal
        closeTimeoutMS={150}
        isOpen={dialogOpen}
        onRequestClose={() => setDialogOpen(false)}
        portalClassName={'flair-wallet-component connect-dialog-portal'}
        className={
          props.dialogContentClassName ||
          'align-bottom bg-white sm:rounded-lg px-4 sm:p-6 sm:my-8 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg w-full h-full sm:h-auto justify-center inline-flex flex-col gap-4'
        }
        overlayClassName={
          props.dialogOverlayClassName ||
          'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center'
        }
        contentLabel={props.dialogTitle || 'Connect your wallet'}
      >
        <div
          className={
            props.dialogCloseWrapperClassName ||
            'block absolute top-0 right-0 pt-4 pr-4'
          }
        >
          <button
            type="button"
            className={
              props.dialogCloseButtonClassName ||
              'bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }
            onClick={() => setDialogOpen(false)}
          >
            <span className="sr-only">Close</span>
            <XIcon className="close-icon h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <h3 className="text-xl mb-2 leading-6 font-medium text-gray-900">
          Connect your wallet
        </h3>
        {props.dialogContentPrepend}
        <ConnectPalette
          paletteClassName="inline-flex flex-col gap-4"
          {...props}
        />
        {props.dialogContentAppend}
      </Modal>
    </WalletComponentWrapper>
  );
};
