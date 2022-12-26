import { Deferrable } from '@ethersproject/properties';
import { BigNumber, BigNumberish, BytesLike, ethers } from 'ethers';

export function min(a: BigNumberish, b: BigNumberish) {
  return BigNumber.from(a).lt(b) ? BigNumber.from(a) : BigNumber.from(b);
}

export const calculateUniqueTransactionIdentifier = async (
  tx: Deferrable<{
    from?: BytesLike;
    to?: BytesLike;
    data?: BytesLike;
    customData?: Record<string, any>;
  }>,
) => {
  return ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(
      JSON.stringify({
        from: tx.from && (await tx.from)?.toString().toLowerCase(),
        to: tx.to && (await tx.to)?.toString().toLowerCase(),
        data: tx.data && (await tx.data)?.toString().toLowerCase(),
        lastNonce:
          tx?.customData &&
          (await tx?.customData)?.lastNonce?.toString().toLowerCase(),
      }),
    ),
  );
};
