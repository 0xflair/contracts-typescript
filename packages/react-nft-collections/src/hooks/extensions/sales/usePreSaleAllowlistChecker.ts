import { ContractVersion } from '@0xflair/contracts-registry';
import { useAddressListMerkleProof } from '@0xflair/react-address-lists';
import { Environment, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';

type Config = {
  env?: Environment;
  enabled?: boolean;
  chainId?: number;
  version?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  minterAddress?: BytesLike;
};

export const usePreSaleAllowlistChecker = ({
  env = Environment.PROD,
  enabled = true,
  chainId,
  version,
  contractAddress,
  signerOrProvider,
  minterAddress,
}: Config) => {
  const readyToRead = Boolean(
    enabled && minterAddress && contractAddress && chainId
  );

  const {
    data: proofData,
    error: proofError,
    isLoading: proofLoading,
    sendRequest: fetchProof,
  } = useAddressListMerkleProof({
    env,
    address: minterAddress,
    treeKey: `${chainId}-${contractAddress}`,
    enabled: readyToRead,
  });

  const {
    data: isPreSaleAllowListed,
    error: onPreSaleAllowListError,
    isLoading: onPreSaleAllowListLoading,
    refetch: onPreSaleAllowListRead,
  } = useContractRead<boolean>({
    version,
    enabled: Boolean(readyToRead && proofData),
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'onPreSaleAllowList',
    contractAddress,
    signerOrProvider,
    args: [minterAddress, proofData],
  });

  const onPreSaleAllowList = useCallback(() => {
    fetchProof().then(() => {
      return onPreSaleAllowListRead();
    });
  }, [fetchProof, onPreSaleAllowListRead]);

  return {
    data: {
      isAllowlisted: isPreSaleAllowListed,
      allowlistProof: proofData || undefined,
    },
    error: onPreSaleAllowListError || proofError,
    isLoading: onPreSaleAllowListLoading || proofLoading,
    reCheck: onPreSaleAllowList,
  } as const;
};
