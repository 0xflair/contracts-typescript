import { Provider } from '@ethersproject/providers';
import { Environment, ZERO_BYTES32 } from '@flair-sdk/common';
import { BigNumber, BigNumberish, BytesLike, Signer } from 'ethers';
import { useCallback, useMemo } from 'react';

import { useContractWriteAndWait } from '../../../../common';
import { useSaleTierConfig } from './useSaleTierConfig';
import { useTieredSalesAllowlistChecker } from './useTieredSalesAllowlistChecker';
import { useTieredSalesEligibleAmount } from './useTieredSalesEligibleAmount';

type ArgsType = [
  tierId: BigNumberish,
  mintCount: BigNumberish,
  maxAllowance: BigNumberish,
  merkleProof: BytesLike[],
];

type Config = {
  env?: Environment;
  chainId?: number;
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
export const useTieredSalesMinter = ({
  env,
  chainId,
  contractAddress,
  signerOrProvider,
  tierId,
  minterAddress,
  mintCount,
  enabled = true,
}: Config) => {
  const {
    data: tier,
    error: tierError,
    isLoading: tierLoading,
  } = useSaleTierConfig({
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
  } = useTieredSalesAllowlistChecker({
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

  const _tierId = tierId;
  const _mintCount = mintCount || 1;
  const _maxAllowance = merkleMetadata?.maxAllowance || _mintCount;
  const _merkleProof = useMemo(() => merkleProof || [], [merkleProof]);

  const {
    data: eligibleAmount,
    error: eligibleAmountError,
    isLoading: eligibleAmountLoading,
  } = useTieredSalesEligibleAmount({
    chainId,
    contractAddress,
    tierId,
    minterAddress,
    maxAllowance: _maxAllowance,
    merkleProof: merkleProof || [],
    enabled: Boolean(
      enabled &&
        minterAddress &&
        (hasAllowlist === false ||
          (hasAllowlist === true && merkleProof !== undefined)) &&
        _maxAllowance,
    ),
  });

  const {
    data: mintData,
    error: mintError,
    isLoading: mintLoading,
    writeAndWait: mintAndWait,
  } = useContractWriteAndWait<ArgsType>({
    contractInterface: [
      'function mintByTier(uint256 tierId,uint256 count,uint256 maxAllowance,bytes32[] calldata proof) external payable',
    ],
    functionName: 'mintByTier',
    contractAddress,
    signerOrProvider,
    confirmations: 1,
    args: [_tierId, _mintCount, _maxAllowance, _merkleProof] as ArgsType,
    prepare: Boolean(
      _tierId !== undefined && typeof tier?.price !== 'undefined',
    ),
    overrides: {
      value:
        typeof tier?.price !== 'undefined'
          ? BigNumber.from(tier?.price).mul(BigNumber.from(_mintCount))
          : undefined,
    },
  });

  const mint = useCallback(
    (args?: { mintCount: BigNumberish }) => {
      if (args?.mintCount !== undefined) {
        const _finalMintCount = args?.mintCount || _mintCount;
        return mintAndWait?.(
          [_tierId, _finalMintCount, _maxAllowance, _merkleProof] as ArgsType,
          {
            value: tier?.price
              ? BigNumber.from(tier?.price).mul(BigNumber.from(_finalMintCount))
              : undefined,
          },
        );
      } else {
        return mintAndWait?.();
      }
    },
    [
      _maxAllowance,
      _merkleProof,
      _mintCount,
      _tierId,
      mintAndWait,
      tier?.price,
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
    mint: mintAndWait ? mint : undefined,
  } as const;
};
