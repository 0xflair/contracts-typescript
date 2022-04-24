import { loadContract, Version } from '@0xflair/contracts-registry';
import { useAddressListMerkleProof } from '@0xflair/react-address-lists';
import { Environment } from '@0xflair/react-common';
import { BytesLike } from 'ethers';
import { useCallback, useState } from 'react';
import { useContractRead } from 'wagmi';

type Config = {
  env?: Environment;
  chainId?: number;
  contractAddress?: string;
  minterAddress?: BytesLike;
  version?: Version;
  skip?: boolean;
};

export const usePreSaleAllowlistChecker = ({
  env = Environment.PROD,
  chainId,
  contractAddress,
  minterAddress,
  version,
  skip,
}: Config) => {
  const [allowlistState, setAllowlistState] = useState<boolean>();

  const contract = loadContract(
    'collections/ERC721/extensions/ERC721PreSaleExtension',
    version
  );

  const readyToRead = Boolean(
    !skip && minterAddress && contractAddress && chainId
  );

  const [
    { data: proofData, error: proofError, loading: proofLoading },
    fetchProof,
  ] = useAddressListMerkleProof({
    env,
    address: minterAddress,
    treeKey: `${chainId}-${contractAddress}`,
    skip: !readyToRead,
  });

  const [
    {
      data: onPreSaleAllowListData,
      error: onPreSaleAllowListError,
      loading: onPreSaleAllowListLoading,
    },
    onPreSaleAllowListRead,
  ] = useContractRead(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
    },
    'onPreSaleAllowList',
    {
      args: [minterAddress, proofData],
      skip: !readyToRead || !proofData,
      watch: true,
    }
  );

  const onPreSaleAllowList = useCallback(
    (args?: { toAddress: BytesLike }) => {
      setAllowlistState(undefined);
      fetchProof().then((proofResponse) => {
        if (!proofResponse?.data || (!minterAddress && !args?.toAddress)) {
          setAllowlistState(false);
          return false;
        }
        return onPreSaleAllowListRead({
          args: [args?.toAddress || minterAddress, proofResponse?.data],
        })
          .then((result) => {
            if (result.data?.toString() === 'true') {
              setAllowlistState(true);
              return true;
            } else {
              setAllowlistState(false);
              return false;
            }
          })
          .catch(() => {
            setAllowlistState(undefined);
          });
      });
    },
    [minterAddress, fetchProof, onPreSaleAllowListRead]
  );

  return [
    {
      data: {
        isAllowlisted:
          allowlistState || onPreSaleAllowListData?.toString() === 'true',
        allowlistProof: proofData || undefined,
      },
      error: onPreSaleAllowListError || proofError,
      loading: onPreSaleAllowListLoading || proofLoading,
    },
    onPreSaleAllowList,
  ] as const;
};
