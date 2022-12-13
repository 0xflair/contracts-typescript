import { Environment } from '@flair-sdk/common';
import { BigNumberish, BytesLike } from 'ethers';
import { useCallback } from 'react';

import { useContractRead } from '../../../../common/hooks/useContractRead';
import { useAddressListMerkleProof } from '../../../../core/address-lists';

type Config = {
  env?: Environment;
  enabled?: boolean;
  chainId?: number;
  contractAddress?: string;
  merkleRoot?: BytesLike;
  tierId?: BigNumberish;
  minterAddress?: BytesLike;
};

export const useTieredSalesAllowlistChecker = ({
  env = Environment.PROD,
  enabled = true,
  chainId,
  contractAddress,
  merkleRoot,
  tierId,
  minterAddress,
}: Config) => {
  const readyToRead = Boolean(
    tierId !== undefined &&
      enabled &&
      minterAddress &&
      contractAddress &&
      chainId,
  );

  const {
    data: { merkleProof, merkleMetadata },
    error: merkleProofError,
    isLoading: merkleProofLoading,
    refetch: refetchMerkleProof,
    call: getMerkleProof,
  } = useAddressListMerkleProof({
    env,
    address: minterAddress,
    rootHash: merkleRoot,
    enabled: readyToRead,
  });

  const {
    data: isTierAllowlisted,
    error: onTierAllowlistError,
    isLoading: onTierAllowlistLoading,
    refetch: refetchOnTierAllowlist,
    call: callOnTierAllowlist,
  } = useContractRead<
    boolean,
    [BigNumberish, BytesLike, BigNumberish, BytesLike[]]
  >({
    chainId,
    contractAddress,
    enabled: Boolean(
      readyToRead &&
        tierId !== undefined &&
        minterAddress &&
        merkleMetadata?.maxAllowance !== undefined &&
        merkleProof,
    ),
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tierId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'minter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'maxAllowance',
            type: 'uint256',
          },
          {
            internalType: 'bytes32[]',
            name: 'proof',
            type: 'bytes32[]',
          },
        ],
        name: 'onTierAllowlist',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'onTierAllowlist(uint256,address,uint256,bytes32[])',
    cacheOnBlock: false,
    cacheTime: 24 * 60 * 60 * 1000,
    staleTime: 0,
    args:
      tierId !== undefined &&
      minterAddress &&
      merkleMetadata?.maxAllowance !== undefined &&
      merkleProof
        ? [tierId, minterAddress, merkleMetadata.maxAllowance, merkleProof]
        : undefined,
  });

  const refetch = useCallback(
    () => refetchMerkleProof().then(() => refetchOnTierAllowlist()),
    [refetchMerkleProof, refetchOnTierAllowlist],
  );

  const call = useCallback(
    async (overrides?: {
      merkleRoot?: BytesLike;
      tierId?: BigNumberish;
      minterAddress?: BytesLike;
    }) => {
      const minterAddressFinal =
        overrides?.minterAddress !== undefined
          ? overrides?.minterAddress
          : minterAddress;
      const merkleRootFinal =
        overrides?.merkleRoot !== undefined
          ? overrides?.merkleRoot
          : merkleRoot;
      const tierIdFinal =
        overrides?.tierId !== undefined ? overrides?.tierId : tierId;

      const proof = await getMerkleProof({
        address: minterAddressFinal,
        rootHash: merkleRootFinal,
      });

      const merkleProofFinal = proof?.merkleProof || merkleProof;
      const merkleMetadataFinal = proof?.merkleMetadata || merkleMetadata;
      const maxAllowanceFinal = merkleMetadataFinal?.maxAllowance;

      if (
        proof == undefined ||
        tierIdFinal == undefined ||
        minterAddressFinal == undefined ||
        maxAllowanceFinal == undefined ||
        merkleProofFinal == undefined
      ) {
        return {};
      }

      const response = await callOnTierAllowlist({
        args: [
          tierIdFinal as BigNumberish,
          minterAddressFinal as BytesLike,
          maxAllowanceFinal as BigNumberish,
          merkleProofFinal as BytesLike[],
        ],
      });

      return {
        isAllowlisted: response,
        merkleMetadata: merkleMetadataFinal,
        merkleProof: merkleProofFinal,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // callOnTierAllowlist,
      // getMerkleProof,
      merkleMetadata,
      merkleProof,
      merkleRoot,
      minterAddress,
      tierId,
    ],
  );

  return {
    data: {
      isAllowlisted: isTierAllowlisted,
      merkleProof,
      merkleMetadata,
    },
    error: onTierAllowlistError || merkleProofError,
    isLoading: onTierAllowlistLoading || merkleProofLoading,
    refetch,
    call,
  } as const;
};
