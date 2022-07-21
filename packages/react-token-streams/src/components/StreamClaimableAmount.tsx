import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import { useChainInfo } from '@0xflair/react-common';
import { BigNumber } from 'ethers';

import { useStreamClaimingContext } from '../providers';
import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  className?: string;
  calculationMode?: 'BY_ACCOUNT' | 'OVERALL';
};

export const StreamClaimableAmount = ({
  className,
  calculationMode = 'BY_ACCOUNT',
}: Props) => {
  const {
    data: { chainInfo },
  } = useStreamContext();
  const {
    data: {
      totalClaimableAmountByAccount,
      totalSupplyAmountOverall,
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
            ? totalClaimableAmountByAccount
            : BigNumber.from(totalSupplyAmountOverall || 0)?.sub(
                totalClaimedAmountOverall?.toString() || 0,
              )
        }
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </div>
  );
};
