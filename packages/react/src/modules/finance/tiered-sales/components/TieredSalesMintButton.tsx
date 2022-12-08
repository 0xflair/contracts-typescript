import { Fragment, PropsWithChildren } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesContext } from '../providers';

type Props = PropsWithChildren<BareComponentProps> & {
  rampIgnoreCurrentBalance?: boolean;
  rampPaymentMethod?: string;
};

export const TieredSalesMintButton = ({
  as = 'button',
  children = 'Mint now',
  rampIgnoreCurrentBalance,
  rampPaymentMethod,
  ...attributes
}: Props) => {
  const {
    data: { canMint },
    mint,
  } = useTieredSalesContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component
      onClick={() =>
        mint?.(
          undefined,
          rampIgnoreCurrentBalance || rampPaymentMethod
            ? {
                customData: {
                  rampIgnoreCurrentBalance,
                  rampPaymentMethod,
                },
              }
            : undefined,
        )
      }
      disabled={!canMint || !mint}
      {...attributes}
    >
      {children}
    </Component>
  );
};
