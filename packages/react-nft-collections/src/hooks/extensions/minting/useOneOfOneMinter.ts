import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  toAddress?: string;
  mintCount?: string;
  tokenURIs?: string;
};

export const useOneOfOneMinter = ({
  contractAddress,
  version,
  signerOrProvider,
  toAddress,
  mintCount,
  tokenURIs,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/extensions/ERC721OneOfOneMintExtension',
    version
  );

  const [
    { data: responseData, error: responseError, loading: responseLoading },
    mintWithTokenURIsByOwnerWrite,
  ] = useContractWrite(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'mintWithTokenURIsByOwner'
  );

  const [{ data: receiptData, error: receiptError, loading: receiptLoading }] =
    useWaitForTransaction({
      hash: responseData?.hash,
      confirmations: 2,
    });

  const mintWithTokenURIsByOwner = useCallback(
    async (args: {
      toAddress?: BytesLike;
      mintCount?: BigNumberish;
      tokenURIs?: BytesLike[];
    }) => {
      const response = await mintWithTokenURIsByOwnerWrite({
        args: [
          args.toAddress || toAddress,
          args.mintCount || mintCount,
          args.tokenURIs || tokenURIs,
        ],
      });

      const receipt = await response.data?.wait(1);

      return { response, receipt };
    },
    [mintWithTokenURIsByOwnerWrite, toAddress, mintCount, tokenURIs]
  );

  return [
    {
      data: {
        txResponse: responseData,
        txReceipt: receiptData,
      },
      error: responseError || receiptError,
      loading: responseLoading || receiptLoading,
    },
    mintWithTokenURIsByOwner,
  ] as const;
};
