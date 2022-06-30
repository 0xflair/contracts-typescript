import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import moment from 'moment';
import { ReactNode } from 'react';

import { useStreamEmissionRate } from '../hooks/useStreamEmissionRate';
import { useStreamEmissionTimeUnit } from '../hooks/useStreamEmissionTimeUnit';
import { useStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
  separator?: ReactNode;
};

export const StreamEmissionRate = ({
  className,
  separator = <>/</>,
}: Props) => {
  const {
    data: { env, chainId, contractAddress, currentClaimTokenSymbol },
  } = useStreamClaimingContext();

  const { data: emissionRate, isLoading: emissionRateLoading } =
    useStreamEmissionRate({
      env,
      chainId,
      contractAddress,
    });
  const { data: emissionTimeUnit, isLoading: emissionTimeUnitLoading } =
    useStreamEmissionTimeUnit({
      env,
      chainId,
      contractAddress,
    });

  return (
    <div className={className}>
      {emissionRateLoading ? (
        '...'
      ) : (
        <CryptoValue
          symbol={currentClaimTokenSymbol?.toString() || 'Token'}
          value={emissionRate}
          unit={CryptoUnits.WEI}
          showPrice={false}
        />
      )}{' '}
      {separator}{' '}
      {emissionTimeUnitLoading
        ? '...'
        : moment
            .duration(emissionTimeUnit?.toString(), 'seconds')
            .humanize(false)}
    </div>
  );
};
