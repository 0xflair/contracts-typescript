import { ZERO_ADDRESS } from '@flair-sdk/common';
import * as axios from 'axios';
import { BigNumberish, BytesLike, utils } from 'ethers';
import { useMemo } from 'react';

type Config = {
  address?: BytesLike;
  maxAllowance?: BigNumberish;
};

export const generateMerkleLeadAddressWithAllowance = (
  address?: BytesLike,
  maxAllowance?: BigNumberish,
) => {
  return utils.solidityKeccak256(
    ['address', 'uint256'],
    [
      address?.toString().toLowerCase() || ZERO_ADDRESS,
      maxAllowance?.toString() || '0',
    ],
  );
};

export function useMerkleLeafAddressWithAllowance({
  address,
  maxAllowance,
}: Config) {
  return useMemo(() => {
    return generateMerkleLeadAddressWithAllowance(address, maxAllowance);
  }, [address, maxAllowance]);
}
