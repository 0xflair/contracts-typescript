import { ExclamationIcon, LinkIcon, XCircleIcon } from '@heroicons/react/solid';
import React, { ReactNode } from 'react';
import { useNetwork } from 'wagmi';

import { FLAIR_CHAINS } from '../../constants/chains';
import { ConnectButton } from '../ConnectButton/ConnectButton';

type Props = {
  notConnectedView?: ReactNode;
  children?: ReactNode;
};

export const RequireConnect = (props: Props) => {
  const { notConnectedView, children } = props;
  const [{ data: networkData, error, loading }, switchNetwork] = useNetwork();

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error while connecting wallet
              </h3>
              <div className="mt-2 text-sm text-red-700">
                {error.message || error.toString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Loading, please wait...
        </span>
      </div>
    );
  }

  if (networkData.chain?.unsupported) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationIcon
                className="h-5 w-5 text-yellow-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Unsupported network
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Your wallet is currently connected to{' '}
                  <b>{networkData.chain.name}</b> which is not supported yet.
                  Please switch to one of the following networks:{' '}
                  {switchNetwork ? (
                    FLAIR_CHAINS.map((chain) => (
                      <>
                        <button
                          key={chain.id}
                          onClick={() => switchNetwork(chain.id)}
                        >
                          {chain.name}
                        </button>
                        {', '}
                      </>
                    ))
                  ) : (
                    <b>{FLAIR_CHAINS.map((chain) => chain.name).join(', ')}</b>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!networkData.chain) {
    return notConnectedView ? (
      <>{notConnectedView}</>
    ) : (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <LinkIcon
            className="mx-auto h-8 w-8 text-gray-400"
            aria-hidden="true"
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Gm, wen wallet?
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Connect your wallet first, then you can see this section.
          </p>
          <div className="mt-6">
            <ConnectButton label="Connect" />
          </div>
        </div>
      </div>
    );
  }

  if (children) {
    return <>{children}</>;
  }

  return <></>;
};
