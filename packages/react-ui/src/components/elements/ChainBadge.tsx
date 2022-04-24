import { useChainInfo } from '@0xflair/react-common';

import { Badge } from './Badge';

type Props = {
  chainId?: number;
};

export const ChainBadge = ({ chainId }: Props) => {
  const chain = useChainInfo(chainId);
  const explorerUrl =
    (chain?.blockExplorers && chain?.blockExplorers[0].url) ||
    `https://blockscan.com`;

  return (
    <Badge
      text={(chain?.name || chainId || '...').toString()}
      href={explorerUrl}
      color="blue"
    />
  );
};
