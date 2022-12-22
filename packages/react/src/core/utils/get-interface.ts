import { BigNumber, ethers } from 'ethers';

export function getInterfaceId(contractInterface: ethers.utils.Interface) {
  let interfaceId: ethers.BigNumber = ethers.constants.Zero;

  const functions: string[] = Object.keys(contractInterface.functions);
  for (let i = 0; i < functions.length; i++) {
    if (functions[i].includes('supportsInterface')) continue;

    interfaceId = interfaceId.xor(
      BigNumber.from(contractInterface.getSighash(functions[i])),
    );
  }

  return interfaceId;
}
