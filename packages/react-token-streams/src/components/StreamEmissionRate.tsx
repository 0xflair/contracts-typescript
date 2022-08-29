import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import { BareComponentProps } from '@0xflair/react-common';
import moment from 'moment';
import { Fragment, ReactNode } from 'react';

import { useStreamEmissionRate } from '../hooks/useStreamEmissionRate';
import { useStreamEmissionTimeUnit } from '../hooks/useStreamEmissionTimeUnit';
import { useStreamClaimingContext } from '../providers';
import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps & {
  separator?: ReactNode;
};

export const StreamEmissionRate = ({
  as,
  separator = <>/</>,
  ...attributes
}: Props) => {
  const {
    data: { env, chainId, contractAddress },
  } = useStreamContext();
  const {
    data: { currentClaimTokenSymbol },
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

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
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
    </Component>
  );
};
