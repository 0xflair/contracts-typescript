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
    error: { nftsError, streamError },
    isLoading: { nftsLoading },
  } = useStreamContext();

  return (
    <div className={className}>
      {nftsLoading && (
        <div className="flex items-center gap-2">
          <Spinner /> Loading your NFTs...
        </div>
      )}
      {streamError && <Errors title="streamError" error={streamError} />}
      {nftsError && <Errors title="nftsError" error={nftsError} />}
      {children}
    </div>
  );
};
