import * as React from "react";
import { useLocalStorage } from "react-use";
import { useAccount, useSigner } from "wagmi";
import { useCancel } from "@0xflair/react-common";
import { LOGIN_MESSAGE_TO_SIGN } from "../constants/login";
import { FLAIR_WALLET_BACKEND } from "../constants";
import { Environment } from "@0xflair/react-common";
import axios from "axios";
import json from "jsonwebtoken";
import { WalletJwtClaims } from "../types";

type SignedInWallet = {
  jwtToken: string;
  jwtClaims: WalletJwtClaims;
};

type State = {
  loginSigning?: boolean;
  loginPosting?: boolean;
  data?: SignedInWallet;
  error?: Error;
};

type ContextValue = {
  state: {
    /** Flag for when user-side signing is in progress */
    loginSigning?: State["loginSigning"];
    /** Flag for when backend-side posting is in progress */
    loginPosting?: State["loginPosting"];
    /** Logged-in wallet data */
    data?: State["data"];
    /** Any error during login signing or posting */
    error?: State["error"];
  };
  setState: React.Dispatch<React.SetStateAction<State>>;
};

export const Context = React.createContext<ContextValue | null>(null);

export type Props = {
  /** Environment can be either 'prod' (default) or 'env' */
  env?: Environment;
  /** Enables login attempt on mount as soon as wallet in connected */
  autoLogin?: boolean;
  /**
   * Key for saving connector preference to browser
   * @default 'flair.walletJwt'
   */
  loginStorageKey?: string;
  /** Timeout in milliseconds for login attempt */
  timeout?: number;
};

export const LoginProvider = ({
  env = Environment.PROD,
  autoLogin = false,
  children,
  loginStorageKey = "flair.walletJwt",
  timeout = 5000,
}: React.PropsWithChildren<Props>) => {
  const [{ data: account }] = useAccount();
  const [{ data: signer }] = useSigner();
  const [walletJwt, setWalletJwt] = useLocalStorage<string>(loginStorageKey);

  const [state, setState] = React.useState<State>({
    loginSigning: false,
    loginPosting: false,
  });

  // Attempt to login connect on mount
  const cancelQuery = useCancel();
  React.useEffect(() => {
    if (!autoLogin) return;
    (async () => {
      let didCancel = false;
      let source = axios.CancelToken.source();
      cancelQuery(() => {
        didCancel = true;
        source.cancel("Cancelling in cleanup");
      });

      if (!signer || !account) {
        setState((x) => ({
          ...x,
          loginSigning: false,
          loginPosting: false,
          error: new Error("No wallet signer found for login"),
        }));
        return;
      }

      try {
        setState((x) => ({ ...x, loginSigning: true }));
        const signatureHash = await signer.signMessage(LOGIN_MESSAGE_TO_SIGN);

        let jwtToken = walletJwt;
        let jwtClaims = jwtToken
          ? (json.decode(jwtToken) as WalletJwtClaims)
          : undefined;

        if (
          !walletJwt ||
          !jwtClaims ||
          jwtClaims?.walletAddress !== account.address
        ) {
          setState((x) => ({ ...x, loginSigning: false, loginPosting: true }));
          const response = await axios.post<{ jwtToken: string }>(
            `${FLAIR_WALLET_BACKEND[env].host}${FLAIR_WALLET_BACKEND[env].loginEndpoint}`,
            {
              signatureHash,
            },
            {
              cancelToken: source.token,
              timeout: timeout,
            }
          );

          jwtToken = response.data.jwtToken;
          jwtClaims = json.decode(jwtToken) as WalletJwtClaims;

          setWalletJwt(jwtToken);
        }

        setState((x) => ({
          ...x,
          data: {
            jwtToken: jwtToken as string,
            jwtClaims: jwtClaims as WalletJwtClaims,
          },
        }));
      } catch (error: any) {
        setState((x) => ({ ...x, error }));
      } finally {
        setState((x) => ({ ...x, loginSigning: false, loginPosting: false }));
      }
    })();
  }, [account?.address, signer]);

  const value = {
    state: {
      loginSigning: state.loginSigning,
      loginPosting: state.loginPosting,
      data: state.data,
      error: state.error,
    },
    setState,
  };

  return React.createElement(Context.Provider, { value }, children);
};

export const useLoginContext = () => {
  const context = React.useContext(Context);
  if (!context) throw Error("Must be used within <LoginProvider>");
  return context;
};
