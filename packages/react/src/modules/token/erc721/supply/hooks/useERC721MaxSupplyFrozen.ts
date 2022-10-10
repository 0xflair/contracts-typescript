import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

export const useERC721MaxSupplyFrozen = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    contractInterface: ['function maxSupplyFrozen() view returns (bool)'],
    functionName: 'maxSupplyFrozen()',
    ...config,
  });
};
