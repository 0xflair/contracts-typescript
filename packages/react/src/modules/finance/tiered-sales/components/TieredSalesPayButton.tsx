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
        <span>Buy with Crypto</span>
        <div>
          <img
            src={
              'https://ipfs.io/ipfs/bafkreihau2qub27bteskek7vsqc5nvuk3j3on4sx3c44m3wtilu7h6tsju'
            }
            className="h-4"
          />
        </div>
      </>
    ) : method === 'sponsor' ? (
      <>Mint without Gas</>
    ) : (
      <>Pay to mint</>
    ));

  const rampEnabled =
    (method?.includes?.('stripe') && rampConfig?.stripeEnabled) ||
    (method?.includes?.('utrust') && rampConfig?.utrustEnabled) ||
    (method?.includes?.('bitpay') && rampConfig?.bitpayEnabled) ||
    (method?.includes?.('coinbase') && rampConfig?.coinbaseEnabled) ||
    (method?.includes?.('sponsor') &&
      rampConfig?.paymentRailsSupportedForChainAndToken);

  if (!alwaysShow) {
    if (!rampEnabled) {
      return null;
    }
  }

  const finalDisabled = attributes.disabled || !rampEnabled;

  return (
    <TieredSalesMintButton
      rampIgnoreCurrentBalance={true}
      rampPreferredMethod={method}
      disabled={finalDisabled}
      {...attributes}
    >
      {finalChildren}
    </TieredSalesMintButton>
  );
};
