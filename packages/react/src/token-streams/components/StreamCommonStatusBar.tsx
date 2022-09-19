import { Fragment, PropsWithChildren } from 'react';

import { BareComponentProps } from '../../common';
import { Errors, Spinner } from '../../ui';
import { useStreamContext } from '../providers/StreamProvider';

type Props = PropsWithChildren<BareComponentProps>;

export const StreamCommonStatusBar = ({
  as,
  children,
  ...attributes
}: Props) => {
  const {
    error: { walletNftsError, tokenIdsInCustodyError, streamError },
    isLoading: { walletNftsLoading, tokenIdsInCustodyLoading },
  } = useStreamContext();

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {walletNftsLoading || tokenIdsInCustodyLoading ? (
        <div className="flex items-center gap-2">
          <Spinner /> Loading your NFTs...
        </div>
      ) : null}
      {streamError && <Errors title="streamError" error={streamError} />}
      {walletNftsError && (
        <Errors title="walletNftsError" error={walletNftsError} />
      )}
      {tokenIdsInCustodyError && (
        <Errors title="tokenIdsInCustodyError" error={tokenIdsInCustodyError} />
      )}
      {children}
    </Component>
  );
};
