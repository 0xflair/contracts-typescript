import { ethers } from 'ethers';

export function getInterfaceId(contractInterface: ethers.utils.Interface) {
  let interfaceId: ethers.BigNumber = ethers.constants.Zero;

  const functions: string[] = Object.keys(contractInterface.functions);
  for (let i = 0; i < functions.length; i++) {
    interfaceId = interfaceId.xor(contractInterface.getSighash(functions[i]));
  }

  return interfaceId;
}
