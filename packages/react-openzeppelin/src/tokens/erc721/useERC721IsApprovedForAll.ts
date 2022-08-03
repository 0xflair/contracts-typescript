import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish, BytesLike } from 'ethers';

type ArgsType = [owner: string, operator: string];

type Config = {
  owner?: BytesLike;
  operator?: BytesLike;
} & PredefinedReadContractConfig<ArgsType>;

export const useERC721IsApprovedForAll = ({
  owner,
  operator,
  ...rest
}: Config) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractFqn: 'openzeppelin/token/ERC721/ERC721',
    functionName: 'isApprovedForAll',
    args: [owner, operator] as ArgsType,
    ...rest,
  });
};
