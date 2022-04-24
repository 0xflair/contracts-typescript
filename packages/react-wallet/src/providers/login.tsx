import { Environment, useCancel } from '@0xflair/react-common';
import axios from 'axios';
import json from 'jsonwebtoken';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { useAccount, useSigner } from 'wagmi';

import { FLAIR_WALLET_BACKEND } from '../constants';
import { LOGIN_MESSAGE_TO_SIGN } from '../constants/login';
import { WalletJwtClaims } from '../types';

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

type LoginContextValue = {
  state: {
    /** Flag for when user-side signing is in progress */
    loginSigning?: State['loginSigning'];
    /** Flag for when backend-side posting is in progress */
    loginPosting?: State['loginPosting'];
    /** Logged-in wallet data */
    data?: State['data'];
    /** Any error during login signing or posting */
    error?: State['error'];
  };
  setState: React.Dispatch<React.SetStateAction<State>>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export enum AutoLoginMode {
  NEVER = 'never',
  ONLY_IF_PREVIOUSLY_LOGGED_IN = 'only_if_previously_logged_in',
  ALWAYS = 'always',
}

export const LoginContext = React.createContext<LoginContextValue | null>(null);

export type LoginProviderProps = {
  /** Environment can be either 'prod' (default) or 'env' */
  env?: Environment;

  /**
   * Determines when to automatically login the wallet:
   * - NEVER: never automatically login
   * - ONLY_IF_PREVIOUSLY_LOGGED_IN: only if there's a wallet JWT stored in local storage
   * - ALWAYS: always automatically ask to sign the message for login
   */
  autoLogin?: AutoLoginMode;

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
  autoLogin = AutoLoginMode.ONLY_IF_PREVIOUSLY_LOGGED_IN,
  children,
  loginStorageKey = 'flair.walletJwt',
  timeout = 5000,
}: React.PropsWithChildren<LoginProviderProps>) => {
  const [{ data: account }] = useAccount();
  const [{ data: signer }] = useSigner();
  const [walletJwt, setWalletJwt] = useLocalStorage<string>(loginStorageKey);

  const [state, setState] = React.useState<State>({
    loginSigning: false,
    loginPosting: false,
  });

  // Login method that asks user to sign, verifies in the backend and stores the JWT in local storage
  const cancelQuery = useCancel();
  const login = useCallback(async () => {
    let didCancel = false;
    let source = axios.CancelToken.source();
    cancelQuery(() => {
      didCancel = true;
      source.cancel('Cancelling in cleanup');
    });
    try {
      setState((x) => ({
        ...x,
        error: undefined,
        loginSigning: true,
        loginPosting: false,
      }));
      const signatureHex = await signer?.signMessage(LOGIN_MESSAGE_TO_SIGN);
      if (didCancel) return;

      setState((x) => ({
        ...x,
        error: undefined,
        loginSigning: false,
        loginPosting: true,
      }));
      const response = await axios.post<{ jwtToken: string }>(
        `${FLAIR_WALLET_BACKEND[env].host}${FLAIR_WALLET_BACKEND[env].loginEndpoint}`,
        {
          walletAddress: account?.address,
          signatureHex,
        },
        {
          cancelToken: source.token,
          timeout: timeout,
        }
      );
      if (didCancel) return;

      setWalletJwt(response.data.jwtToken);
    } catch (error: any) {
      if (!didCancel) {
        setState((x) => ({ ...x, data: undefined, error }));
      }
    } finally {
      if (!didCancel) {
        setState((x) => ({ ...x, loginSigning: false, loginPosting: false }));
      }
    }
  }, [cancelQuery, signer, env, account?.address, timeout, setWalletJwt]);

  // Logout method that remove the wallet JWT from local storage
  const logout = useCallback(async () => {
    setWalletJwt('');
  }, [setWalletJwt]);

  // Initially logout if auto-login mode is NEVER.
  useEffect(() => {
    if (autoLogin === AutoLoginMode.NEVER && walletJwt) {
      logout();
    }
  }, [logout, walletJwt, autoLogin]);

  // If wallet JWT is expired call logout.
  useEffect(() => {
    if (
      state.data?.jwtClaims.exp &&
      state.data.jwtClaims.exp < Date.now() / 1000
    ) {
      logout();
    }
  }, [logout, state.data?.jwtClaims.exp]);

  // Logout if connected wallet address is different than wallet JWT
  useEffect(() => {
    if (
      account?.address &&
      state.data?.jwtClaims?.walletAddress &&
      state.data.jwtClaims.walletAddress.toLowerCase() !==
        account.address.toLowerCase()
    ) {
      logout();
    }
  }, [account, state.data, logout]);

  // Automatically attempt to login if auto-login mode is ALWAYS.
  useEffect(() => {
    if (
      autoLogin === AutoLoginMode.ALWAYS &&
      account?.address &&
      !walletJwt &&
      !state.data
    ) {
      login();
    }
  }, [autoLogin, account?.address, walletJwt, login, state.data]);

  // Refresh the state whenever wallet JWT is changed.
  useEffect(() => {
    if (!walletJwt) {
      setState((x) => ({ ...x, data: undefined }));
    } else {
      const jwtClaims = json.decode(walletJwt) as WalletJwtClaims;
      setState((x) => ({ ...x, data: { jwtToken: walletJwt, jwtClaims } }));
    }
  }, [walletJwt]);

  const value = {
    state: {
      loginSigning: state.loginSigning,
      loginPosting: state.loginPosting,
      data: state.data,
      error: state.error,
    },
    setState,
    login,
    logout,
  };

  return React.createElement(LoginContext.Provider, { value }, children);
};

export const useLoginContext = () => {
  const context = React.useContext(LoginContext);
  if (!context) throw Error('Must be used within <LoginProvider>');
  return context;
};
