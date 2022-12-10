import { BytesLike, utils } from 'ethers';
import { useMemo } from 'react';

import { ZERO_ADDRESS } from '@flair-sdk/common';

type Config = {
  address?: BytesLike;
};

export const generateMerkleLeadAddressOnly = (address?: BytesLike) => {
  return utils.keccak256(address?.toString().toLowerCase() || ZERO_ADDRESS);
};

export function useMerkleLeafAddressOnly({ address }: Config) {
  return useMemo(() => {
    return generateMerkleLeadAddressOnly(address);
  }, [address]);
}
