import { useChainInfo } from '@0xflair/react-common';
import { Button } from '@0xflair/react-ui';
import React from 'react';
import { useNetwork } from 'wagmi';

type Props = {
  requiredChainId: number;
  label?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export const SwitchChainButton = (props: Props) => {
  const { requiredChainId, children, className, label } = props;
  const { activeChain, switchNetwork } = useNetwork();
  const requiredChain = useChainInfo(Number(requiredChainId));

  if (
    !activeChain?.id ||
    !requiredChainId ||
    activeChain.id.toString() !== requiredChainId.toString()
  ) {
    return (
      <Button
        disabled={!switchNetwork}
        className={className}
        text={
          label || `Switch to ${requiredChain?.name || requiredChainId} chain`
        }
        onClick={() => switchNetwork && switchNetwork(requiredChainId)}
      ></Button>
    );
  }

  if (children) {
    return <>{children}</>;
  }

  return <></>;
};
