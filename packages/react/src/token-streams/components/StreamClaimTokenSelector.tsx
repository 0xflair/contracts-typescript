import { classNames } from '@flair-sdk/common';
import { RadioGroup } from '@headlessui/react';

import { BareComponentProps } from '../../common';
import { useStreamClaimingContext } from '../providers/StreamClaimingProvider';
import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps;

export const StreamClaimTokenSelector = ({ as, ...attributes }: Props) => {
  const {
    data: { tokenBalances },
  } = useStreamContext();

  const {
    data: { currentClaimTokenAddress },
    setCurrentClaimTokenAddress,
  } = useStreamClaimingContext();

  return (
    <RadioGroup
      as={as}
      value={currentClaimTokenAddress?.toString()}
      {...attributes}
      onChange={(v) => setCurrentClaimTokenAddress(v.toString())}
    >
      <div className="flex flex-wrap gap-3">
        {tokenBalances
          ? tokenBalances.map((token) => (
              <RadioGroup.Option
                key={token.symbol}
                value={token.tokenAddress}
                className={({ active, checked }) =>
                  classNames(
                    'cursor-pointer focus:outline-none',
                    checked ? 'border-transparent' : 'border-gray-300',
                    active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                    'relative block bg-white border rounded-lg shadow-sm px-3 py-2 cursor-pointer sm:flex sm:justify-between focus:outline-none',
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <RadioGroup.Label
                      as="span"
                      className={'flex items-center gap-2 whitespace-nowrap'}
                      title={token.tokenAddress}
                    >
                      {token.icon && (
                        <img
                          className="w-6 h-6 rounded-full"
                          src={token.icon}
                        />
                      )}
                      <span className="flex flex-col text-sm font-medium text-gray-900">
                        {token.name}{' '}
                        <small className="text-xs">({token.symbol})</small>
                      </span>
                    </RadioGroup.Label>
                    <span
                      className={classNames(
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-500' : 'border-transparent',
                        'absolute -inset-px rounded-lg pointer-events-none',
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))
          : '...'}
      </div>
    </RadioGroup>
  );
};
