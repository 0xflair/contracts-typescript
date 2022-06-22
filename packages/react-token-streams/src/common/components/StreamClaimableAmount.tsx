import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import { BigNumber, BigNumberish } from 'ethers';

import { useStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
  calculationMode?: 'BY_ACCOUNT' | 'OVERALL';
  totalSupply?: BigNumberish;
};

export const StreamClaimableAmount = ({
  className,
  calculationMode = 'BY_ACCOUNT',
  totalSupply = 1,
}: Props) => {
  const {
    data: {
      claimTokenSymbol,
      totalClaimableAmountByAccount,
      totalClaimableAmountUntilNowPerToken,
    },
  } = useStreamClaimingContext();

  return (
    <div className={className}>
      <CryptoValue
        symbol={claimTokenSymbol?.toString()}
        value={
          calculationMode === 'BY_ACCOUNT'
            ? totalClaimableAmountByAccount
            : BigNumber.from(totalSupply).mul(
                totalClaimableAmountUntilNowPerToken || 0
              )
        }
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </div>
  );
};
