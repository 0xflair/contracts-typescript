import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';

import { useStreamRewardAmountByToken } from '../hooks/useStreamRewardAmountByToken';
import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';
import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  className?: string;
};

export const StreamRewardAmount = ({ className }: Props) => {
  const {
    data: { chainInfo, env, chainId, contractAddress, ticketTokenIds },
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
      ticketTokenIds,
    },
  });

  return (
    <div className={className}>
      <CryptoValue
        symbol={
          currentClaimTokenSymbol?.toString() ||
          chainInfo?.nativeCurrency?.symbol
        }
        value={totalRewardAmountForAccount}
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </div>
  );
};
