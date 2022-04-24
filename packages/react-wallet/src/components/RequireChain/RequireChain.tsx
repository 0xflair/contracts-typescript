import { useChainInfo } from '@0xflair/react-common';
import { Button } from '@0xflair/react-ui';
import { RefreshIcon } from '@heroicons/react/solid';
import React, { ReactNode } from 'react';
import { useNetwork } from 'wagmi';

type Props = {
  requiredChainId: number;
  wrongChainView?: ReactNode;
  children?: ReactNode;
};

export const RequireChain = (props: Props) => {
  const { requiredChainId, wrongChainView, children } = props;
  const [{ data: networkData }, switchNetwork] = useNetwork();
  const requiredChain = useChainInfo(Number(requiredChainId));

  if (
    !networkData.chain?.id ||
    !requiredChainId ||
    networkData.chain.id.toString() !== requiredChainId.toString()
  ) {
    return wrongChainView ? (
      <>{wrongChainView}</>
    ) : (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <RefreshIcon
            className="mx-auto h-8 w-8 text-gray-400"
            aria-hidden="true"
          />
          <h3 className="mt-2 text-md font-medium text-gray-900">
            Switch your network to {requiredChain?.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Your wallet is currently connected to {networkData.chain?.name},{' '}
            <br />
            but you must connect to <b>{requiredChain?.name}</b> to access this
            section.
          </p>
          <div className="mt-6">
            {switchNetwork && requiredChainId ? (
              <Button
                text="Switch for me"
                onClick={() => switchNetwork(requiredChainId)}
              ></Button>
            ) : null}
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
