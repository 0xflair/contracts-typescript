import React from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { CryptoUnits, CryptoSymbol, PriceUpstream } from "../../types";
import { useCryptoPrice } from "../../hooks";
import * as ethers from "ethers";

type Props = {
  value?: string | BigNumber;
  fractionDigits?: number;
  unit?: CryptoUnits;
  symbol?: CryptoSymbol;
  priceUpstream?: PriceUpstream;
};

export const CryptoPrice = (props: Props) => {
  const {
    value = '1',
    fractionDigits = 2,
    unit = CryptoUnits.ETHER,
    symbol = "ethereum",
    priceUpstream = PriceUpstream.COIN_GECKO,
  } = props;

  const [{ data, error, loading }] = useCryptoPrice({
    symbol,
    priceUpstream,
  });

  const valueBn = ethers.utils.parseUnits(value?.toString() || '0', unit);
  const etherValue = ethers.utils.formatUnits(valueBn, CryptoUnits.ETHER);

  return <>{(Number(etherValue) * Number(data)).toFixed(fractionDigits)}</>;
};
