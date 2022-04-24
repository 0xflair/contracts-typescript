import { useChainInfo } from '@0xflair/react-common';

type Props = {
  address?: string;
  chainId?: number;
  className?: string;
};

export const AddressScannerLink = ({ className, address, chainId }: Props) => {
  const chain = useChainInfo(chainId);
  const explorerUrl =
    (chain?.blockExplorers && chain?.blockExplorers[0].url) ||
    `https://blockscan.com`;

  return (
    <a
      href={`${explorerUrl}/address/${address}`}
      target={'_blank'}
      className={className}
      rel="noreferrer"
    >
      {address}
    </a>
  );
};
