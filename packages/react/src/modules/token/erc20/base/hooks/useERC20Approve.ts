import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';

import { useContractWriteAndWait } from '../../../../../common';

type Config = {
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  spender?: BytesLike;
  amount?: BigNumberish;
  prepare?: boolean;
};

export const useERC20Approve = ({
  contractAddress,
  signerOrProvider,
  prepare,
  spender,
  amount,
}: Config) => {
  return useContractWriteAndWait<[BytesLike, BigNumberish]>({
    contractInterface: ['function approve(address spender, uint256 amount)'],
    functionName: 'approve',
    contractAddress,
    signerOrProvider,
    confirmations: 1,
    args: [spender as BytesLike, amount as BigNumberish],
    prepare: Boolean(prepare && contractAddress && spender && amount),
  });
};
