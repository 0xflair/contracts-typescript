import {
  Environment,
  useChainId,
  useFeatureWriteByTag,
} from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { WriteContractConfig } from '@wagmi/core';
import { BigNumberish, Signer } from 'ethers';
import { useCallback } from 'react';

type ArgsType = {
  ticketTokenIds?: BigNumberish | BigNumberish[];
};

type Config = {
  env?: Environment;
  chainId?: number;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
} & ArgsType;

function selectSuitableFeature({ ticketTokenIds }: ArgsType) {
  if (ticketTokenIds && Array.isArray(ticketTokenIds)) {
    if (ticketTokenIds.length === 1) {
      return {
        tag: 'unstake_single_token',
        args: {
          ticketTokenId: ticketTokenIds[0],
        },
      };
    } else {
      return {
        tag: 'unstake_multiple_tokens',
        args: {
          ticketTokenIds,
        },
      };
    }
  }

  return undefined;
}

export const useStreamUnstaker = ({
  env,
  chainId: chainId_,
  contractAddress,
  signerOrProvider,
  ticketTokenIds,
}: Config) => {
  const chainId = useChainId(chainId_);
  const feature = selectSuitableFeature({ ticketTokenIds });

  const result = useFeatureWriteByTag({
    env,
    chainId,
    contractAddress,
    signerOrProvider,
    tag: feature?.tag,
    args: feature?.args,
  });

  const writeAndWait = useCallback(
    async (
      inputArgs?: ArgsType,
      overrides?: Partial<WriteContractConfig['overrides']>,
    ) => {
      if (inputArgs) {
        const f = selectSuitableFeature(inputArgs);

        if (f?.args) {
          return result.writeAndWait(
            { ...feature?.args, ...f.args } as any,
            overrides,
          );
        }
      }

      return result.writeAndWait(undefined, overrides);
    },
    [feature?.args, result],
  );

  return { ...result, writeAndWait } as const;
};
