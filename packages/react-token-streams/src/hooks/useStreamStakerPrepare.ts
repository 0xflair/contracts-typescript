import {
  Environment,
  useChainId,
  useHasAnyOfFeatures,
} from '@0xflair/react-common';
import { useERC721Approver } from '@0xflair/react-openzeppelin';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

type Config = {
  env?: Environment;
  chainId?: number;
  streamContractAddress?: string;
  ticketTokenAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const useStreamStakerPrepare = ({
  env,
  chainId: chainId_,
  streamContractAddress,
  ticketTokenAddress,
}: Config) => {
  const chainId = useChainId(chainId_);
  const [needsPrepare, setNeedsPrepare] = useState<boolean>();

  const {
    data: hasCustodialStaking,
    isLoading: hasCustodialStakingLoading,
    error: hasCustodialStakingError,
  } = useHasAnyOfFeatures({
    env,
    chainId,
    contractAddress: streamContractAddress,
    tags: ['flair_stream_custodial_staking_extension'],
  });

  const erc721Approver = useERC721Approver({
    contractAddress: ticketTokenAddress,
    operator: streamContractAddress,
  });

  const prepare = useCallback(async () => {
    if (hasCustodialStaking) {
      return erc721Approver.setApprovalForAll(true);
    }
  }, [erc721Approver, hasCustodialStaking]);

  useEffect(() => {
    if (hasCustodialStaking === undefined) {
      return;
    }

    if (hasCustodialStaking) {
      if (!erc721Approver.data?.isApprovedForAll) {
        setNeedsPrepare(true);
      }
    }

    if (needsPrepare) {
      setNeedsPrepare(false);
    }
  }, [
    erc721Approver.data?.isApprovedForAll,
    hasCustodialStaking,
    needsPrepare,
  ]);

  return {
    data: { needsPrepare, ...erc721Approver.data },
    isLoading: hasCustodialStakingLoading || erc721Approver.isLoading,
    error: hasCustodialStakingError || erc721Approver.error,
    prepare,
  } as const;
};
