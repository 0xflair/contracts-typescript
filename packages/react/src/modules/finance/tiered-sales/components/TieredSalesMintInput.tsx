import * as ethers from 'ethers';
import { BigNumber } from 'ethers';
import { useEffect, useMemo } from 'react';

import { CryptoAmountInput } from '../../../../core/ui/components/elements/CryptoAmountInput';
import { useTieredSalesContext } from '../providers';

type Props = {
  className?: string;
};

export const TieredSalesMintInput = ({ className }: Props) => {
  const {
    data: { eligibleAmount, mintCount, contractDecimals },
    setMintCount,
  } = useTieredSalesContext();

  const maxAllowedMintCountFormatted = useMemo(() => {
    try {
      return Math.min(
        Number(
          eligibleAmount?.toString()
            ? contractDecimals
              ? ethers.utils.formatUnits(eligibleAmount, contractDecimals)
              : Math.ceil(Number(eligibleAmount.toString()))
            : Infinity,
        ),
      );
    } catch (e) {
      return Infinity;
    }
  }, [contractDecimals, eligibleAmount]);

  useEffect(() => {
    try {
      if (
        mintCount &&
        maxAllowedMintCountFormatted &&
        Number.isFinite(maxAllowedMintCountFormatted)
      ) {
        if (Number(mintCount || 0) > maxAllowedMintCountFormatted) {
          setMintCount(
            parseFloat(maxAllowedMintCountFormatted.toString())
              .toString()
              .replace(/,/g, '.'),
          );
        }
      }

      if (
        !maxAllowedMintCountFormatted ||
        Number(maxAllowedMintCountFormatted) >= 1
      ) {
        if (Number(mintCount || 0) == 0) {
          setMintCount('1');
        }
      }
    } catch (e) {
      debugger;
    }
  }, [contractDecimals, maxAllowedMintCountFormatted, mintCount, setMintCount]);

  return !contractDecimals ? (
    <input
      type="number"
      required
      min={1}
      max={maxAllowedMintCountFormatted || Infinity}
      value={mintCount}
      onChange={(e) => {
        setMintCount(
          e.target.value
            ? parseFloat(Math.ceil(Number(e.target.value)).toString())
                .toString()
                .replace(/,/g, '.')
            : '',
        );
      }}
      className={className}
    />
  ) : (
    <CryptoAmountInput
      value={mintCount || '0'}
      formatted={true}
      decimals={contractDecimals || 0}
      onChange={(valueBN) => {
        if (contractDecimals) {
          if (valueBN && BigNumber.from(valueBN).gt(0)) {
            setMintCount(
              valueBN
                ? ethers.utils.formatUnits(valueBN, contractDecimals)
                : '0',
            );
          }
        } else {
          setMintCount(valueBN.toString());
        }
      }}
      showPrice={false}
    />
  );
};
