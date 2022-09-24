import { BigNumberish, BytesLike } from 'ethers';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import { useHasAnyOfFeatures } from '../../../../../common';
import { ConnectButton, SwitchChainButton } from '../../../../wallet';
import { CollectionSupplyCounter, useCollectionContext } from '../../../common';
import {
  CollectionSalesAllowlistStatus,
  CollectionSalesMintButton,
  CollectionSalesMintInput,
  CollectionSalesMintStatusBar,
  CollectionSalesPrice,
  CollectionTierEligibleAmount,
  CollectionTierWalletMints,
} from '../components';
import { CollectionSalesActiveStatus } from '../components/CollectionSalesActiveStatus';
import { CollectionSalesMintingProvider } from '../providers/CollectionSalesMintingProvider';

type Props = {
  autoDetectEligibleTier?: boolean;
  tierId?: BigNumberish;
  minterAddress?: BytesLike;
};

export const CollectionSalesMintingSection = ({
  autoDetectEligibleTier = true,
  tierId,
  minterAddress,
}: Props) => {
  const {
    data: { env, chainId, contractAddress },
  } = useCollectionContext();

  const { data: account } = useAccount();
  const [mintCount, setMintCount] = useState<BigNumberish>('1');

  const { data: supportsTieredSales } = useHasAnyOfFeatures({
    env,
    chainId,
    contractAddress,
    tags: [
      'erc721_tiering_extension',
      'mint_by_tier_with_allowance_and_proof',
      'tiered_sales_facet',
    ],
  });

  const mintButtonClass =
    'w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <CollectionSalesMintingProvider
      autoDetectEligibleTier={autoDetectEligibleTier}
      tierId={tierId}
      minterAddress={minterAddress}
    >
      <main className="flex flex-col gap-x-8">
        <div>
          {/* Sale Information */}
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-4">
              <CollectionSupplyCounter
                as="div"
                className="text-sm text-gray-700"
              />

              <CollectionSalesActiveStatus />

              {account || minterAddress ? (
                <CollectionSalesAllowlistStatus />
              ) : null}
            </div>
            <CollectionSalesPrice
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
                  <CollectionSalesMintInput
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
                  <CollectionSalesMintButton
                    mintCount={mintCount}
                    className={mintButtonClass}
                  />
                </SwitchChainButton>
              </div>
            </ConnectButton>

            {/* Maximum eligible amount */}
            <small className="block font-light mt-2 text-xs">
              You can mint up to{' '}
              <CollectionTierEligibleAmount as="div" className="inline" />.{' '}
              {supportsTieredSales ? (
                <>
                  You have minted <CollectionTierWalletMints /> NFTs in this
                  tier.
                </>
              ) : null}
            </small>
          </div>

          <CollectionSalesMintStatusBar className="mt-4 flex flex-col gap-2" />
        </div>
      </main>
    </CollectionSalesMintingProvider>
  );
};
