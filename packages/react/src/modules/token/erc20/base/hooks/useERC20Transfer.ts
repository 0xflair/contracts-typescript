import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';

import { useContractWriteAndWait } from '../../../../../common';

type Config = {
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  to?: BytesLike;
  amount?: BigNumberish;
  prepare?: boolean;
};

export const useERC20Transfer = ({
  contractAddress,
  signerOrProvider,
  prepare,
  to,
  amount,
}: Config) => {
  return useContractWriteAndWait({
    contractInterface: ['function transfer(address recipient, uint256 amount)'],
    functionName: 'transfer(address,uint256)',
    contractAddress,
    signerOrProvider,
    confirmations: 1,
    args: [to, amount],
    prepare: Boolean(prepare && contractAddress && to && amount),
  });
};
