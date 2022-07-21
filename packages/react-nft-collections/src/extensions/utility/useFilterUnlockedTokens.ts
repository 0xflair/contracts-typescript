import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';
import { useMemo } from 'react';

type ArgsType = [BigNumberish[] | []];

export const useFilterUnlockedTokens = (
  config: PredefinedReadContractConfig<ArgsType>
) => {
  const result = useContractRead<BigNumberish[], ArgsType>({
    contractFqn: 'collections/ERC721/extensions/ERC721LockableExtension',
    functionName: 'filterUnlocked',
    ...config,
  });

  // The way filterUnlocked works is to return 0 if the token is not locked,
  // this means if collection has a token ID zero and it is passed in args, we have to take care of it separately.
  const hasTokenTokenZero =
    config.args?.[0].find((arg) => arg.toString() === '0') !== undefined;
  const tokenZero = useContractRead<boolean, [BigNumberish]>({
    contractFqn: 'collections/ERC721/extensions/ERC721LockableExtension',
    functionName: 'locked',
    ...config,
    args: ['0'],
    enabled: hasTokenTokenZero,
  });

  const joinedData = useMemo(() => {
    return [
      ...(result.data?.filter((item) => Number(item) > 0) || []),
      ...(hasTokenTokenZero && !tokenZero.data ? ['0'] : []),
    ];
  }, [result.data, hasTokenTokenZero, tokenZero.data]);

  return {
    ...result,
    data: joinedData,
  };
};
