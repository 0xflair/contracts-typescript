import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';

import { useStreamEmissionAmountUntil } from '../hooks';
import { useStreamClaimingContext } from '../providers';
import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  className?: string;
};

export const StreamEmissionAmount = ({ className }: Props) => {
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

  return (
    <div className={className}>
      <CryptoValue
        symbol={
          currentClaimTokenSymbol?.toString() ||
          chainInfo?.nativeCurrency?.symbol
        }
        value={totalEmissionAmountUntilNow}
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </div>
  );
};
