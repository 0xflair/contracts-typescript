import { CryptoUnits, CryptoValue } from '@0xflair/react-coingecko';
import moment from 'moment';

import { StreamInformation } from '../../../common/components';
import { useVestedHolderStreamClaimingContext } from '../providers';

type Props = {
  className?: string;
};

export const VestedHolderStreamInformation = ({ className }: Props) => {
  const {
    data: { claimTokenSymbol, totalReleasedAmount, vestingTimeUnit },
  } = useVestedHolderStreamClaimingContext();

  return (
    <StreamInformation className={className}>
      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
        <dt className="flex text-sm text-gray-600">
          <span>Released amount</span>
          <small className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
            (claimable every{' '}
            {moment
              .duration(vestingTimeUnit?.toString(), 'seconds')
              .humanize(false)}
            )
          </small>
        </dt>
        <dd className="text-sm font-medium text-gray-900">
          <CryptoValue
            symbol={claimTokenSymbol?.toString()}
            value={totalReleasedAmount}
            unit={CryptoUnits.WEI}
            showPrice={false}
          />
        </dd>
      </div>
    </StreamInformation>
  );
};
