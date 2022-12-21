import { classNames } from '@flair-sdk/common';
import * as Identicon from 'react-blockies';
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
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    formatUnits: 'ether',
    watch: false,
  });
  const { data: avatar } = useEnsAvatar({
    address,
    chainId: 1,
  });
  const { data: ens } = useEnsName({
    address: address,
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
          <>
            <Identicon.default
              seed={address?.toLowerCase() || ''}
              size={blockieSize}
              scale={blockieScale}
              className={'wallet-avatar wallet-avatar--blockies rounded-full'}
            />
          </>
        )
      ) : null}
      {showLabel ? (
        <span
          className={labelClassName || 'wallet-label hidden sm:inline-block'}
        >
          {ens?.toString() || address?.slice(0, 4) + '...' + address?.slice(-4)}
        </span>
      ) : null}
      {showBalance && balance?.value ? (
        <span
          className={
            balanceClassName ||
            'wallet-balance text-gray-500 truncate hidden md:inline-block'
          }
        >
          {Number(balance.formatted).toFixed(balancePrecisionPoints)}{' '}
          {chain?.nativeCurrency?.symbol || balance.symbol}
        </span>
      ) : null}
    </WalletComponentWrapper>
  );
};
