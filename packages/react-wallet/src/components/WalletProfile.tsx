import { classNames } from '@0xflair/react-common';
import Blockies from 'react-blockies';
import {
  useAccount,
  useBalance,
  useEnsAvatar,
  useEnsName,
  useNetwork,
} from 'wagmi';

import { WalletComponentWrapper } from './WalletComponentWrapper';

export type WalletProfileProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;

  showAvatar?: boolean;
  avatarClassName?: string;

  showLabel?: boolean;
  labelClassName?: string;

  showBalance?: boolean;
  balanceClassName?: string;
  balancePrecisionPoints?: number;

  blockieSize?: number;
  blockieScale?: number;
};

export const WalletProfile = ({
  as,
  className,
  showAvatar = true,
  avatarClassName,
  showLabel = true,
  labelClassName,
  showBalance = true,
  balanceClassName,
  balancePrecisionPoints = 4,
  blockieSize = 8,
  blockieScale = 3,
}: WalletProfileProps) => {
  const { activeChain } = useNetwork();
  const { data: account } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: account?.address,
    formatUnits: 'ether',
    watch: false,
  });
  const { data: avatar } = useEnsAvatar({
    addressOrName: account?.address,
    chainId: 1,
  });
  const { data: ens } = useEnsName({
    address: account?.address,
    chainId: 1,
  });

  return (
    <WalletComponentWrapper
      as={as}
      className={classNames('wallet-profile-wrapper', className)}
    >
      {showAvatar ? (
        avatar?.toString() ? (
          <img
            className={
              avatarClassName ||
              'wallet-avatar wallet-avatar--ens h-8 w-8 rounded-full'
            }
            src={avatar?.toString()}
            alt=""
          />
        ) : (
          <Blockies
            seed={account?.address?.toLowerCase() || ''}
            size={blockieSize}
            scale={blockieScale}
            className={'wallet-avatar wallet-avatar--blockies rounded-full'}
          />
        )
      ) : null}
      {showLabel ? (
        <span className={labelClassName || 'wallet-label'}>
          {ens?.toString() ||
            account?.address?.slice(0, 4) + '...' + account?.address?.slice(-4)}
        </span>
      ) : null}
      {showBalance && balance?.value ? (
        <span
          className={
            balanceClassName || 'wallet-balance text-gray-500 truncate'
          }
        >
          {Number(balance.formatted).toFixed(balancePrecisionPoints)}{' '}
          {activeChain?.nativeCurrency?.symbol || balance.symbol}
        </span>
      ) : null}
    </WalletComponentWrapper>
  );
};
