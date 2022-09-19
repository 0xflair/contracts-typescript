import { ZERO_ADDRESS } from '@flair-sdk/common';
import { BytesLike, utils } from 'ethers';
import { useMemo } from 'react';

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
