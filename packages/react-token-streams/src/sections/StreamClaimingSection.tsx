import { useHasAnyOfFeatures } from '@0xflair/react-common';
import { ConnectButton, SwitchChainButton } from '@0xflair/react-wallet';

import {
  StreamClaimableAmount,
  StreamClaimingStatusBar,
  StreamRateByTokens,
} from '../components';
import { StreamClaimButton } from '../components/StreamClaimButton';
import { StreamClaimTokenSelector } from '../components/StreamClaimTokenSelector';
import { StreamEmissionTimeUnit } from '../components/StreamEmissionTimeUnit';
import { StreamRewardAmount } from '../components/StreamRewardAmount';
import { StreamSharesAllocation } from '../components/StreamSharesAllocation';
import { StreamSharesPercentage } from '../components/StreamSharesPercentage';
import { StreamTotalClaimed } from '../components/StreamTotalClaimed';
import { StreamTotalSupply } from '../components/StreamTotalSupply';
import { StreamClaimingProvider } from '../providers/StreamClaimingProvider';
import { useStreamContext } from '../providers/StreamProvider';

type Props = {};

export const StreamClaimingSection = ({}: Props) => {
  const {
    data: { env, chainId, contractAddress, tokenBalances },
  } = useStreamContext();

  const buttonClass =
    'mt-4 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';

  const { data: hasEmissionReleaseExtension } = useHasAnyOfFeatures({
    env,
    chainId,
    contractAddress,
    tags: ['flair_stream_emission_release_extension'],
  });
  const { data: hasShareSplitExtension } = useHasAnyOfFeatures({
    env,
    chainId,
    contractAddress,
    tags: ['flair_stream_share_split_extension'],
  });
  const { data: hasRewardCalculationByTokens } = useHasAnyOfFeatures({
    env,
    chainId,
    contractAddress,
    tags: ['reward_amount_by_multi_tokens'],
  });
  const { data: hasRateByTokens } = useHasAnyOfFeatures({
    env,
    chainId,
    contractAddress,
    tags: ['rate_by_multiple_tokens'],
  });

  return (
    <StreamClaimingProvider>
      <main className="flex items-center">
        <div className="min-w-full">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-span-12">
              <section className="flex flex-col gap-2 px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
                <dl className={'space-y-4'}>
                  {tokenBalances && tokenBalances?.length > 1 ? (
                    <div className="flex flex-col align-items-start justify-between gap-2">
                      <dt className="flex flex-col gap-1 text-sm text-gray-600">
                        <span>Available tokens</span>
                        <small className="text-xs flex-shrink-0 text-gray-400">
                          Choose which token you want to claim?
                        </small>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        <StreamClaimTokenSelector />
                      </dd>
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between gap-4">
                    <dt className="flex flex-col gap-1 text-sm text-gray-600">
                      <span>Your total claimed</span>
                      <small className="text-xs flex-shrink-0 text-gray-400">
                        Sum of all previous claims
                      </small>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      <StreamTotalClaimed />
                    </dd>
                  </div>
                  {hasRateByTokens ? (
                    <>
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                        <dt className="flex flex-col gap-1 text-sm text-gray-600">
                          <span>Reward rate</span>
                          <small className="text-xs flex-shrink-0 text-gray-400">
                            How many tokens you receive{' '}
                            <StreamEmissionTimeUnit className="inline" />
                          </small>
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">
                          <StreamRateByTokens />
                        </dd>
                      </div>
                    </>
                  ) : null}
                  {hasEmissionReleaseExtension ? (
                    <>
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                        <dt className="flex flex-col gap-1 text-sm text-gray-600">
                          <span>Claim window</span>
                          <small className="text-xs flex-shrink-0 text-gray-400">
                            How often can you claim
                          </small>
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">
                          <StreamEmissionTimeUnit />
                        </dd>
                      </div>
                    </>
                  ) : null}
                  {hasShareSplitExtension ? (
                    <>
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                        <dt className="flex flex-col gap-1 text-sm text-gray-600">
                          <span>Shares</span>
                          <small className="text-xs flex-shrink-0 text-gray-400">
                            Your allocation based on NFTs you hold
                          </small>
                        </dt>
                        <dd className="text-sm font-medium text-gray-900 flex flex-col gap-1 items-end">
                          <StreamSharesPercentage />
                          <small>
                            <StreamSharesAllocation className="text-gray-600" />
                          </small>
                        </dd>
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                        <dt className="flex flex-col gap-1 text-sm text-gray-600">
                          <span>Total supply</span>
                          <small className="text-xs flex-shrink-0 text-gray-400">
                            Overall amount of tokens in the stream
                          </small>
                        </dt>
                        <dd className="text-sm font-medium text-gray-900 flex flex-col gap-1 items-end">
                          <StreamTotalSupply />
                        </dd>
                      </div>
                    </>
                  ) : null}
                  {hasRewardCalculationByTokens ? (
                    <>
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                        <dt className="flex flex-col gap-1 text-sm text-gray-600">
                          <span>Total rewards</span>
                          <small className="text-xs flex-shrink-0 text-gray-400">
                            Including next claim window
                          </small>
                        </dt>
                        <dd className="text-sm font-medium text-gray-900 flex flex-col gap-1 items-end">
                          <StreamRewardAmount />
                        </dd>
                      </div>
                    </>
                  ) : null}
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                    <dt className="text-base font-medium text-gray-900">
                      Claimable now for you
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      <StreamClaimableAmount />
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-col justify-center items-center mt-4">
                  <ConnectButton
                    label="Connect to claim"
                    className={buttonClass}
                  >
                    <SwitchChainButton
                      requiredChainId={Number(chainId)}
                      className={buttonClass}
                    >
                      <StreamClaimButton className={buttonClass} />
                    </SwitchChainButton>
                  </ConnectButton>
                </div>

                <StreamClaimingStatusBar />
              </section>
            </div>
          </div>
        </div>
      </main>
    </StreamClaimingProvider>
  );
};
