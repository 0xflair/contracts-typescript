import { ReactNode } from 'react';

import { BareComponentProps } from '../../../../common';
import { useTieredSalesContext } from '../providers/TieredSalesProvider';
import {
  TieredSalesMintButton,
  TieredSalesMintButtonVariables,
} from './TieredSalesMintButton';

type Props = BareComponentProps & {
  method: string;
  disabled?: boolean;
  alwaysShow?: boolean;
  loadingContent?: ReactNode;
  children?:
    | ReactNode
    | ((variables: TieredSalesMintButtonVariables) => ReactNode);
};

export const TieredSalesPayButton = ({
  children,
  method,
  alwaysShow,
  ...attributes
}: Props) => {
  const {
    data: { rampRequestConfig, price },
  } = useTieredSalesContext();

  const finalChildren = children
    ? children
    : (): ReactNode => {
        return method === 'stripe' ? (
          <>
            {price && price.toString() === '0' ? (
              <span>Pay gas with Credit Card</span>
            ) : (
              <span>Buy with Credit Card</span>
            )}
            <div className="flex gap-2">
              <img
                src={
                  'https://ipfs.flair.dev/ipfs/bafkreic7ffv2qgh4t7dpvyvcwdzvcjww3dbonz3ufbdi3flzibtlnv5w6y'
                }
                className="h-4"
              />
            </div>
          </>
        ) : method?.includes &&
          ['utrust', 'bitpay', 'coinbase'].find((m) => method.includes(m)) ? (
          <>
            {price && price.toString() === '0' ? (
              <span>Pay gas with any Crypto</span>
            ) : (
              <span>Buy with any Crypto</span>
            )}
            <div>
              <img
                src={
                  'https://ipfs.flair.dev/ipfs/bafkreiazkfopozbppvn4wb6gtlfwda7mgtjorlhclpvh2s2myeslzjfe6i'
                }
                className="h-4"
              />
            </div>
          </>
        ) : method === 'sponsor' ? (
          <>Mint without Gas</>
        ) : (
          <>Pay to mint</>
        );
      };

  const rampEnabled =
    (method?.includes?.('stripe') && rampRequestConfig?.stripeEnabled) ||
    (method?.includes?.('utrust') && rampRequestConfig?.utrustEnabled) ||
    (method?.includes?.('bitpay') && rampRequestConfig?.bitpayEnabled) ||
    (method?.includes?.('coinbase') && rampRequestConfig?.coinbaseEnabled) ||
    (method?.includes?.('sponsor') && rampRequestConfig?.canSponsorTransaction);

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
      children={finalChildren}
    />
  );
};
