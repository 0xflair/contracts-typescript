import { Version } from '@0xflair/contracts-registry';
import { Environment, useAddressOfSigner } from '@0xflair/react-common';
import { useOzHasRole, useOzOwner } from '@0xflair/react-openzeppelin';
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
  signer?: Signer;
  minterAddress?: string;
  toAddress?: BytesLike;
  mintCount?: BigNumberish;
};

/**
 * Consolidated function for minting as admin without paying (either contract owner, or having minter role).
 */
export const useAdminMinter = ({
  contractAddress,
  version,
  signer,
  toAddress,
  mintCount,
}: Config) => {
  const minterAddress = useAddressOfSigner(signer);

  const [{ data: ownerData, error: ownerError, loading: ownerLoading }] =
    useOzOwner({
      contractAddress,
      version,
    });
  const [{ data: hasRoleData, error: hasRoleError, loading: hasRoleLoading }] =
    useOzHasRole({
      contractAddress,
      version,
      address: minterAddress,
      role: keccak256(toUtf8Bytes('MINTER_ROLE')),
    });

  const isOwner =
    ownerData?.toString().toLowerCase() ===
    minterAddress?.toString().toLowerCase();
  const hasMinterRole = hasRoleData?.toString() === 'true';

  const [
    {
      data: mintByOwnerData,
      error: mintByOwnerError,
      loading: mintByOwnerLoading,
    },
    mintByOwnerWrite,
  ] = useOwnerMinter({
    contractAddress,
    version,
    signerOrProvider: signer,
    toAddress,
    mintCount,
  });

  const [
    {
      data: mintByRoleData,
      error: mintByRoleError,
      loading: mintByRoleLoading,
    },
    mintByRoleWrite,
  ] = useRoleBasedMinter({
    contractAddress,
    version,
    signerOrProvider: signer,
    toAddress,
    mintCount,
  });

  const mintAsAdmin = useCallback(
    (args?: { toAddress?: BytesLike; mintCount?: BigNumberish }) => {
      if (hasMinterRole) {
        mintByRoleWrite({
          ...args,
        });
      } else if (isOwner) {
        mintByOwnerWrite({
          ...args,
        });
      }
    },
    [hasMinterRole, isOwner, mintByOwnerWrite, mintByRoleWrite]
  );

  return [
    {
      data: mintByOwnerData || mintByRoleData,
      error: mintByOwnerError || mintByRoleError || ownerError || hasRoleError,
      loading:
        mintByOwnerLoading ||
        mintByRoleLoading ||
        ownerLoading ||
        hasRoleLoading,
    },
    mintAsAdmin,
  ] as const;
};
