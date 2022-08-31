import {
  Environment,
  useChainId,
  useFeatureWriteByTag,
} from '@0xflair/react-common';
import { BytesLike } from '@ethersproject/bytes';
import { Provider } from '@ethersproject/providers';
import { WriteContractConfig } from '@wagmi/core';
import { BigNumberish, Signer } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useAccount } from 'wagmi';

type ArgsType = {
  ticketTokenIds?: BigNumberish | BigNumberish[];
  claimToken?: BytesLike;
  owner?: BytesLike;
};

type Config = {
  env?: Environment;
  chainId?: number;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
} & ArgsType;

function selectClaimFeature({ ticketTokenIds, claimToken, owner }: ArgsType) {
  if (ticketTokenIds && Array.isArray(ticketTokenIds)) {
    if (ticketTokenIds.length === 1 && !owner) {
      if (!claimToken) {
        return {
          tag: 'claim_by_single_token',
          args: {
            ticketTokenId: ticketTokenIds[0],
          },
        };
      } else {
        return {
          tag: 'claim_by_single_token_and_erc20_address',
          args: {
            ticketTokenId: ticketTokenIds[0],
            claimToken,
          },
        };
      }
    } else {
      if (!claimToken && !owner) {
        return {
          tag: 'claim_by_multiple_tokens',
          args: {
            ticketTokenIds,
          },
        };
      } else {
        return {
          tag: 'claim_for_owner_by_multiple_tokens_and_erc20_address',
          args: {
            ticketTokenIds,
            claimToken,
            owner,
          },
        };
      }
    }
  }

  return undefined;
}

export const useStreamClaimer = ({
  env,
  chainId: chainId_,
  contractAddress,
  signerOrProvider,
  ticketTokenIds,
  claimToken,
  owner: owner_,
}: Config) => {
  const chainId = useChainId(chainId_);
  const { data: account } = useAccount();
  const owner = owner_ || account?.address;
  const feature = useMemo(
    () => selectClaimFeature({ ticketTokenIds, claimToken, owner }),
    [claimToken, owner, ticketTokenIds],
  );

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
        Object.keys(inputArgs).forEach((key) => {
          if ((inputArgs as any)[key] === undefined) {
            delete (inputArgs as any)[key];
          }
        });

        const f = selectClaimFeature({
          ticketTokenIds,
          claimToken,
          owner,
          ...inputArgs,
        });

        if (f?.args) {
          return result.writeAndWait(
            { ...feature?.args, ...f.args } as any,
            overrides,
          );
        }
      }

      return result.writeAndWait(undefined, overrides);
    },
    [claimToken, feature?.args, owner, result, ticketTokenIds],
  );

  return { ...result, writeAndWait } as const;
};
