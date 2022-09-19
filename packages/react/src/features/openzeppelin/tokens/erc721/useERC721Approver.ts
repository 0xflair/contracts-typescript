import { Provider } from '@ethersproject/providers';
import { ContractVersion } from '@flair-sdk/contracts-registry';
import { WriteContractConfig } from '@wagmi/core';
import { BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';

import { useERC721IsApprovedForAll } from './useERC721IsApprovedForAll';
import { useERC721SetApprovalForAll } from './useERC721SetApprovalForAll';

type Config = {
  // Common
  contractAddress?: string;
  contractVersion?: ContractVersion;

  // Read-only
  chainId?: number;
  enabled?: boolean;
  watch?: boolean;
  cacheOnBlock?: boolean;

  // Args
  owner?: BytesLike;
  operator?: BytesLike;

  // Write-only
  signerOrProvider?: Signer | Provider | null;
  writeOverrides?: WriteContractConfig['overrides'];
};

export const useERC721Approver = ({
  contractAddress,
  contractVersion,
  chainId,
  enabled,
  watch,
  cacheOnBlock,
  signerOrProvider,
  owner,
  operator,
  writeOverrides,
}: Config) => {
  const {
    data: isApprovedForAll,
    error: isApprovedForAllError,
    isLoading: isApprovedForAllLoading,
    refetch: fetchIsApprovedForAll,
  } = useERC721IsApprovedForAll({
    chainId,
    contractAddress,
    contractVersion,
    owner,
    operator,
    enabled,
    watch,
    cacheOnBlock,
  });

  const {
    data: setApprovalForAllData,
    error: setApprovalForAllError,
    isLoading: setApprovalForAllLoading,
    writeAndWait,
  } = useERC721SetApprovalForAll({
    contractAddress,
    contractVersion,
    signerOrProvider,
    overrides: writeOverrides,
  });

  const setApprovalForAll = useCallback(
    (approved: boolean = true) => {
      return writeAndWait([operator, approved]).then(() => {
        fetchIsApprovedForAll();
        setTimeout(() => {
          fetchIsApprovedForAll();
        }, 500);
      });
    },
    [fetchIsApprovedForAll, operator, writeAndWait],
  );

  return {
    data: { isApprovedForAll, ...setApprovalForAllData },
    error: setApprovalForAllError || isApprovedForAllError,
    isLoading: setApprovalForAllLoading || isApprovedForAllLoading,
    fetchIsApprovedForAll,
    setApprovalForAll,
  } as const;
};
