import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import moment from 'moment';
import { ReactNode } from 'react';

import { useVestedHolderStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
  separator?: ReactNode;
};

export const VestedHolderStreamRate = ({
  className,
  separator = <>/</>,
}: Props) => {
  const {
    data: { claimTokenSymbol, vestingRate, vestingTimeUnit },
    isLoading: { vestingRateLoading, vestingTimeUnitLoading },
  } = useVestedHolderStreamClaimingContext();

  return (
    <div className={className}>
      {vestingRateLoading ? (
        '...'
      ) : (
        <CryptoValue
          symbol={claimTokenSymbol?.toString() || 'Token'}
          value={vestingRate}
          unit={CryptoUnits.WEI}
          showPrice={false}
        />
      )}{' '}
      {separator}{' '}
      {vestingTimeUnitLoading
        ? '...'
        : moment
            .duration(vestingTimeUnit?.toString(), 'seconds')
            .humanize(false)}
    </div>
  );
};
