import React from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import { BareComponentProps, useChainInfo } from '../../../common';

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
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const requiredChain = useChainInfo(Number(requiredChainId));

  const Component = as || 'button';

  if (
    !chain?.id ||
    !requiredChainId ||
    chain.id.toString() !== requiredChainId.toString()
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
