import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';
import { useCallback } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
};

export const usePublicSalePriceUpdater = ({
  contractAddress,
  version,
  signerOrProvider,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/extensions/ERC721PublicSaleExtension',
    version
  );

  const [
    { data: responseData, error: responseError, loading: responseLoading },
    setPublicSalePriceWrite,
  ] = useContractWrite(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'setPublicSalePrice'
  );

  const [{ data: receiptData, error: receiptError, loading: receiptLoading }] =
    useWaitForTransaction({
      hash: responseData?.hash,
      confirmations: 2,
    });

  const setPublicSalePrice = useCallback(
    async (newPrice: BigNumberish) => {
      const response = await setPublicSalePriceWrite({
        args: [newPrice],
      });

      const receipt = await response.data?.wait(1);

      return { response, receipt };
    },
    [setPublicSalePriceWrite]
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
    setPublicSalePrice,
  ] as const;
};
