import { Errors, Spinner } from '@0xflair/react-ui';

import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const StreamCommonStatusBar = ({
  className = 'flex flex-col gap-2',
  children,
}: Props) => {
  const {
    error: { walletNftsError, tokenIdsInCustodyError, streamError },
    isLoading: { walletNftsLoading, tokenIdsInCustodyLoading },
  } = useStreamContext();

  return (
    <div className={className}>
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
    </div>
  );
};
