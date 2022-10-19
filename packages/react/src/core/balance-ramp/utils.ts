import { BigNumber, BigNumberish } from 'ethers';

export function min(a: BigNumberish, b: BigNumberish) {
  return BigNumber.from(a).lt(b) ? BigNumber.from(a) : BigNumber.from(b);
}
