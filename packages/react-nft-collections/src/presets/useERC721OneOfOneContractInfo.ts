import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

export type ERC721OneOfOneContractInfo = [
  maxSupply?: BigNumberish,
  totalSupply?: BigNumberish,
  callerBalance?: BigNumberish
];

export const useERC721OneOfOneContractInfo = ({
  contractVersion,
  contractAddress,
  ...restOfConfig
}: PredefinedReadContractConfig) => {
  return useContractRead<ERC721OneOfOneContractInfo>({
    contractVersion,
    contractFqn: 'collections/ERC721/presets/ERC721OneOfOneCollection',
    functionName: 'getInfo',
    contractAddress,
    ...restOfConfig,
  });
};
