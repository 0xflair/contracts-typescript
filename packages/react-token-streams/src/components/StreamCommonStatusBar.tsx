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
    error: { walletNftsError, streamError },
    isLoading: { walletNftsLoading },
  } = useStreamContext();

  return (
    <div className={className}>
      {walletNftsLoading && (
        <div className="flex items-center gap-2">
          <Spinner /> Loading your NFTs...
        </div>
      )}
      {streamError && <Errors title="streamError" error={streamError} />}
      {walletNftsError && <Errors title="walletNftsError" error={walletNftsError} />}
      {children}
    </div>
  );
};
