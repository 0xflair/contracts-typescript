import { classNames } from '@flair-sdk/common';
import { BigNumberish } from 'ethers';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import { SECONDARY_BUTTON } from '../../../../core/ui/components/elements/Button';
import {
  ConnectButton,
  IfWalletConnected,
  SwitchChainButton,
} from '../../../../core/wallet';
import {
  TieredSalesAllowlistStatus,
  TieredSalesEligibleAmount,
  TieredSalesIfWalletCanMint,
  TieredSalesMintButton,
  TieredSalesMintInput,
  TieredSalesMintStatusBar,
  TieredSalesPrice,
  TieredSalesWalletMints,
} from '../components';
import { TieredSalesApproveButton } from '../components/TieredSalesApproveButton';
import { TieredSalesStatus } from '../components/TieredSalesStatus';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';

type Props = {};

export const TieredSalesMintingSection = ({}: Props) => {
  const {
    data: { chainId, minterAddress, mintCount },
    setMintCount,
  } = useTieredSalesContext();

  const { address, isConnected } = useAccount();

  const mainButtonClass =
    'tiered-sales-mint-button w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="flair-component tiered-sales-minting-section">
      <main className="tiered-sales-main flex flex-col gap-x-8">
        <div className="tiered-sales-header">
          {/* Sale Information */}
          <div className="tiered-sales-sales-info mt-4 flex justify-between">
            <div className="tiered-sales-statuses flex flex-col flex-wrap sm:flex-row sm:items-center gap-4">
              <TieredSalesStatus className="tiered-sales-active-status" />

              {address && isConnected ? (
                <TieredSalesAllowlistStatus className="tiered-sales-allowlist-statuses" />
              ) : null}
            </div>
            <TieredSalesPrice
              as="div"
              className="tiered-sales-price text-xl font-medium text-gray-900"
            />
          </div>
        </div>

        <div className="tiered-sales-form">
          <div>
            {/* Mint count */}
            <div className="tiered-sales-mint-form mt-8 mb-4">
              <div className="tiered-sales-mint-title flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900">
                  How many to mint?
                </h2>
              </div>

              <fieldset className="tiered-sales-mint-title mt-4">
                <div className="flex">
                  <TieredSalesMintInput className="tiered-sales-mint-input appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-75" />
                </div>
              </fieldset>
            </div>

            {/* Connect, Switch, Approve, Mint, and Buy buttons */}
            <ConnectButton
              className={classNames('flair-connect-button', mainButtonClass)}
              label="Connect to Mint"
            >
              {/* ... if connected show the rest: */}
              <div className="flex flex-col gap-3 items-center">
                <SwitchChainButton
                  requiredChainId={Number(chainId)}
                  className={classNames('flair-switch-button', mainButtonClass)}
                >
                  {/* ... if on the right chain show the rest: */}
                  <TieredSalesApproveButton
                    className={classNames(
                      'flair-approve-button',
                      mainButtonClass,
                    )}
                  >
                    {/* ... if already approved show the mint button: */}
                    <TieredSalesMintButton
                      className={classNames(
                        'flair-mint-button normal-payment',
                        mainButtonClass,
                      )}
                    />
                  </TieredSalesApproveButton>
                  <div className="flex gap-2 items-center w-full">
                    {/* Show a special mint button that always triggers "fiat" payment option: */}
                    <TieredSalesMintButton
                      className={classNames(
                        'flair-mint-button fiat-payment',
                        SECONDARY_BUTTON,
                        'flex flex-1 flex-col justify-center items-center gap-2',
                      )}
                      rampIgnoreCurrentBalance={true}
                      rampPaymentMethod="stripe"
                    >
                      <span>Buy with Credit Card</span>
                      <div className="payment-logos fiat-logos flex gap-2">
                        <img
                          src={
                            'https://ipfs.io/ipfs/bafkreic7ffv2qgh4t7dpvyvcwdzvcjww3dbonz3ufbdi3flzibtlnv5w6y'
                          }
                          className="h-4"
                        />
                      </div>
                    </TieredSalesMintButton>
                    {/* Show a special mint button that always triggers "other crypto" payment option: */}
                    <TieredSalesMintButton
                      className={classNames(
                        'flair-mint-button crypto-payment',
                        SECONDARY_BUTTON,
                        'flex flex-1 flex-col justify-center items-center gap-2',
                      )}
                      rampIgnoreCurrentBalance={true}
                      rampPaymentMethod="utrust"
                    >
                      <span>Buy with other Crypto</span>
                      <div className="payment-logos crypto-logos">
                        <img
                          src={
                            'https://ipfs.io/ipfs/bafkreihau2qub27bteskek7vsqc5nvuk3j3on4sx3c44m3wtilu7h6tsju'
                          }
                          className="h-4"
                        />
                      </div>
                    </TieredSalesMintButton>
                  </div>
                </SwitchChainButton>
              </div>
            </ConnectButton>

            {/* Maximum eligible amount */}
            <IfWalletConnected>
              <small className="tiered-sales-eligibility-bar block font-light mt-2 text-xs">
                <TieredSalesIfWalletCanMint>
                  You can mint up to{' '}
                  <TieredSalesEligibleAmount as="div" className="inline" />.{' '}
                </TieredSalesIfWalletCanMint>

                {address || isConnected || minterAddress ? (
                  <>
                    You have minted <TieredSalesWalletMints /> NFTs in this
                    tier.
                  </>
                ) : null}
              </small>
            </IfWalletConnected>
          </div>

          <TieredSalesMintStatusBar className="tiered-sales-status-bar mt-4 flex flex-col gap-2" />
        </div>
      </main>
    </div>
  );
};
