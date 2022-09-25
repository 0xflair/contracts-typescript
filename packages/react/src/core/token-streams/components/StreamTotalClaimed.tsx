import { Fragment } from 'react';

import { BareComponentProps } from '../../../common';
import { CryptoUnits, CryptoValue } from '../../crypto-currency';
import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';
import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  calculationMode?: 'BY_ACCOUNT' | 'OVERALL';
} & BareComponentProps;

export const StreamTotalClaimed = ({
  calculationMode = 'BY_ACCOUNT',
  as,
  ...attributes
}: Props) => {
  const {
    data: { chainInfo },
  } = useStreamContext();
  const {
    data: {
      totalClaimedAmountByAccount,
      totalClaimedAmountOverall,
      currentClaimTokenSymbol,
    },
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
        value={
          calculationMode === 'BY_ACCOUNT'
            ? totalClaimedAmountByAccount
            : totalClaimedAmountOverall
        }
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </Component>
  );
};
