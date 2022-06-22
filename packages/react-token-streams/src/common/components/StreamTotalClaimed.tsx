import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';

import { useStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
  calculationMode?: 'BY_ACCOUNT' | 'OVERALL';
};

export const StreamTotalClaimed = ({
  className,
  calculationMode = 'BY_ACCOUNT',
}: Props) => {
  const {
    data: {
      claimTokenSymbol,
      totalClaimedAmountByAccount,
      totalClaimedAmountOverall,
    },
  } = useStreamClaimingContext();

  return (
    <div className={className}>
      <CryptoValue
        symbol={claimTokenSymbol?.toString()}
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
