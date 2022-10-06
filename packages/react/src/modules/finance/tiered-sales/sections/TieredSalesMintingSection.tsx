import { BigNumberish } from 'ethers';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import { useHasAnyOfFeatures } from '../../../../common';
import { ConnectButton, SwitchChainButton } from '../../../../core/wallet';
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
import { TieredSalesStatus } from '../components/TieredSalesStatus';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';

type Props = {};

export const TieredSalesMintingSection = ({}: Props) => {
  const {
    data: { chainId, minterAddress },
  } = useTieredSalesContext();

  const { address, isConnected } = useAccount();
  const [mintCount, setMintCount] = useState<BigNumberish>('1');

  const mintButtonClass =
    'w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <main className="flex flex-col gap-x-8">
      <div>
        {/* Sale Information */}
        <div className="mt-4 flex justify-between">
          <div className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-4">
            <TieredSalesStatus />

            {address && isConnected ? <TieredSalesAllowlistStatus /> : null}
          </div>
          <TieredSalesPrice
            as="div"
            className="text-xl font-medium text-gray-900"
          />
        </div>
      </div>

      <div>
        <div>
          {/* Mint count */}
          <div className="mt-8 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-900">
                How many to mint?
              </h2>
            </div>

            <fieldset className="mt-4">
              <legend className="sr-only">Choose number of mints</legend>
              <div className="flex">
                <TieredSalesMintInput
                  mintCount={mintCount}
                  setMintCount={setMintCount}
                  className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-75"
                />
              </div>
            </fieldset>
          </div>

          {/* Mint button */}
          <ConnectButton className={mintButtonClass}>
            <div className="flex gap-3 items-center">
              <SwitchChainButton
                requiredChainId={Number(chainId)}
                className={mintButtonClass}
              >
                <TieredSalesMintButton
                  mintCount={mintCount}
                  className={mintButtonClass}
                />
              </SwitchChainButton>
            </div>
          </ConnectButton>

          {/* Maximum eligible amount */}
          <small className="block font-light mt-2 text-xs">
            <TieredSalesIfWalletCanMint>
              You can mint up to{' '}
              <TieredSalesEligibleAmount as="div" className="inline" />.{' '}
            </TieredSalesIfWalletCanMint>
            {address || isConnected || minterAddress ? (
              <>
                You have minted <TieredSalesWalletMints /> NFTs in this tier.
              </>
            ) : null}
          </small>
        </div>

        <TieredSalesMintStatusBar className="mt-4 flex flex-col gap-2" />
      </div>
    </main>
  );
};
