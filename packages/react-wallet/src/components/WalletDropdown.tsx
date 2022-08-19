import {
  CryptoPrice,
  CryptoUnits,
  CryptoValue,
} from '@0xflair/react-coingecko';
import { classNames } from '@0xflair/react-common';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';
import Blockies from 'react-blockies';
import { useCopyToClipboard } from 'react-use';
import {
  useAccount,
  useBalance,
  useEnsAvatar,
  useEnsName,
  useNetwork,
} from 'wagmi';

import { DisconnectButton } from './DisconnectButton';
import { WalletComponentWrapper } from './WalletComponentWrapper';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  blockieSize?: number;
  blockieScale?: number;
};

export const WalletDropdown = ({
  as,
  className,
  blockieSize = 8,
  blockieScale = 3,
}: Props) => {
  const { activeChain } = useNetwork();
  const {
    data: account,
    error: accountError,
    isLoading: accountLoading,
  } = useAccount();
  const {
    data: balance,
    error: balanceError,
    isLoading: balanceLoading,
  } = useBalance({
    addressOrName: account?.address,
    formatUnits: 'ether',
    watch: false,
  });
  const {
    data: avatar,
    error: avatarError,
    isLoading: avatarLoading,
  } = useEnsAvatar({
    addressOrName: account?.address,
    chainId: 1,
  });
  const {
    data: ens,
    error: ensError,
    isLoading: ensLoading,
  } = useEnsName({
    address: account?.address,
    chainId: 1,
  });
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <WalletComponentWrapper as={as} className={'wallet-dropdown-wrapper'}>
      <Menu
        as="div"
        className={classNames(
          `wallet-dropdown-menu relative inline-block`,
          className || '',
        )}
      >
        <div>
          <Menu.Button className="wallet-dropdown-button max-w-xs rounded-full flex gap-2 items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-2 lg:rounded-md lg:hover:bg-gray-50">
            {avatar?.toString() ? (
              <img
                className="h-8 w-8 rounded-full"
                src={avatar?.toString()}
                alt=""
              />
            ) : (
              <Blockies
                seed={account?.address?.toLowerCase() || ''}
                size={blockieSize}
                scale={blockieScale}
                className={'wallet-dropdown-blockies rounded-full'}
              />
            )}{' '}
            <span className="wallet-dropdown-label hidden text-gray-700 text-sm font-medium lg:block">
              <span className="sr-only">Open wallet menu</span>
              {ens?.toString() ||
                account?.address?.slice(0, 4) +
                  '...' +
                  account?.address?.slice(-4)}
            </span>
            {balance?.value ? (
              <span className="wallet-dropdown-balance text-gray-500 truncate">
                {Number(balance.formatted).toFixed(4)}{' '}
                {activeChain?.nativeCurrency?.symbol || balance.symbol}
              </span>
            ) : null}
            <ChevronDownIcon
              className="wallet-dropdown-icon flex-shrink-0 h-5 w-5 text-gray-400 block"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="wallet-dropdown-items origin-top-right absolute z-10 right-0 mt-2 w-auto rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="wallet-dropdown-header px-4 py-3">
              <span className="wallet-dropdown-info--address">
                <p className="wallet-dropdown-address-label text-xs capitalize text-gray-400">
                  Wallet Address
                </p>
                <p
                  className="wallet-dropdown-address-value text-sm font-medium text-gray-900 cursor-pointer"
                  onClick={(e) => {
                    account?.address && copyToClipboard(account.address);

                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNodeContents(e.currentTarget);
                    selection?.removeAllRanges();
                    selection?.addRange(range);
                  }}
                >
                  {account?.address?.slice(0, 4)}
                  <span className="text-[6px]">
                    {account?.address?.slice(4, -4)}
                  </span>
                  {account?.address?.slice(-4)}
                </p>
              </span>
              {balance ? (
                <span className="wallet-dropdown-info--balance">
                  <p className="wallet-dropdown-balance-label text-xs capitalize text-gray-400 mt-3">
                    Balance
                  </p>
                  <p className="wallet-dropdown-balance-value ext-sm font-medium text-gray-900">
                    <CryptoValue
                      symbol={
                        activeChain?.nativeCurrency?.symbol || balance.symbol
                      }
                      unit={CryptoUnits.WEI}
                      value={balance.value}
                    />
                  </p>
                </span>
              ) : null}
            </div>
            <Menu.Item as="div">
              {({ active }: any) => (
                <a
                  href={`https://buy.ramp.network/?userAddress=${account?.address}&defaultAsset=${activeChain?.nativeCurrency?.symbol}`}
                  target={'_blank'}
                  className={classNames(
                    'wallet-dropdown-item wallet-dropdown-item--buy',
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  )}
                >
                  Buy {activeChain?.nativeCurrency?.symbol || 'Crypto'}
                </a>
              )}
            </Menu.Item>
            <Menu.Item as="div">
              {({ active }: any) => (
                <DisconnectButton
                  className={classNames(
                    'wallet-dropdown-item wallet-dropdown-item--disconnect',
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                  )}
                />
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </WalletComponentWrapper>
  );
};
