import React from 'react';
import { Chain, useNetwork, useSwitchNetwork } from 'wagmi';

import { BareComponentProps, useChainInfo } from '../../../common';

type Props = BareComponentProps & {
  label?: React.ReactNode;
  children?: React.ReactNode;
  requiredChainId: number;
  onSuccess?: (chain: Chain) => void;
};

export const SwitchChainButton = ({
  as,
  label,
  children,
  requiredChainId,
  onSuccess,
  ...attributes
}: Props) => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({
    throwForSwitchChainNotSupported: false,
    onSuccess(data, variables, context) {
      if (data.id.toString() == requiredChainId.toString()) {
        onSuccess?.(data);
      }
    },
  });
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
        {label ||
          `Switch to ${
            requiredChain?.name || `correct chain (${requiredChainId})`
          }`}
      </Component>
    );
  }

  if (children) {
    return <>{children}</>;
  }

  return <></>;
};
