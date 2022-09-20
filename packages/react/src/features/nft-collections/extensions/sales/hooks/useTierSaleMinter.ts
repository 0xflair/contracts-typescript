import { Provider } from '@ethersproject/providers';
import { Environment, ZERO_BYTES32 } from '@flair-sdk/common';
import { ContractVersion } from '@flair-sdk/registry';
import { BigNumber, BigNumberish, BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';

import { useContractAbi, useContractWriteAndWait } from '../../../../../common';
import { useTierSaleAllowlistChecker } from './useTierSaleAllowlistChecker';
import { useTierSaleEligibleAmount } from './useTierSaleEligibleAmount';
import { useTierSaleInformation } from './useTierSaleInformation';

type ArgsType = [
  tierId: BigNumberish,
  mintCount: BigNumberish,
  maxAllowance: BigNumberish,
  merkleProof: BytesLike[],
];

type Config = {
  env?: Environment;
  chainId?: number;
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  tierId?: BigNumberish;
  minterAddress?: BytesLike;
  mintCount?: BigNumberish;
  enabled?: boolean;
};

/**
 * Consolidated function for minting of a specific tier.
 */
export const useTierSaleMinter = ({
  env,
  chainId,
  contractAddress,
  signerOrProvider,
  tierId,
  minterAddress,
  mintCount,
  enabled,
}: Config) => {
  const {
    data: tier,
    error: tierError,
    isLoading: tierLoading,
  } = useTierSaleInformation({
    chainId,
    contractAddress,
    tierId,
    enabled,
  });

  const now = new Date();

  const start =
    tier?.start !== undefined
      ? new Date(Number(tier?.start.toString()) * 1000)
      : undefined;
  const end =
    tier?.end !== undefined
      ? new Date(Number(tier?.end.toString()) * 1000)
      : undefined;
  const isActive = start && end ? start <= now && end > now : undefined;
  const hasAllowlist = tier?.merkleRoot
    ? tier.merkleRoot !== ZERO_BYTES32
    : undefined;

  const {
    data: { merkleProof, merkleMetadata, isAllowlisted },
    error: allowlistCheckerError,
    isLoading: allowlistCheckerLoading,
  } = useTierSaleAllowlistChecker({
    env,
    chainId,
    contractAddress,
    enabled: Boolean(
      enabled && minterAddress && hasAllowlist && tier?.merkleRoot,
    ),
    merkleRoot: tier?.merkleRoot,
    tierId,
    minterAddress,
  });

  const {
    data: eligibleAmount,
    error: eligibleAmountError,
    isLoading: eligibleAmountLoading,
  } = useTierSaleEligibleAmount({
    chainId,
    contractAddress,
    tierId,
    minterAddress,
    maxAllowance: merkleMetadata?.maxAllowance || mintCount || 1,
    merkleProof: merkleProof || [],
    enabled: Boolean(
      enabled &&
        minterAddress &&
        (hasAllowlist === false ||
          (hasAllowlist === true && merkleProof !== undefined)) &&
        (merkleMetadata?.maxAllowance || mintCount || 1),
    ),
  });

  const contractInterface = useContractAbi({
    contractFqn: 'collections/ERC721/extensions/ERC721TieringExtension',
  });

  const {
    data: mintData,
    error: mintError,
    isLoading: mintLoading,
    writeAndWait: mintAndWait,
  } = useContractWriteAndWait<ArgsType>({
    contractInterface,
    functionName: 'mintByTier',
    contractAddress,
    signerOrProvider,
    args: [
      tierId,
      mintCount,
      merkleMetadata?.maxAllowance,
      merkleProof,
    ] as ArgsType,
    overrides: {
      value:
        typeof tier?.price !== 'undefined' && mintCount
          ? BigNumber.from(tier?.price).mul(BigNumber.from(mintCount))
          : undefined,
    },
  });

  const mint = useCallback(
    (args?: { mintCount: BigNumberish }) => {
      const count = args?.mintCount || mintCount;
      return mintAndWait(
        [
          tierId,
          count,
          merkleMetadata?.maxAllowance || count || 1,
          merkleProof || [],
        ] as ArgsType,
        {
          value: tier?.price
            ? BigNumber.from(tier?.price).mul(BigNumber.from(count))
            : undefined,
        },
      );
    },
    [
      merkleMetadata?.maxAllowance,
      merkleProof,
      mintAndWait,
      mintCount,
      tier?.price,
      tierId,
    ],
  );

  return {
    data: {
      txResponse: mintData.txResponse,
      txReceipt: mintData.txReceipt,
      tier,
      start,
      end,
      price: tier?.price,
      isActive,
      merkleProof,
      merkleMetadata,
      hasAllowlist,
      isAllowlisted,
      eligibleAmount,
      isEligible:
        eligibleAmount !== undefined
          ? Boolean(
              !eligibleAmountError && Number(eligibleAmount.toString()) > 0,
            )
          : undefined,
    },
    error: {
      tierError,
      allowlistCheckerError,
      eligibleAmountError,
      mintError,
    },
    isLoading: {
      tierLoading,
      allowlistCheckerLoading,
      eligibleAmountLoading,
      mintLoading,
    },
    mint,
  } as const;
};
