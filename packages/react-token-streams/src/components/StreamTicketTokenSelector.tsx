import { BareComponentProps } from '@0xflair/react-common';
import { Fragment } from 'react';

import { useStreamContext } from '../providers/StreamProvider';

type Props = BareComponentProps;

export const StreamTicketTokenSelector = ({ as, ...attributes }: Props) => {
  const {
    data: {
      ticketTokens,
      selectedTicketTokenIds,
      selectedTicketTokens,
      ticketTokenSymbol,
    },
    setSelectedTicketTokens,
  } = useStreamContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {ticketTokens?.map((token) => (
        <div
          key={token.tokenId}
          className="ticket-token relative flex gap-2 items-start py-4"
        >
          <div className="token-checkbox flex items-center h-5">
            <input
              id={`token-${token.tokenId}`}
              name={`token-${token.tokenId}`}
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              checked={Boolean(
                selectedTicketTokenIds?.find(
                  (t) => t.toString() === token.tokenId?.toString(),
                ),
              )}
              onChange={(e) => {
                const { checked } = e.target;
                if (checked) {
                  if (
                    !selectedTicketTokens?.find(
                      (t) =>
                        t.tokenId?.toString() === token.tokenId?.toString(),
                    )
                  ) {
                    setSelectedTicketTokens([
                      ...(selectedTicketTokens || []),
                      token,
                    ]);
                  }
                } else {
                  setSelectedTicketTokens(
                    selectedTicketTokens?.filter(
                      (t) =>
                        t.tokenId?.toString() !== token.tokenId?.toString(),
                    ) || [],
                  );
                }
              }}
            />
          </div>
          <div className="token-label text-sm">
            <label
              htmlFor={`token-${token.tokenId}`}
              className="font-medium text-gray-700 select-none"
            >
              {ticketTokenSymbol?.toString()} # {token.tokenId?.toString()}
            </label>
          </div>
        </div>
      ))}
    </Component>
  );
};
