import { loadContract, Version } from '@0xflair/contracts-registry';
import { BytesLike } from '@ethersproject/bytes';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { useCallback } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
};

export const usePlaceholderUriUpdater = ({
  contractAddress,
  version,
  signerOrProvider,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
    version
  );

  const [
    { data: responseData, error: responseError, loading: responseLoading },
    setPlaceholderUriWrite,
  ] = useContractWrite(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'setPlaceholderURI'
  );

  const [{ data: receiptData, error: receiptError, loading: receiptLoading }] =
    useWaitForTransaction({
      hash: responseData?.hash,
      confirmations: 2,
    });

  const setPlaceholderUri = useCallback(
    async (newValue: BytesLike) => {
      const response = await setPlaceholderUriWrite({
        args: [newValue],
      });

      const receipt = await response.data?.wait(1);

      return { response, receipt };
    },
    [setPlaceholderUriWrite]
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
    setPlaceholderUri,
  ] as const;
};
