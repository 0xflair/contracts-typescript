import { CryptoUnits, CryptoValue } from '@flair-sdk/react-coingecko';
import { BareComponentProps } from '@flair-sdk/react-common';
import { Fragment } from 'react';

import { useStreamRewardAmountByToken } from '../hooks/useStreamRewardAmountByToken';
import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';
import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps;

export const StreamRewardAmount = ({ as, ...attributes }: Props) => {
  const {
    data: { chainInfo, env, chainId, contractAddress, selectedTicketTokenIds },
  } = useStreamContext();

  const {
    data: { currentClaimTokenSymbol },
  } = useStreamClaimingContext();

  const {
    data: totalRewardAmountForAccount,
    error: totalRewardAmountForAccountError,
    isLoading: totalRewardAmountForAccountLoading,
  } = useStreamRewardAmountByToken({
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
        value={totalRewardAmountForAccount}
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </Component>
  );
};
