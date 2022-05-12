import { randomBytes } from 'crypto';
import { BigNumber } from 'ethers';

export const generateRandomUint256 = (): string => {
  const value = randomBytes(32); // 32 bytes = 256 bits

  return BigNumber.from('0x' + value.toString('hex')).toString();
};
