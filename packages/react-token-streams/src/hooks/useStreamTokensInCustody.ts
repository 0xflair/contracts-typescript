import { V1_19_ERC721CustodialStakingExtension__factory } from '@0xflair/contracts-registry';
import {
  Environment,
  PredefinedReadContractConfig,
  useHasAnyOfFeatures,
} from '@0xflair/react-common';
import { useERC721TotalSupply } from '@0xflair/react-openzeppelin';
import { BytesLike } from '@ethersproject/bytes';
import { BigNumber, BigNumberish } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { useAccount, useProvider } from 'wagmi';

type ArgsType = [tierId: BigNumberish];

type Config = {
  env?: Environment;
  ticketTokenAddress?: BytesLike;
} & PredefinedReadContractConfig<ArgsType>;

export const useStreamTokensInCustody = (config: Config) => {
  const { data: account } = useAccount();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<BigNumberish[]>();
  const [error, setError] = useState<string | Error | null>();

  const {
    data: supportsTokensInCustody,
    error: supportsTokensInCustodyError,
    isLoading: supportsTokensInCustodyLoading,
  } = useHasAnyOfFeatures({
    env: config.env,
    chainId: config.chainId,
    contractAddress: config.contractAddress,
    tags: [
      'flair_stream_custodial_staking_extension',
      'has_stream_custodial_staking_extension',
      'tokens_in_custody',
    ],
  });

  const { data: totalSupply } = useERC721TotalSupply({
    chainId: config.chainId,
    contractAddress: config.ticketTokenAddress?.toString() as string,
    enabled: Boolean(config.ticketTokenAddress && supportsTokensInCustody),
  });

  const provider = useProvider({
    chainId: config.chainId,
  });
  const contract = useMemo(() => {
    if (!config.contractAddress || !provider) {
      return;
    }
    return V1_19_ERC721CustodialStakingExtension__factory.connect(
      config.contractAddress,
      provider,
    );
  }, [config.contractAddress, provider]);

  const fetchTokensInCustodyInRange = useCallback(
    async (startTokenId: BigNumberish, endTokenId: BigNumberish) => {
      if (!contract || !account?.address) {
        return;
      }

      const result = (await contract.tokensInCustody(
        account?.address,
        startTokenId,
        endTokenId,
      )) as any[];

      return result.reduce<BigNumberish[]>(
        (list, inCustody, tokenIdMinusStartTokenId) =>
          inCustody
            ? [
                ...list,
                BigNumber.from(startTokenId).add(tokenIdMinusStartTokenId),
              ]
            : list,
        [],
      );
    },
    [account?.address, contract],
  );

  const refetchTokensInCustody = useCallback(async () => {
    if (isLoading) {
      return;
    }

    if (supportsTokensInCustody) {
      try {
        setError(undefined);
        setIsLoading(true);
        const finalData: BigNumberish[] = [];

        for (
          let i = 0, l = Number(totalSupply?.toString() || 20000);
          i <= l;
          i = i + 5000
        ) {
          const tokens = await fetchTokensInCustodyInRange(i, i + 5000);

          if (tokens && tokens.length) {
            finalData.push(...tokens);
          }
        }

        setData(finalData);
      } catch (error) {
        setData(undefined);
        setError(error as Error);
      }

      setIsLoading(false);
    }
  }, [
    fetchTokensInCustodyInRange,
    isLoading,
    supportsTokensInCustody,
    totalSupply,
  ]);

  useMemo(() => {
    if (!supportsTokensInCustody) {
      return;
    }

    refetchTokensInCustody();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supportsTokensInCustody, account?.address]);

  return {
    data,
    error: error || supportsTokensInCustodyError,
    isLoading: isLoading || supportsTokensInCustodyLoading,
    refetchTokensInCustody,
  } as const;
};
