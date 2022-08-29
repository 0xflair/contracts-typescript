import { BareComponentProps } from '@0xflair/react-common';
import { XIcon } from '@heroicons/react/solid';
import React, { Fragment, PropsWithChildren, useState } from 'react';
import Modal from 'react-modal';

export type ButtonWithDialogProps<T extends HTMLElement = HTMLElement> =
  PropsWithChildren<
    BareComponentProps<T> & {
      label?: React.ReactNode;
      buttonAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
      dialogTitle?: string;
      dialogTitleClassName?: string;
      dialogOverlayClassName?: string;
      dialogContentClassName?: string;
      dialogCloseWrapperClassName?: string;
      dialogCloseButtonClassName?: string;
      portalClassName?: string;
    }
  >;

export function ButtonWithDialog<T extends HTMLElement = HTMLElement>({
  as,
  label,
  children,
  dialogTitle,
  dialogTitleClassName,
  dialogOverlayClassName,
  dialogContentClassName,
  dialogCloseWrapperClassName,
  dialogCloseButtonClassName,
  portalClassName,
  ...attributes
}: ButtonWithDialogProps<T>) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const Component = as || (attributes.className ? 'div' : Fragment);

  return (
    <>
      <Component onClick={() => setDialogOpen(true)} {...attributes}>
        {label}
      </Component>
      <Modal
        ariaHideApp={false}
        closeTimeoutMS={150}
        isOpen={dialogOpen}
        onRequestClose={() => setDialogOpen(false)}
        portalClassName={portalClassName || 'flair-component dialog-portal'}
        className={
          dialogContentClassName ||
          'align-bottom bg-white sm:rounded-lg px-4 sm:p-6 sm:my-8 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg w-full h-full sm:h-auto justify-center inline-flex flex-col gap-4'
        }
        overlayClassName={
          dialogOverlayClassName ||
          'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center'
        }
        contentLabel={dialogTitle}
      >
        <div
          className={
            dialogCloseWrapperClassName ||
            'block absolute top-0 right-0 pt-4 pr-4'
          }
        >
          <button
            type="button"
            className={
              dialogCloseButtonClassName ||
              'bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }
            onClick={() => setDialogOpen(false)}
          >
            <span className="sr-only">Close</span>
            <XIcon className="close-icon h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {dialogTitle && (
          <h3
            className={
              dialogTitleClassName ||
              'text-xl mb-2 leading-6 font-medium text-gray-900'
            }
          >
            {dialogTitle}
          </h3>
        )}
        {children}
      </Modal>
    </>
  );
}
