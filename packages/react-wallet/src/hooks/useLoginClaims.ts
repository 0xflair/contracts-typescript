import * as React from "react";
import { useLoginContext } from "../providers";

type Config = {};

export const useLoginClaims = ({}: Config = {}) => {
  const {
    state: { data: loginState },
  } = useLoginContext();

  return loginState?.jwtClaims;
};
