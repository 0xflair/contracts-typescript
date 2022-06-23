import { ContractVersion } from '@0xflair/contracts-registry';
import { Environment } from '@0xflair/react-common';
import {
  ConnectButton,
  DisconnectButton,
  SwitchChainButton,
} from '@0xflair/react-wallet';

import { StreamClaimButton, StreamStatusBar } from '../../../common/components';
import { StreamClaimingProvider } from '../../../common/providers';
import {
  VestedHolderStreamInformation,
  VestedHolderStreamRate,
} from '../components';
import { VestedHolderStreamClaimingProvider } from '../providers';

type Props = {
  env?: Environment;
  chainId: number;
  contractAddress: string;
  contractVersion?: ContractVersion;
};

export const VestedHolderStreamClaimingSection = ({
  env = Environment.PROD,
  chainId,
  contractAddress,
  contractVersion,
}: Props) => {
  const buttonClass =
    'mt-4 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <StreamClaimingProvider
      env={env}
      chainId={Number(chainId)}
      contractAddress={contractAddress}
      contractVersion={contractVersion}
    >
      <VestedHolderStreamClaimingProvider>
        {({ data: { stream } }) => (
          <>
            <main className="h-fit mx-auto max-w-lg flex items-center p-4">
              <div className="min-w-full">
                <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                  <div className="lg:col-span-12">
                    <div className="flex gap-4 sm:items-center sm:justify-between sm:flex-row flex-col">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-medium text-gray-900">
                          {stream?.publicTitle ||
                            stream?.contractAddress?.substring(0, 8)}
                        </h1>
                      </div>
                      <div>
                        <div className="text-md font-medium text-gray-900">
                          <VestedHolderStreamRate />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <section className="mt-6 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
                        <VestedHolderStreamInformation />

                        <div className="mt-6 flex flex-col justify-center items-center">
                          {/* Claim button */}
                          <ConnectButton className={buttonClass}>
                            <SwitchChainButton
                              requiredChainId={Number(chainId)}
                              className={buttonClass}
                            >
                              <StreamClaimButton className={buttonClass} />
                            </SwitchChainButton>

                            <DisconnectButton className="text-indigo-700 text-sm mt-4" />
                          </ConnectButton>
                        </div>
                      </section>
                    </div>
                  </div>

                  <div className="mt-4 lg:col-span-12">
                    <StreamStatusBar />

                    {stream?.publicDescription ? (
                      <div className="mt-4">
                        <h2 className="mt-4 text-sm font-medium text-gray-900">
                          Description
                        </h2>

                        <div className="mt-3 prose prose-sm text-gray-500">
                          {stream?.publicDescription}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </main>
          </>
        )}
      </VestedHolderStreamClaimingProvider>
    </StreamClaimingProvider>
  );
};
