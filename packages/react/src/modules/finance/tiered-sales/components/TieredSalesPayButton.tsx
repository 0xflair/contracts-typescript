import { PropsWithChildren } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesContext } from '../providers';
import { TieredSalesMintButton } from './TieredSalesMintButton';

type Props = PropsWithChildren<BareComponentProps> & {
  method: string;
  disabled?: boolean;
  alwaysShow?: boolean;
};

export const TieredSalesPayButton = ({
  children,
  method,
  alwaysShow,
  ...attributes
}: Props) => {
  const {
    data: { rampConfig },
  } = useTieredSalesContext();

  const finalChildren =
    children ||
    (method === 'stripe' ? (
      <>
        <span>Buy with Credit Card</span>
        <div className="flex gap-2">
          <img
            src={
              'https://ipfs.io/ipfs/bafkreic7ffv2qgh4t7dpvyvcwdzvcjww3dbonz3ufbdi3flzibtlnv5w6y'
            }
            className="h-4"
          />
        </div>
      </>
    ) : method?.includes &&
      ['utrust', 'bitpay', 'coinbase'].find((m) => method.includes(m)) ? (
      <>
        <span>Buy with other Crypto</span>
        <div>
          <img
            src={
              'https://ipfs.io/ipfs/bafkreihau2qub27bteskek7vsqc5nvuk3j3on4sx3c44m3wtilu7h6tsju'
            }
            className="h-4"
          />
        </div>
      </>
    ) : (
      <>Pay to mint</>
    ));

  const rampDisabled =
    (method?.includes?.('stripe') && !rampConfig?.stripeEnabled) ||
    (method?.includes?.('utrust') && !rampConfig?.utrustEnabled) ||
    (method?.includes?.('bitpay') && !rampConfig?.bitpayEnabled) ||
    (method?.includes?.('coinbase') && !rampConfig?.coinbaseEnabled);

  if (!alwaysShow) {
    if (rampDisabled) {
      return null;
    }
  }

  const finalDisabled = attributes.disabled || rampDisabled;

  return (
    <TieredSalesMintButton
      rampIgnoreCurrentBalance={true}
      rampPreferredPaymentMethod={method}
      disabled={finalDisabled}
      {...attributes}
    >
      {finalChildren}
    </TieredSalesMintButton>
  );
};
