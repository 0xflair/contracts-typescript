import { BigNumber } from 'ethers';
import randomBytes from 'randombytes';

export const generateRandomUint256 = (): string => {
  const value = randomBytes(32);

  return BigNumber.from('0x' + value.toString('hex')).toString();
};
