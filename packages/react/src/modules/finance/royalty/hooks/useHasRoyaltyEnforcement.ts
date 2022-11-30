import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../common';

export const useHasRoyaltyEnforcement = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<boolean>({
    contractInterface: [
      'function hasRoyaltyEnforcement() external view returns (bool)',
    ],
    functionName: 'hasRoyaltyEnforcement()',
    ...config,
  });
};
