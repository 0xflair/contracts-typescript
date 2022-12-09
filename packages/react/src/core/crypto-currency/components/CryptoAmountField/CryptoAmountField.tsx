import { classNames, POPULAR_ERC20_TOKENS } from '@flair-sdk/common';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { BigNumberish, ethers, utils } from 'ethers';
import * as React from 'react';
import { useState } from 'react';
import { useNetwork } from 'wagmi';

import { useContractName, useContractSymbol } from '../../../../modules';
import {
  AddressScannerLink,
  Button,
  ButtonWithDialog,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
} from '../../../ui';
import { CryptoSymbol, CryptoUnits } from '../../types';
import { CryptoPrice } from '../CryptoPrice/CryptoPrice';

export type CryptoAmountFieldProps = {
  label: string;
  description?: React.ReactNode;
  value: string | BigNumberish;
  unit?: CryptoUnits;
  symbol?: CryptoSymbol;
  min?: number;
  max?: number;
  tabIndex?: number;
  onChange?: (value: string) => void;
  allowSymbolChange?: boolean;
  onSymbolChange?: (symbol: CryptoSymbol) => void;
};

export const CryptoAmountField = (props: CryptoAmountFieldProps) => {
  const {
    label,
    description,
    value,
    unit = CryptoUnits.ETHER,
    symbol,
    allowSymbolChange,
    min,
    max,
    tabIndex,
    onChange,
  } = props;

  const { chain } = useNetwork();

  const convertedValueWei = utils.parseUnits(value.toString(), unit);
  const convertedValueEther = utils.formatEther(convertedValueWei);

  const [etherValue, setEtherValue] = useState(convertedValueEther.toString());

  const [selectedTokenType, setSelectedTokenType] = useState(
    !symbol || symbol === ethers.constants.AddressZero ? 'native' : 'erc20',
  );
  const [erc20Address, setErc20Address] = useState(
    symbol || ethers.constants.AddressZero,
  );

  const { data: erc20Symbol } = useContractSymbol({
    chainId: chain?.id,
    contractAddress: erc20Address,
    enabled: Boolean(
      chain?.id &&
        erc20Address &&
        erc20Address !== ethers.constants.AddressZero,
    ),
  });

  const { data: erc20Name } = useContractName({
    chainId: chain?.id,
    contractAddress: erc20Address,
    enabled: Boolean(
      chain?.id &&
        erc20Address &&
        erc20Address !== ethers.constants.AddressZero,
    ),
  });

  const isSymbolValid = Boolean(
    selectedTokenType === 'native'
      ? true
      : erc20Address && erc20Address.match(/^0x[a-fA-F0-9]{40}$/),
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 rounded-md">
        <div className="flex flex-row gap-2">
          <div className="w-full relative">
            <input
              type="number"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              value={etherValue}
              min={min || 0}
              max={max || Infinity}
              tabIndex={tabIndex}
              onChange={(e) => {
                if (Number.isNaN(Number(e.target.value))) return;

                setEtherValue(e.target.value);
                onChange &&
                  onChange(
                    utils.formatUnits(
                      utils.parseEther(e.target.value || '0'),
                      unit,
                    ),
                  );
              }}
            />
            <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                (
                {!symbol || symbol?.toString() === ethers.constants.AddressZero
                  ? chain?.nativeCurrency?.name
                  : erc20Symbol?.toString()}
                ){' '}
                <CryptoPrice
                  value={etherValue}
                  symbol={
                    (!symbol ||
                    symbol?.toString() === ethers.constants.AddressZero
                      ? chain?.nativeCurrency?.symbol
                      : erc20Symbol?.toString()) as CryptoSymbol
                  }
                  unit={CryptoUnits.ETHER}
                  showCurrencySymbol={true}
                />
              </span>
            </div>
          </div>
          {allowSymbolChange && (
            <ButtonWithDialog
              as={'button'}
              text="Change currency"
              dialogTitle="Change currency"
              className={classNames(SECONDARY_BUTTON)}
              buttons={[
                (dialogOpen: boolean, setDialogOpen: any) => {
                  return (
                    <Button
                      className={PRIMARY_BUTTON}
                      text={'Save'}
                      disabled={!isSymbolValid}
                      onClick={() => {
                        props.onSymbolChange &&
                          props.onSymbolChange(erc20Address);
                        setDialogOpen(false);
                      }}
                    />
                  );
                },
              ]}
            >
              <>
                <p className="text-sm text-gray-500">
                  You can choose native currency, which is depending on the
                  chain (ETH, MATIC, AVAX), or enter an ERC20 input address.
                </p>
                <div className="mt-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          id="symbol-type-native"
                          name="symbol-type"
                          type="radio"
                          defaultChecked={selectedTokenType === 'native'}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTokenType('native');
                              setErc20Address('');
                            }
                          }}
                        />
                        <label
                          htmlFor={'symbol-type-native'}
                          className="block text-sm font-medium text-gray-700"
                        >
                          {'Native Token'}
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          id="symbol-type-erc20"
                          name="symbol-type"
                          type="radio"
                          defaultChecked={selectedTokenType === 'erc20'}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTokenType('erc20');
                            }
                          }}
                        />
                        <label
                          htmlFor={'symbol-type-erc20'}
                          className="block text-sm font-medium text-gray-700"
                        >
                          {'ERC20 Token'}
                        </label>
                      </div>
                    </div>

                    {selectedTokenType === 'erc20' && (
                      <>
                        <input
                          type="text"
                          value={erc20Address}
                          onChange={(event) =>
                            setErc20Address(event.target.value)
                          }
                          placeholder="0x..."
                          className={classNames(
                            'block w-full shadow-sm sm:text-sm  rounded-md',
                            isSymbolValid
                              ? 'border-neutral-300 focus:ring-indigo-500 focus:border-indigo-500'
                              : 'border-red-500 ring-red-500 focus:border-red-600 focus:ring-red-500',
                          )}
                        />
                        <p className="mt-1 text-xs">
                          <ul role="list" className="list-disc space-y-1 pl-5">
                            <li className="text-sm text-gray-500">
                              Name:{' '}
                              <i className="italic text-gray-700">
                                {erc20Name?.toString() || '-'}
                              </i>
                            </li>
                            <li className="text-sm text-gray-500">
                              Symbol:{' '}
                              <i className="italic text-gray-700">
                                {erc20Symbol?.toString() || '-'}
                              </i>
                            </li>
                          </ul>
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {selectedTokenType === 'erc20' &&
                  chain?.id &&
                  chain.id in POPULAR_ERC20_TOKENS &&
                  POPULAR_ERC20_TOKENS[chain.id as 1]?.length > 0 && (
                    <div className="mt-4 text-xs">
                      <div className="rounded-md bg-blue-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <InformationCircleIcon
                              className="h-5 w-5 text-blue-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-1 flex flex-col gap-1">
                            <h3 className="text-xs font-medium text-blue-800">
                              Popular ERC20 Tokens
                            </h3>

                            <p className="mt-1 text-blue-900 text-xs">
                              You can use one of these popular ERC20 tokens,
                              just click on "Use" button or paste the address in
                              the text input above.
                            </p>

                            <p className="mt-1 text-xs text-blue-700">
                              <ul
                                role="list"
                                className="list-disc space-y-1 pl-3"
                              >
                                {POPULAR_ERC20_TOKENS[chain.id as 1].map(
                                  (token) => (
                                    <li key={token.contractAddress}>
                                      <div className="w-full flex flex-col gap-1">
                                        <b>{token.symbol}: </b>
                                        <AddressScannerLink
                                          chainId={chain.id}
                                          address={token.contractAddress}
                                        />
                                        <div>
                                          <Button
                                            text={`Use ${token.symbol}`}
                                            className={classNames(
                                              'px-0.2 py-0.5',
                                              SECONDARY_BUTTON,
                                            )}
                                            onClick={() => {
                                              setErc20Address(
                                                token.contractAddress,
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </>
            </ButtonWithDialog>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
};
