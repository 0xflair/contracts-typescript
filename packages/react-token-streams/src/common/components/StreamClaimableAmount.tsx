import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';

import { useStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
};

export const StreamClaimableAmount = ({ className }: Props) => {
  const {
    data: { claimTokenSymbol, totalClaimableAmountByAccount },
  } = useStreamClaimingContext();

  return (
    <div className={className}>
      <CryptoValue
        symbol={claimTokenSymbol?.toString()}
        value={totalClaimableAmountByAccount}
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </div>
  );
};
