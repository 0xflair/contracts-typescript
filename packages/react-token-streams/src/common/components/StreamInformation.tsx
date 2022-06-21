import { StreamClaimableAmount } from './StreamClaimableAmount';
import { StreamEligibleNfts } from './StreamEligibleNfts';
import { StreamTotalClaimed } from './StreamTotalClaimed';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const StreamInformation = ({
  className = 'space-y-4',
  children,
}: Props) => {
  return (
    <dl className={className}>
      <div className="flex items-center justify-between">
        <dt className="flex items-center text-sm text-gray-600">
          <span>Your NFTs</span>
        </dt>
        <dd className="text-sm font-medium text-gray-900">
          <StreamEligibleNfts />
        </dd>
      </div>
      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
        <dt className="flex text-sm text-gray-600">
          <span>Total claimed</span>
          <small className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
            (all previous claims)
          </small>
        </dt>
        <dd className="text-sm font-medium text-gray-900">
          <StreamTotalClaimed />
        </dd>
      </div>
      {children}
      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
        <dt className="text-base font-medium text-gray-900">Claimable now</dt>
        <dd className="text-base font-medium text-gray-900">
          <StreamClaimableAmount />
        </dd>
      </div>
    </dl>
  );
};
