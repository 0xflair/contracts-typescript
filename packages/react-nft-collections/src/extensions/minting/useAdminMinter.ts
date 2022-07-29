import { ContractVersion } from '@0xflair/contracts-registry';
import { Environment } from '@0xflair/react-common';
import { useOzHasRole, useOzOwner } from '@0xflair/react-openzeppelin';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';
import { keccak256, toUtf8Bytes } from 'ethers/lib/utils';
import { useCallback } from 'react';

import { useOwnerMinter } from './useOwnerMinter';
import { useRoleBasedMinter } from './useRoleBasedMinter';

type Config = {
  env?: Environment;
  chainId?: number;
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  minterAddress?: string;
  toAddress?: BytesLike;
  mintCount?: BigNumberish;
};

type ArgsType = [toAddress: BytesLike, mintCount: BigNumberish];

/**
 * Consolidated function for minting as admin without paying (either contract owner, or having minter role).
 */
export const useAdminMinter = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
  minterAddress,
  toAddress,
  mintCount,
}: Config) => {
  const {
    data: ownerData,
    error: ownerError,
    isLoading: ownerLoading,
  } = useOzOwner({
    contractVersion,
    contractAddress,
  });
  const {
    data: hasMinterRole,
    error: hasMinterRoleError,
    isLoading: hasMinterRoleLoading,
  } = useOzHasRole({
    contractVersion,
    contractAddress,
    address: minterAddress,
    role: keccak256(toUtf8Bytes('MINTER_ROLE')),
  });

  const isOwner =
    ownerData?.toString().toLowerCase() ===
    minterAddress?.toString().toLowerCase();

  const {
    data: mintByOwnerData,
    error: mintByOwnerError,
    isLoading: mintByOwnerLoading,
    writeAndWait: mintByOwnerWrite,
  } = useOwnerMinter({
    contractVersion,
    contractAddress,
    signerOrProvider,
    toAddress,
    mintCount,
  });

  const {
    data: mintByRoleData,
    error: mintByRoleError,
    isLoading: mintByRoleLoading,
    writeAndWait: mintByRoleWrite,
  } = useRoleBasedMinter({
    contractVersion,
    contractAddress,
    signerOrProvider,
    toAddress,
    mintCount,
  });

  const mintAsAdmin = useCallback(
    (args?: ArgsType) => {
      if (isOwner) {
        mintByOwnerWrite(args || ([toAddress, mintCount] as ArgsType));
      } else if (hasMinterRole) {
        mintByRoleWrite(args || ([toAddress, mintCount] as ArgsType));
      }
    },
    [
      hasMinterRole,
      isOwner,
      mintByOwnerWrite,
      mintByRoleWrite,
      mintCount,
      toAddress,
    ],
  );

  return {
    data: {
      isOwner,
      hasMinterRole,
      ...(mintByOwnerData.txResponse || mintByOwnerData.txReceipt
        ? mintByOwnerData
        : mintByRoleData),
    },
    error:
      mintByOwnerError || mintByRoleError || ownerError || hasMinterRoleError,
    isLoading:
      mintByOwnerLoading ||
      mintByRoleLoading ||
      ownerLoading ||
      hasMinterRoleLoading,
    mintAsAdmin,
  } as const;
};
