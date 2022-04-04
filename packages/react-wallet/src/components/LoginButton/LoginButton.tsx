import React, { Fragment, useEffect, useRef, useState } from "react";

import { useLoginContext } from "../../providers/login";
import { useAccount } from "wagmi";

export type LoginButtonProps = {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  autoLogin?: boolean;
};

export const LoginButton = (props: LoginButtonProps) => {
  const [{ data: account }] = useAccount();
  const {
    state: { data, error, loginSigning, loginPosting },
    login,
  } = useLoginContext();

  useEffect(() => {
    // Attempt to login connect if wallet is connected
    if (
      props.autoLogin &&
      account?.address &&
      !error &&
      !loginSigning &&
      !loginPosting
    ) {
      login();
    }
  }, [account?.address, login]);

  if (data) {
    return <>{props.children}</> || <></>;
  }

  return (
    <button
      disabled={loginSigning || loginPosting}
      className={
        props.className ||
        "inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      }
      onClick={login}
    >
      {!loginSigning && !loginPosting && (props.label || "Login")}
      {loginSigning ? "Signing..." : null}
      {loginPosting ? "Logging in..." : null}
    </button>
  );
};
