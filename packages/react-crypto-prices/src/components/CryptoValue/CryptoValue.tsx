import React from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { CryptoSymbol, CryptoUnits } from "../../types";
import * as ethers from "ethers";
import { CryptoPrice } from "../CryptoPrice/CryptoPrice";

type Props = {
  value?: string | number | BigNumber;
  fractionDigits?: number;
  unit?: CryptoUnits;
  symbol?: CryptoSymbol;
  showPrice?: boolean;
};

export const CryptoValue = (props: Props) => {
  const {
    value = "1",
    fractionDigits = 2,
    unit = CryptoUnits.ETHER,
    symbol = CryptoSymbol.ETH,
    showPrice = true,
  } = props;

  const valueBn = ethers.utils.parseUnits(value?.toString() || "0", unit);
  const etherValue = ethers.utils.formatUnits(valueBn, CryptoUnits.ETHER);

  return (
    <>
      {Number(etherValue).toFixed(fractionDigits)}{" "}{symbol}
      {showPrice && (
        <>
          (~
          <CryptoPrice
            value={value}
            fractionDigits={0}
            symbol={symbol}
            unit={unit}
          />
          )
        </>
      )}
    </>
  );
};
