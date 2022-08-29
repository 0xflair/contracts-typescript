import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';
import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps;

export const StreamTotalSupply = ({ as, ...attributes }: Props) => {
  const {
    data: { chainInfo },
  } = useStreamContext();
  const {
    data: { currentClaimTokenSymbol, totalSupplyAmountOverall },
  } = useStreamClaimingContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      <CryptoValue
        symbol={
          currentClaimTokenSymbol?.toString() ||
          chainInfo?.nativeCurrency?.symbol
        }
        value={totalSupplyAmountOverall}
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </Component>
  );
};
