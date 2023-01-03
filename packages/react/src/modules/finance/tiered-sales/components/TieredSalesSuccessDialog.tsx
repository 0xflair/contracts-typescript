import { TransactionReceipt } from '@ethersproject/providers';
import { classNames } from '@flair-sdk/common';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline/esm/index.js';
import { SendTransactionResult } from '@wagmi/core';
import { BigNumberish } from 'ethers';
import { Fragment, HTMLAttributeAnchorTarget, ReactNode } from 'react';

import {
  CryptoValue,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  TransactionLink,
} from '../../../../core';

type Props = {
  decimals?: BigNumberish;
  mintCount?: BigNumberish;
  txResponse?: SendTransactionResult;
  txReceipt?: TransactionReceipt;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: ReactNode;
  body?: (opts: {
    mintCount?: BigNumberish;
    txResponse?: SendTransactionResult;
    txReceipt?: TransactionReceipt;
  }) => ReactNode;
  ctaButtonText?: string;
  ctaButtonOnClick?: () => void;
  ctaButtonUrl?: string;
  ctaButtonClassName?: string;
  ctaButtonTarget?: HTMLAttributeAnchorTarget;
  closeButtonClassName?: string;
  closeButtonText?: string;
  onClose?: () => void;
};

export function TieredSalesSuccessDialog({
  decimals,
  mintCount,
  txResponse,
  txReceipt,
  open,
  setOpen,
  title = 'Mint successful',
  body = ({ mintCount }) => (
    <>
      You have successfully minted{' '}
      <CryptoValue
        decimals={decimals || 0}
        formatted={false}
        showPrice={false}
        showSymbol={false}
        value={mintCount}
      />{' '}
      tokens. You can check the transaction with the link below.
    </>
  ),
  ctaButtonText,
  ctaButtonUrl,
  ctaButtonOnClick,
  ctaButtonClassName,
  ctaButtonTarget,
  closeButtonClassName,
  closeButtonText,
  onClose,
}: Props) {
  return (
    <div className="flair-component">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="flair-component relative z-10"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="text-sm text-gray-500">
                          {body({ mintCount, txResponse, txReceipt })}
                        </div>
                        <div className="mt-4">
                          <TransactionLink
                            txReceipt={txReceipt}
                            txResponse={txResponse}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex flex-col gap-2">
                    {ctaButtonUrl || ctaButtonOnClick || ctaButtonText ? (
                      ctaButtonOnClick ? (
                        <button
                          type="button"
                          className={
                            ctaButtonClassName ||
                            classNames(
                              PRIMARY_BUTTON,
                              'w-full text-center justify-center px-4 py-2',
                            )
                          }
                          onClick={() => {
                            setOpen(false);
                            ctaButtonOnClick();
                          }}
                        >
                          {ctaButtonText || 'OK'}
                        </button>
                      ) : (
                        <a
                          href={ctaButtonUrl}
                          className={
                            ctaButtonClassName ||
                            classNames(
                              PRIMARY_BUTTON,
                              'w-full text-center justify-center px-4 py-2',
                            )
                          }
                          target={ctaButtonTarget}
                        >
                          {ctaButtonText || 'OK'}
                        </a>
                      )
                    ) : null}
                    <button
                      type="button"
                      className={
                        closeButtonClassName ||
                        classNames(
                          SECONDARY_BUTTON,
                          'w-full text-center justify-center px-4 py-2',
                        )
                      }
                      onClick={() => {
                        setOpen(false);
                        onClose && onClose();
                      }}
                    >
                      {closeButtonText || 'Close'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
