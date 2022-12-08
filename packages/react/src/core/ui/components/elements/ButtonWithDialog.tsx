import { XIcon } from '@heroicons/react/solid';
import React, { Fragment, PropsWithChildren, useState } from 'react';
import Modal from 'react-modal';

import { BareComponentProps } from '../../../../common';

export type ButtonWithDialogProps<T extends HTMLElement = HTMLButtonElement> =
  PropsWithChildren<
    BareComponentProps<T> & {
      text?: React.ReactNode;
      dialogTitle?: string;
      dialogTitleClassName?: string;
      dialogOverlayClassName?: string;
      dialogContentClassName?: string;
      dialogCloseWrapperClassName?: string;
      dialogCloseButtonClassName?: string;
      portalClassName?: string;
      buttons?: ((
        dialogOpen: boolean,
        setDialogOpen: (open: boolean) => void,
      ) => React.ReactNode)[];
    }
  >;

export function ButtonWithDialog<T extends HTMLElement = HTMLElement>({
  as,
  text,
  buttons,
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
        {text}
      </Component>
      <Modal
        ariaHideApp={false}
        closeTimeoutMS={150}
        isOpen={dialogOpen}
        onRequestClose={() => setDialogOpen(false)}
        portalClassName={portalClassName || 'flair-component dialog-portal'}
        className={
          dialogContentClassName ||
          'align-bottom bg-white sm:rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg w-full h-full sm:h-auto justify-center inline-flex flex-col gap-4'
        }
        overlayClassName={
          dialogOverlayClassName ||
          'z-50 fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center'
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
              'text-xl px-4 py-4 pb-0 leading-6 font-medium text-gray-900'
            }
          >
            {dialogTitle}
          </h3>
        )}
        <div className="px-4 sm:px-6">
          {typeof children === 'function'
            ? children({ dialogOpen, setDialogOpen })
            : children}
        </div>
        {buttons?.length ? (
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            {buttons.map((button, index) => (
              <Fragment key={index}>
                {button(dialogOpen, setDialogOpen)}
              </Fragment>
            ))}
          </div>
        ) : null}
      </Modal>
    </>
  );
}
