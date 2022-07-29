import { ZERO_ADDRESS } from '@0xflair/react-common';
import { BytesLike, utils } from 'ethers';
import { useMemo } from 'react';

type Config = {
  address?: BytesLike;
};

export function useMerkleLeafAddressOnly({ address }: Config) {
  return useMemo(() => {
    return utils.keccak256(address || ZERO_ADDRESS);
  }, [address]);
}
