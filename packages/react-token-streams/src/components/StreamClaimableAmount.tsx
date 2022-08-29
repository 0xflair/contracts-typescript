import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import { BareComponentProps } from '@0xflair/react-common';
import { BigNumber } from 'ethers';
import { Fragment } from 'react';

import { useStreamClaimingContext } from '../providers';
import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  calculationMode?: 'BY_ACCOUNT' | 'OVERALL';
} & BareComponentProps;

export const StreamClaimableAmount = ({
  as,
  calculationMode = 'BY_ACCOUNT',
  ...attributes
}: Props) => {
  const {
    data: { chainInfo },
  } = useStreamContext();
  const {
    data: {
      totalClaimableAmountByAccount,
      totalSupplyAmountOverall,
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
            ? totalClaimableAmountByAccount
            : BigNumber.from(totalSupplyAmountOverall || 0)?.sub(
                totalClaimedAmountOverall?.toString() || 0,
              )
        }
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </Component>
  );
};
