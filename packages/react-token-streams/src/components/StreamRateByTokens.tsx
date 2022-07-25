import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';

import { useStreamRateByToken } from '../hooks';
import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';
import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  className?: string;
};

export const StreamRateByTokens = ({ className }: Props) => {
  const {
    data: { chainInfo, env, chainId, contractAddress, ticketTokenIds },
  } = useStreamContext();

  const {
    data: { currentClaimTokenSymbol },
  } = useStreamClaimingContext();

  const { data: rateByTokens } = useStreamRateByToken({
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
        value={rateByTokens}
        unit={CryptoUnits.WEI}
        showPrice={false}
      />
    </div>
  );
};
