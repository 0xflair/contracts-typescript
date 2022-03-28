import React from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { CryptoSymbol, CryptoUnits } from "../../types";
import { useCryptoPrice } from "../../hooks";
import * as ethers from "ethers";

type Props = {
  value?: string | BigNumber;
  fractionDigits?: number;
  unit?: CryptoUnits;
  symbol?: CryptoSymbol;
};

export const CryptoPrice = (props: Props) => {
  const {
    value = "1",
    fractionDigits = 2,
    unit = CryptoUnits.ETHER,
    symbol = CryptoSymbol.ETH,
  } = props;

  const [{ data, error, loading }] = useCryptoPrice({
    symbol,
  });

  const valueBn = ethers.utils.parseUnits(value?.toString() || "0", unit);
  const etherValue = ethers.utils.formatUnits(valueBn, CryptoUnits.ETHER);

  return <>{(Number(etherValue) * Number(data)).toFixed(fractionDigits)}</>;
};
