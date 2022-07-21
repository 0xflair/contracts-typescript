import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import { useChainInfo } from '@0xflair/react-common';

import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';
import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  className?: string;
  calculationMode?: 'BY_ACCOUNT' | 'OVERALL';
};

export const StreamTotalClaimed = ({
  className,
  calculationMode = 'BY_ACCOUNT',
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

  return (
    <div className={className}>
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
    </div>
  );
};
