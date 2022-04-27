import { Version } from '@0xflair/contracts-registry';
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
  contractAddress?: string;
  version?: Version;
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
  contractAddress,
  version,
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
    version,
    contractAddress,
  });
  const {
    data: hasRoleData,
    error: hasRoleError,
    isLoading: hasRoleLoading,
  } = useOzHasRole({
    version,
    contractAddress,
    address: minterAddress,
    role: keccak256(toUtf8Bytes('MINTER_ROLE')),
  });

  const isOwner =
    ownerData?.toString().toLowerCase() ===
    minterAddress?.toString().toLowerCase();
  const hasMinterRole = hasRoleData?.toString() === 'true';

  const {
    data: mintByOwnerData,
    error: mintByOwnerError,
    isLoading: mintByOwnerLoading,
    writeAndWait: mintByOwnerWrite,
  } = useOwnerMinter({
    version,
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
    version,
    contractAddress,
    signerOrProvider,
    toAddress,
    mintCount,
  });

  const mintAsAdmin = useCallback(
    (args?: ArgsType) => {
      if (hasMinterRole) {
        mintByRoleWrite(args || ([toAddress, mintCount] as ArgsType));
      } else if (isOwner) {
        mintByOwnerWrite(args || ([toAddress, mintCount] as ArgsType));
      }
    },
    [
      hasMinterRole,
      isOwner,
      mintByOwnerWrite,
      mintByRoleWrite,
      mintCount,
      toAddress,
    ]
  );

  return {
    data: {
      isOwner,
      hasMinterRole,
      ...(mintByOwnerData || mintByRoleData),
    },
    error: mintByOwnerError || mintByRoleError || ownerError || hasRoleError,
    isLoading:
      mintByOwnerLoading || mintByRoleLoading || ownerLoading || hasRoleLoading,
    mintAsAdmin,
  } as const;
};
