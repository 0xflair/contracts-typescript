import React from "react";
import { CryptoPricesProvider } from "../../providers";
import { CryptoPrice } from "./CryptoPrice";
import { useCryptoPricesContext } from "../../providers/crypto-prices";
import { CryptoUnits } from "../../types";
import { CryptoSymbol } from "../../constants/currencies";

export default {
  title: "CryptoPrice Component",
  decorators: [
    (Story: any) => (
      <CryptoPricesProvider>
        <Story />
      </CryptoPricesProvider>
    ),
  ],
};

export const Default = () => {
  const {
    state: { error, loading },
  } = useCryptoPricesContext();

  return (
    <>
      <ul className="grid gap-4">
        <li>
          ETH Price = <CryptoPrice symbol={'rETH' as CryptoSymbol} />
        </li>
        <li>
          Value = 0.06 ETH ={" "}
          <CryptoPrice
            value={"0.06"}
            symbol={CryptoSymbol.ETH}
            unit={CryptoUnits.ETHER}
          />{" "}
          USD
        </li>
        <li>error = {error?.message || error?.toString()}</li>
        <li>loading = {loading ? "Yes..." : "Idle"}</li>
      </ul>
    </>
  );
};
