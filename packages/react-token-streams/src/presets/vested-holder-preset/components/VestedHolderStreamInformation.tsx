import { StreamInformation } from '../../../common/components';
import { VestedHolderStreamReleasedAmount } from './VestedHolderStreamReleasedAmount';
import { VestedHolderStreamTimeUnit } from './VestedHolderStreamTimeUnit';

type Props = {
  className?: string;
};

export const VestedHolderStreamInformation = ({ className }: Props) => {
  return (
    <StreamInformation className={className}>
      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
        <dt className="flex text-sm text-gray-600">
          <span>Released amount</span>
          <small className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
            (claimable <VestedHolderStreamTimeUnit />)
          </small>
        </dt>
        <dd className="text-sm font-medium text-gray-900">
          <VestedHolderStreamReleasedAmount />
        </dd>
      </div>
    </StreamInformation>
  );
};
