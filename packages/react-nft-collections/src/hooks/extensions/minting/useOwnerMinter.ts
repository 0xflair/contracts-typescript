import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  toAddress?: BytesLike;
  mintCount?: BigNumberish;
};

export const useOwnerMinter = ({
  contractAddress,
  version,
  signerOrProvider,
  toAddress,
  mintCount,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/extensions/ERC721OwnerMintExtension',
    version
  );

  const [
    { data: responseData, error: responseError, loading: responseLoading },
    mintByOwnerWrite,
  ] = useContractWrite(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'mintByOwner'
  );

  const [{ data: receiptData, error: receiptError, loading: receiptLoading }] =
    useWaitForTransaction({
      hash: responseData?.hash,
      confirmations: 2,
    });

  const mintByOwner = useCallback(
    async (args?: { toAddress?: BytesLike; mintCount?: BigNumberish }) => {
      const response = await mintByOwnerWrite({
        args: [args?.toAddress || toAddress, args?.mintCount || mintCount],
      });

      const receipt = await response.data?.wait(1);

      return { response, receipt };
    },
    [mintByOwnerWrite, toAddress, mintCount]
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
    mintByOwner,
  ] as const;
};
