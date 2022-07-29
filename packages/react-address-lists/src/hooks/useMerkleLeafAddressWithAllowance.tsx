import { Environment, useAxiosGet, ZERO_ADDRESS } from '@0xflair/react-common';
import * as axios from 'axios';
import { BigNumberish, BytesLike, utils } from 'ethers';
import { useMemo } from 'react';

type Config = {
  address?: BytesLike;
  maxAllowance?: BigNumberish;
};

export function useMerkleLeafAddressWithAllowance({
  address,
  maxAllowance,
}: Config) {
  return useMemo(() => {
    return utils.solidityKeccak256(
      ['address', 'uint256'],
      [address || ZERO_ADDRESS, maxAllowance?.toString() || '0'],
    );
  }, [address, maxAllowance]);
}
