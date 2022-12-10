import { Provider } from '@ethersproject/providers';
import { PrepareWriteContractConfig } from '@wagmi/core';
import { BigNumber, BigNumberish, BytesLike, ethers, Signer } from 'ethers';
import { useCallback, useMemo } from 'react';

import { Environment, ZERO_BYTES32 } from '@flair-sdk/common';

import { useContractWriteAndWait } from '../../../../common';
import { useERC20Allowance, useERC20Approve } from '../../../token';
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

  const isERC20Payment = tier?.currency
    ? Boolean(tier.currency !== ethers.constants.AddressZero)
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
  const _totalAmount = useMemo(
    () =>
      typeof tier?.price !== 'undefined'
        ? BigNumber.from(tier?.price).mul(BigNumber.from(_mintCount))
        : undefined,
    [_mintCount, tier?.price],
  );

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
    data: approveData,
    error: approveError,
    isLoading: approveLoading,
    writeAndWait: approveAndWait,
  } = useERC20Approve({
    contractAddress: tier?.currency?.toString(),
    spender: contractAddress,
    amount: _totalAmount,
    prepare: Boolean(isERC20Payment === true && _totalAmount && minterAddress),
  });

  const {
    data: allowance,
    error: allowanceError,
    isLoading: allowanceLoading,
    call: refetchAllowance,
  } = useERC20Allowance({
    chainId,
    contractAddress: tier?.currency?.toString(),
    holder: minterAddress,
    spender: contractAddress,
    enabled: isERC20Payment === true,
    watch: Boolean(isERC20Payment === true && approveData),
  });

  const isApproveNeeded = Boolean(
    isERC20Payment === true &&
      _totalAmount &&
      allowance &&
      BigNumber.from(allowance).lt(_totalAmount),
  );

  const shouldPrepareMint = Boolean(
    _tierId !== undefined && typeof _totalAmount !== 'undefined',
    //  &&
    // (isERC20Payment === false ||
    //   (_totalAmount && allowance && !isApproveNeeded)),
  );

  const requiredAmounts = useMemo(() => {
    return [
      {
        token: tier?.currency?.toString(),
        accounts: [minterAddress],
        value: _totalAmount,
      },
    ];
  }, [_totalAmount, tier?.currency, minterAddress]);

  const {
    config: mintPreparedConfig,
    data: mintData,
    error: mintError,
    isLoading: mintLoading,
    writeAndWait: mintAndWait,
  } = useContractWriteAndWait<ArgsType>({
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tierId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'count',
            type: 'uint256',
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
        name: 'mintByTier',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    functionName: 'mintByTier',
    contractAddress,
    confirmations: 1,
    args: [_tierId, _mintCount, _maxAllowance, _merkleProof] as ArgsType,
    prepare: shouldPrepareMint,
    overrides: {
      value: !isERC20Payment ? _totalAmount : undefined,
      customData: {
        rampRequiredAmounts: requiredAmounts,
      },
    },
  });

  const mint = useCallback(
    (
      args?: { mintCount: BigNumberish },
      overrides?: Partial<PrepareWriteContractConfig['overrides']>,
    ) => {
      const _finalMintCount = args?.mintCount || _mintCount;
      const _finalTotalAmount = args?.mintCount
        ? tier?.price
          ? BigNumber.from(tier?.price).mul(BigNumber.from(_finalMintCount))
          : undefined
        : _totalAmount;

      const _finalOverrides = {
        ...(overrides || {}),
        customData: {
          rampRequiredAmounts: requiredAmounts,
          ...(overrides?.customData || {}),
        },
      };

      let promise;

      if (!isERC20Payment) {
        promise = mintAndWait?.(
          [_tierId, _finalMintCount, _maxAllowance, _merkleProof] as ArgsType,
          {
            value: _finalTotalAmount,
            ..._finalOverrides,
          },
        );
      } else if (args?.mintCount !== undefined) {
        promise = mintAndWait?.(
          [_tierId, _finalMintCount, _maxAllowance, _merkleProof] as ArgsType,
          _finalOverrides,
        );
      } else {
        promise = mintAndWait?.(undefined, _finalOverrides);
      }

      if (!promise) {
        throw new Error('mintAndWait is not ready');
      }

      return promise.then((result) => {
        return {
          ...result,
          mintCount: _finalMintCount,
          totalAmount: _finalTotalAmount as BigNumberish,
        } as const;
      });
    },
    [
      _maxAllowance,
      _merkleProof,
      _mintCount,
      _tierId,
      _totalAmount,
      isERC20Payment,
      mintAndWait,
      requiredAmounts,
      tier?.price,
    ],
  );

  const approve = useCallback(
    (args?: { mintCount: BigNumberish }) => {
      const _finalMintCount = args?.mintCount || _mintCount;
      const _finalTotalAmount = args?.mintCount
        ? tier?.price
          ? BigNumber.from(tier?.price).mul(BigNumber.from(_finalMintCount))
          : undefined
        : _totalAmount;

      let promise;

      if (args?.mintCount) {
        promise = approveAndWait?.([
          contractAddress as BytesLike,
          _finalTotalAmount as BigNumberish,
        ]);
      } else {
        promise = approveAndWait?.();
      }

      if (!promise) {
        throw new Error('approveAndWait is not ready');
      }

      return promise.then((result) => {
        refetchAllowance();
        return {
          ...result,
          amount: _totalAmount as BigNumberish,
          spender: contractAddress as BytesLike,
        } as const;
      });
    },
    [
      _mintCount,
      _totalAmount,
      approveAndWait,
      contractAddress,
      refetchAllowance,
      tier?.price,
    ],
  );

  return {
    data: {
      requiredAmounts,
      approveResponse: approveData.txResponse,
      approveReceipt: approveData.txReceipt,
      mintPreparedConfig,
      mintResponse: mintData.txResponse,
      mintReceipt: mintData.txReceipt,
      tier,
      start,
      end,
      price: tier?.price,
      totalAmount: _totalAmount,
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
      isApproveNeeded,
      isERC20Payment,
    },
    error: {
      tierError,
      allowlistCheckerError,
      eligibleAmountError,
      allowanceError,
      approveError,
      mintError,
    },
    isLoading: {
      tierLoading,
      allowlistCheckerLoading,
      eligibleAmountLoading,
      allowanceLoading,
      approveLoading,
      mintLoading,
    },
    mint: mintAndWait ? mint : undefined,
    approve: approveAndWait ? approve : undefined,
  } as const;
};
