import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { BigNumber, BigNumberish, BytesLike, Signer } from 'ethers';
import { useCallback } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

import { usePreSalePrice } from './usePreSalePrice';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  mintCount?: BigNumberish;
  allowlistProof?: BytesLike[];
};

export const usePreSaleMinter = ({
  contractAddress,
  version,
  signerOrProvider,
  mintCount,
  allowlistProof,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/extensions/ERC721PreSaleExtension',
    version
  );

  const [
    {
      data: preSalePrice,
      error: preSalePriceError,
      loading: preSalePriceLoading,
    },
  ] = usePreSalePrice({
    contractAddress,
    version,
    signerOrProvider,
  });

  const [
    { data: responseData, error: responseError, loading: responseLoading },
    mintPreSaleWrite,
  ] = useContractWrite(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'mintPreSale'
  );

  const [{ data: receiptData, error: receiptError, loading: receiptLoading }] =
    useWaitForTransaction({
      hash: responseData?.hash,
      confirmations: 2,
    });

  const mintPreSale = useCallback(
    async (args?: {
      mintCount?: BigNumberish;
      allowlistProof?: BytesLike[];
    }) => {
      const response = await mintPreSaleWrite({
        args: [
          args?.mintCount || mintCount,
          args?.allowlistProof || allowlistProof,
        ],
        overrides: {
          value: BigNumber.from(preSalePrice).mul(
            BigNumber.from(args?.mintCount || mintCount)
          ),
        },
      });

      const receipt = await response.data?.wait(1);

      return { response, receipt };
    },
    [mintPreSaleWrite, preSalePrice, mintCount, allowlistProof]
  );

  return [
    {
      data: {
        preSalePrice,
        txResponse: responseData,
        txReceipt: receiptData,
      },
      error: preSalePriceError || responseError || receiptError,
      loading: preSalePriceLoading || responseLoading || receiptLoading,
    },
    mintPreSale,
  ] as const;
};
