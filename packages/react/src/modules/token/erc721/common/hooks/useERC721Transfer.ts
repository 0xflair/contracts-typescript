import { BigNumberish, BytesLike } from 'ethers';

import {
  PredefinedContractWriteConfig,
  useContractWriteAndWait,
} from '../../../../../common';

type Config = PredefinedContractWriteConfig & {
  from?: BytesLike;
  to?: BytesLike;
  tokenId?: BigNumberish;
};

export const useERC721Transfer = ({
  prepare = true,
  from,
  to,
  tokenId,
  ...rest
}: Config) => {
  return useContractWriteAndWait({
    contractInterface: [
      'function transferFrom(address from,address to,uint256 tokenId)',
    ],
    functionName: 'transferFrom(address,address,uint256)',
    confirmations: 1,
    args: [from, to, tokenId],
    prepare: Boolean(prepare && from && to && tokenId),
    ...rest,
  });
};
