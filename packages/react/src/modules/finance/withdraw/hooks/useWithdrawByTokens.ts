import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';

import { useContractWriteAndWait } from '../../../../common';

type Config = {
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  tokenAddresses?: BytesLike[];
  amounts?: BigNumberish[];
  prepare?: boolean;
};

export const useWithdrawByTokens = ({
  contractAddress,
  signerOrProvider,
  prepare,
  tokenAddresses,
  amounts,
}: Config) => {
  return useContractWriteAndWait({
    contractInterface: ['function withdraw(address[],uint256[])'],
    functionName: 'withdraw(address[],uint256[])',
    contractAddress,
    signerOrProvider,
    confirmations: 1,
    args: [tokenAddresses, amounts],
    prepare: Boolean(prepare && contractAddress && tokenAddresses && amounts),
  });
};
