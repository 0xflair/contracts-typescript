import { useHasAnyOfFeatures } from '@0xflair/react-common';
import { ConnectButton, SwitchChainButton } from '@0xflair/react-wallet';

import { StreamLockedNfts } from '../components/StreamLockedNfts';
import { StreamMinStakingDuration } from '../components/StreamMinStakingDuration';
import { StreamPrepareButton } from '../components/StreamPrepareButton';
import { StreamStakeButton } from '../components/StreamStakeButton';
import { StreamStakedNfts } from '../components/StreamStakedNfts';
import { StreamStakingStatusBar } from '../components/StreamStakingStatusBar';
import { StreamUnlockedNfts } from '../components/StreamUnlockedNfts';
import { StreamUnstakeableNfts } from '../components/StreamUnstakeableNfts';
import { StreamUnstakeButton } from '../components/StreamUnstakeButton';
import { useStreamContext } from '../providers/StreamProvider';
import { StreamStakingProvider } from '../providers/StreamStakingProvider';

type Props = {};

export const StreamStakingSection = ({}: Props) => {
  const {
    data: { env, chainId, ticketTokenAddress },
  } = useStreamContext();

  const { data: hasLockableExtension } = useHasAnyOfFeatures({
    env,
    chainId,
    contractAddress: ticketTokenAddress,
    tags: ['erc721_lockable_extension'],
  });

  const buttonClass =
    'mt-4 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <StreamStakingProvider>
      {({ data: { needsPrepare } }) => (
        <main className="flex items-center">
          <div className="min-w-full">
            <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
              <div className="lg:col-span-12">
                <section className="flex flex-col gap-2 px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
                  <dl className={'space-y-4'}>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="flex flex-col gap-1 text-sm text-gray-600">
                        <span>Your un-staked NFTs</span>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900 whitespace-nowrap">
                        <StreamUnlockedNfts />
                      </dd>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                      <dt className="flex flex-col gap-1 text-sm text-gray-600">
                        <span>Your staked NFTs</span>
                      </dt>
                      <dd className="text-sm font-medium text-gray-90 whitespace-nowrap">
                        <StreamStakedNfts />
                      </dd>
                    </div>
                    {hasLockableExtension ? (
                      <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                        <dt className="flex flex-col gap-1 text-sm text-gray-600">
                          <span>Your locked NFTs</span>
                          <small className="text-xs flex-shrink-0 text-gray-400">
                            Might include tokens locked in other staking pools.
                          </small>
                        </dt>
                        <dd className="text-sm font-medium text-gray-90 whitespace-nowrap">
                          <StreamLockedNfts />
                        </dd>
                      </div>
                    ) : null}
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                      <dt className="flex flex-col gap-1 text-sm text-gray-600">
                        <span>Minimum lock-time</span>
                        <small className="text-xs flex-shrink-0 text-gray-400">
                          Shortest duration NFTs must be staked.
                        </small>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900 whitespace-nowrap">
                        <StreamMinStakingDuration />
                      </dd>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-4">
                      <dt className="flex flex-col gap-1 text-sm text-gray-600">
                        <span>Unstakeable NFTs</span>
                        <small className="text-xs flex-shrink-0 text-gray-400">
                          These passed the minimum lock-time so you can unstake.
                        </small>
                      </dt>
                      <dd className="text-sm font-medium text-gray-900 whitespace-nowrap">
                        <StreamUnstakeableNfts />
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-col justify-center items-center mt-4">
                    <ConnectButton
                      className={buttonClass}
                      label="Connect to stake"
                    >
                      <SwitchChainButton
                        requiredChainId={Number(chainId)}
                        className={buttonClass}
                      >
                        <div className="w-full flex gap-3">
                          <StreamUnstakeButton className={buttonClass} />
                          {needsPrepare ? (
                            <StreamPrepareButton className={buttonClass} />
                          ) : (
                            <StreamStakeButton className={buttonClass} />
                          )}
                        </div>
                      </SwitchChainButton>
                    </ConnectButton>
                  </div>

                  <StreamStakingStatusBar />
                </section>
              </div>
            </div>
          </div>
        </main>
      )}
    </StreamStakingProvider>
  );
};
