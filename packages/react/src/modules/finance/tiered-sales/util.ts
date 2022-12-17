import { BigNumber } from 'ethers';

import { TiersDictionary } from './types';

export const normalizeTiers = (
  tiers?: TiersDictionary,
  configOnly?: boolean,
): TiersDictionary | undefined => {
  if (tiers === undefined) {
    return undefined;
  }

  return Object.entries(tiers).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: {
        currency:
          value.currency !== undefined
            ? value.currency.toString()
            : value.currency,
        price:
          value.price !== undefined
            ? BigNumber.from(value.price).toString()
            : value.price,
        start:
          value.start !== undefined
            ? BigNumber.from(value.start).toString()
            : value.start,
        end:
          value.end !== undefined
            ? BigNumber.from(value.end).toString()
            : value.end,
        merkleRoot:
          value.merkleRoot !== undefined
            ? value.merkleRoot.toString()
            : value.merkleRoot,
        maxAllocation:
          value.maxAllocation !== undefined
            ? BigNumber.from(value.maxAllocation).toString()
            : value.maxAllocation,
        maxPerWallet:
          value.maxPerWallet !== undefined
            ? BigNumber.from(value.maxPerWallet).toString()
            : value.maxPerWallet,
        reserved:
          value.reserved !== undefined
            ? BigNumber.from(value.reserved).toString()
            : value.reserved,

        ...(configOnly
          ? {}
          : {
              metadataUri: value.metadataUri,
              hideTierForUsers: Boolean(value.hideTierForUsers),
              isSavedOnChain: Boolean(value.isSavedOnChain),
              eligibleAmount:
                value.eligibleAmount !== undefined
                  ? BigNumber.from(value.eligibleAmount).toString()
                  : value.eligibleAmount,
              hasAllowlist: value.hasAllowlist,
              isActive: value.isActive,
              isAllowlisted: value.isAllowlisted,
              isEligible: value.isEligible,
              remainingSupply:
                value.remainingSupply !== undefined
                  ? BigNumber.from(value.remainingSupply).toString()
                  : undefined,
              minterAddress: value.minterAddress,
            }),
      },
    };
  }, {});
};
