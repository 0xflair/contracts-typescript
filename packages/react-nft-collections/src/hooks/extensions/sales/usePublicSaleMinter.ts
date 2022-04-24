import { loadContract, Version } from '@0xflair/contracts-registry';
import { Provider } from '@ethersproject/providers';
import { BigNumber, BigNumberish, Signer } from 'ethers';
import { useCallback } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

import { usePublicSalePrice } from './usePublicSalePrice';

type Config = {
  contractAddress?: string;
  version?: Version;
  signerOrProvider?: Signer | Provider;
  mintCount?: BigNumberish;
};

export const usePublicSaleMinter = ({
  contractAddress,
  version,
  signerOrProvider,
  mintCount,
}: Config) => {
  const contract = loadContract(
    'collections/ERC721/extensions/ERC721PublicSaleExtension',
    version
  );

  const [
    {
      data: publicSalePrice,
      error: publicSalePriceError,
      loading: publicSalePriceLoading,
    },
  ] = usePublicSalePrice({
    contractAddress,
    version,
    signerOrProvider,
  });

  const [
    { data: responseData, error: responseError, loading: responseLoading },
    mintPublicSaleWrite,
  ] = useContractWrite(
    {
      addressOrName: contractAddress as string,
      contractInterface: contract.artifact.abi,
      signerOrProvider,
    },
    'mintPublicSale'
  );

  const [{ data: receiptData, error: receiptError, loading: receiptLoading }] =
    useWaitForTransaction({
      hash: responseData?.hash,
      confirmations: 2,
    });

  const mintPublicSale = useCallback(
    async (args?: { mintCount?: BigNumberish }) => {
      const response = await mintPublicSaleWrite({
        args: [args?.mintCount || mintCount],
        overrides: {
          value: BigNumber.from(publicSalePrice).mul(
            BigNumber.from(args?.mintCount || mintCount)
          ),
        },
      });

      const receipt = await response.data?.wait(1);

      return { response, receipt };
    },
    [mintPublicSaleWrite, publicSalePrice, mintCount]
  );

  return [
    {
      data: {
        publicSalePrice,
        txResponse: responseData,
        txReceipt: receiptData,
      },
      error: publicSalePriceError || responseError || receiptError,
      loading: publicSalePriceLoading || responseLoading || receiptLoading,
    },
    mintPublicSale,
  ] as const;
};
