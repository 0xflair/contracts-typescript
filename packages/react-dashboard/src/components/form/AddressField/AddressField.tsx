import * as React from 'react';
import { useEffect } from 'react';
import { useEnsResolveName } from 'wagmi';
import { Spinner } from '../../ui';

export type AddressFieldProps = {
  label: string;
  description?: React.ReactNode;
  rawValue: any;
  normalizedValue: any;
  onChange: (rawValue: any, normalizedValue: any) => void;
};

export const AddressField = (props: AddressFieldProps) => {
  const { label, description, rawValue, normalizedValue, onChange } = props;

  const [{ data: ensData, error, loading }] = useEnsResolveName({
    name: rawValue,
  });

  useEffect(() => {
    if (ensData !== normalizedValue) {
      onChange(rawValue, ensData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, ensData]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="0x.... or domain.eth"
          value={rawValue}
          onChange={(event: any) =>
            onChange(event.target.value, normalizedValue)
          }
        />
        {normalizedValue !== rawValue && (
          <div className="absolute top-2 right-0 pr-3 flex items-center pointer-events-none">
            {loading ? (
              <Spinner />
            ) : (
              <span className="text-gray-500 sm:text-sm">
                {normalizedValue}
              </span>
            )}
          </div>
        )}
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};
