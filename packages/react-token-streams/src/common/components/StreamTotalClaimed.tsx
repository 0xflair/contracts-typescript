import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';

import { useStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
};

export const StreamTotalClaimed = ({ className }: Props) => {
  const {
    data: { claimTokenSymbol, totalClaimedAmount },
  } = useStreamClaimingContext();

  return (
    <div className={className}>
      <CryptoValue
        symbol={claimTokenSymbol?.toString()}
        value={totalClaimedAmount}
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </div>
  );
};
