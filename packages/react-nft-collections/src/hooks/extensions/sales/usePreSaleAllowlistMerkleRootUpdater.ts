import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
};

export const usePreSaleAllowlistMerkleRootUpdater = ({
  contractAddress,
  version,
  signerOrProvider,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/extensions/ERC721PreSaleExtension',
    version
  );

  const [
    { data: responseData, error: responseError, loading: responseLoading },
    setPreSaleAllowlistMerkleRootWrite,
  ] = useContractWrite(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'setPreSaleAllowlistMerkleRootPrice'
  );

  const [{ data: receiptData, error: receiptError, loading: receiptLoading }] =
    useWaitForTransaction({
      hash: responseData?.hash,
      confirmations: 2,
    });

  const setPreSaleAllowlistMerkleRoot = useCallback(
    async (newValue: BytesLike) => {
      const response = await setPreSaleAllowlistMerkleRootWrite({
        args: [newValue],
      });

      const receipt = await response.data?.wait(1);

      return { response, receipt };
    },
    [setPreSaleAllowlistMerkleRootWrite]
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
    setPreSaleAllowlistMerkleRoot,
  ] as const;
};
