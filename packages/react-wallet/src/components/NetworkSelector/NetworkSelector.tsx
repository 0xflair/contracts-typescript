import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import React, { Fragment, useState } from 'react';
import { Chain, useNetwork } from 'wagmi';

import { FLAIR_CHAINS, FLAIR_DEFAULT_CHAIN } from '../../constants/chains';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  defaultChain?: Chain;
  chains?: Chain[];
};

export const NetworkSelector = (props: Props) => {
  const { chains } = props;
  const [{ data: networkData, error, loading }, switchNetwork] = useNetwork();

  const availableChains = chains || FLAIR_CHAINS;
  const selected = availableChains.find((c) => c.id === networkData.chain?.id);

  return (
    <Listbox
      value={selected}
      onChange={(chain: Chain) => {
        switchNetwork && switchNetwork(chain.id);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">
                {(networkData.chain?.name ?? networkData.chain?.id) ||
                  '<wallet not connected>'}{' '}
                {(networkData.chain?.unsupported && '(unsupported)') || ''}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-20 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {availableChains.map((chain) => (
                  <Listbox.Option
                    key={chain.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={chain}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {chain.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
