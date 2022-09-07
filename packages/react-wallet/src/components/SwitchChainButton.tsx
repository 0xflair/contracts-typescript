import { BareComponentProps, useChainInfo } from '@0xflair/react-common';
import React from 'react';
import { useNetwork } from 'wagmi';

type Props = BareComponentProps & {
  label?: React.ReactNode;
  children?: React.ReactNode;
  requiredChainId: number;
};

export const SwitchChainButton = ({
  as,
  label,
  children,
  requiredChainId,
  ...attributes
}: Props) => {
  const { activeChain, switchNetwork } = useNetwork();
  const requiredChain = useChainInfo(Number(requiredChainId));

  const Component = as || 'button';

  if (
    !activeChain?.id ||
    !requiredChainId ||
    activeChain.id.toString() !== requiredChainId.toString()
  ) {
    return (
      <Component
        disabled={!switchNetwork}
        onClick={() => switchNetwork && switchNetwork(requiredChainId)}
        {...attributes}
      >
        {label || `Switch to ${requiredChain?.name || requiredChainId} chain`}
      </Component>
    );
  }

  if (children) {
    return <>{children}</>;
  }

  return <></>;
};
