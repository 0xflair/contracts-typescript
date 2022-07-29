import { ContractVersion } from '@0xflair/contracts-registry';
import { useAddressListMerkleProof } from '@0xflair/react-address-lists';
import { Environment, useContractRead } from '@0xflair/react-common';
import { BigNumberish, BytesLike } from 'ethers';

type Config = {
  env?: Environment;
  enabled?: boolean;
  chainId?: number;
  contractVersion?: ContractVersion;
  contractAddress?: string;
  merkleRoot?: BytesLike;
  tierId?: BigNumberish;
  minterAddress?: BytesLike;
};

export const useTierSaleAllowlistChecker = ({
  env = Environment.PROD,
  enabled = true,
  chainId,
  contractVersion,
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
    refetch: merkleProofRefetch,
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
  } = useContractRead<
    boolean,
    [BigNumberish, BytesLike, BigNumberish, BytesLike[]]
  >({
    chainId,
    contractVersion,
    enabled: Boolean(
      readyToRead &&
        tierId !== undefined &&
        minterAddress &&
        merkleMetadata?.maxAllowance !== undefined &&
        merkleProof,
    ),
    contractFqn: 'collections/ERC721/extensions/ERC721TieringExtension',
    functionName: 'onTierAllowlist',
    contractAddress,
    args:
      tierId !== undefined &&
      minterAddress &&
      merkleMetadata?.maxAllowance !== undefined &&
      merkleProof
        ? [tierId, minterAddress, merkleMetadata.maxAllowance, merkleProof]
        : undefined,
  });

  return {
    data: {
      isAllowlisted: isTierAllowlisted,
      merkleProof,
      merkleMetadata,
    },
    error: onTierAllowlistError || merkleProofError,
    isLoading: onTierAllowlistLoading || merkleProofLoading,
    refetch: merkleProofRefetch,
  } as const;
};
