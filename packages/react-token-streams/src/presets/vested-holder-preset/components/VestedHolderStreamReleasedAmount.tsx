import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';

import { useVestedHolderStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
};

export const VestedHolderStreamReleasedAmount = ({ className }: Props) => {
  const {
    data: { claimTokenSymbol, totalReleasedAmount },
  } = useVestedHolderStreamClaimingContext();

  return (
    <div className={className}>
      <CryptoValue
        symbol={claimTokenSymbol?.toString()}
        value={totalReleasedAmount}
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </div>
  );
};
