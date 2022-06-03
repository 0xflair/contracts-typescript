import { Environment } from '@0xflair/react-common';
import { DisconnectButton, RequireChain } from '@0xflair/react-wallet';

import { StreamClaimButton, StreamStatusBar } from '../../../common/components';
import { StreamClaimingProvider } from '../../../common/providers';
import {
  VestedHolderStreamInformation,
  VestedHolderStreamRate,
} from '../components';
import { VestedHolderStreamClaimingProvider } from '../providers';

type Props = {
  env?: Environment;
  chainId?: number;
  contractAddress?: string;
};

export const VestedHolderStreamClaimingSection = ({
  env = Environment.PROD,
  chainId,
  contractAddress,
}: Props) => {
  if (!chainId) {
    return <div>Missing parameter "chainId" in the URL</div>;
  }

  if (!contractAddress) {
    return <div>Missing parameter "contractAddress" in the URL</div>;
  }

  return (
    <RequireChain requiredChainId={Number(chainId)}>
      <StreamClaimingProvider
        env={env}
        chainId={Number(chainId)}
        contractAddress={contractAddress}
      >
        <VestedHolderStreamClaimingProvider>
          {({ data: { stream } }) => (
            <>
              <style type="text/css">{`html {background: none transparent !important;}`}</style>
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
                            <StreamClaimButton />
                            <DisconnectButton className="text-indigo-700 text-sm mt-4" />
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
    </RequireChain>
  );
};
