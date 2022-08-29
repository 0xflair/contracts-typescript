import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useStreamRateByToken } from '../hooks';
import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';
import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps;

export const StreamRateByTokens = ({ as, ...attributes }: Props) => {
  const {
    data: { chainInfo, env, chainId, contractAddress, selectedTicketTokenIds },
  } = useStreamContext();

  const {
    data: { currentClaimTokenSymbol },
  } = useStreamClaimingContext();

  const { data: rateByTokens } = useStreamRateByToken({
    env,
    chainId,
    contractAddress,
    args: {
      ticketTokenIds: selectedTicketTokenIds,
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
        value={rateByTokens}
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </Component>
  );
};
