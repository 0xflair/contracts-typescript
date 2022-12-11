import { Fragment, PropsWithChildren } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesContext } from '../providers';

type Props = PropsWithChildren<BareComponentProps> & {
  disabled?: boolean;
  rampIgnoreCurrentBalance?: boolean;
  rampPreferredPaymentMethod?: string;
};

export const TieredSalesMintButton = ({
  as = 'button',
  children = 'Mint now',
  disabled,
  rampIgnoreCurrentBalance,
  rampPreferredPaymentMethod,
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
          rampIgnoreCurrentBalance || rampPreferredPaymentMethod
            ? {
                customData: {
                  rampIgnoreCurrentBalance,
                  rampPreferredPaymentMethod,
                },
              }
            : undefined,
        )
      }
      disabled={!canMint || !mint || disabled}
      {...attributes}
    >
      {children}
    </Component>
  );
};
