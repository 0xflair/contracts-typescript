import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish, BytesLike } from 'ethers';

type ArgsType = [
  tierId: BigNumberish,
  minterAddress: BytesLike,
  maxAllowance: BigNumberish,
  merkleProof: BytesLike[],
];

type Config = {
  tierId?: BigNumberish;
  minterAddress?: BytesLike;
  maxAllowance?: BigNumberish;
  merkleProof?: BytesLike[];
} & PredefinedReadContractConfig<ArgsType>;

export const useTierSaleEligibleAmount = (config: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractFqn: 'collections/ERC721/extensions/ERC721TieringExtension',
    functionName: 'eligibleForTier',
    args: [
      config.tierId,
      config.minterAddress,
      config.maxAllowance,
      config.merkleProof,
    ] as ArgsType,
    enabled: config.enabled && config.tierId !== undefined,
    ...config,
  });
};
