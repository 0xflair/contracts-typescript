import * as ethers from 'ethers';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

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

  const maxAllowedMintCountFormatted = Math.min(
    Number(
      eligibleAmount?.toString()
        ? contractDecimals
          ? ethers.utils.formatUnits(eligibleAmount, contractDecimals)
          : Math.ceil(Number(eligibleAmount.toString()))
        : Infinity,
    ),
  );

  const [localValue, setLocalValue] = useState(
    mintCount
      ? parseFloat(mintCount.toString()).toString().replace(/,/g, '.')
      : '1',
  );

  useEffect(() => {
    try {
      if (
        localValue &&
        maxAllowedMintCountFormatted &&
        Number.isFinite(maxAllowedMintCountFormatted)
      ) {
        if (Number(localValue || 0) > maxAllowedMintCountFormatted) {
          setLocalValue(
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
        if (Number(localValue || 0) == 0) {
          setLocalValue('1');
        }
      }
    } catch (e) {
      debugger;
    }
  }, [
    contractDecimals,
    maxAllowedMintCountFormatted,
    localValue,
    setMintCount,
  ]);

  useDebounce(
    () => {
      if (mintCount) {
        setLocalValue(mintCount?.toString().replace(/,/g, '.'));
      }
    },
    500,
    [mintCount],
  );

  useEffect(() => {
    setMintCount(
      contractDecimals
        ? parseFloat(localValue.toString() || '0').toString()
        : Math.ceil(Number(localValue.toString() || '0')).toString(),
    );
  }, [contractDecimals, localValue, setMintCount]);

  return !contractDecimals ? (
    <input
      type="number"
      required
      min={1}
      max={maxAllowedMintCountFormatted || Infinity}
      value={localValue}
      onChange={(e) => {
        setLocalValue(
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
