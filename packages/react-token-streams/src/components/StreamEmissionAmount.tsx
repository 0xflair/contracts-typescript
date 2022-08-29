import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useStreamEmissionAmountUntil } from '../hooks';
import { useStreamClaimingContext } from '../providers';
import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps;

export const StreamEmissionAmount = ({ as, ...attributes }: Props) => {
  const {
    data: { chainInfo, env, chainId, contractAddress },
  } = useStreamContext();

  const {
    data: { currentClaimTokenSymbol },
  } = useStreamClaimingContext();

  const {
    data: totalEmissionAmountUntilNow,
    error: totalEmissionAmountUntilNowError,
    isLoading: totalEmissionAmountUntilNowLoading,
  } = useStreamEmissionAmountUntil({
    env,
    chainId,
    contractAddress,
    args: {
      calculateUntil: Math.floor(+new Date() / 1000),
    },
  });

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      <CryptoValue
        symbol={
          currentClaimTokenSymbol?.toString() ||
          chainInfo?.nativeCurrency?.symbol
        }
        value={totalEmissionAmountUntilNow}
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </Component>
  );
};
