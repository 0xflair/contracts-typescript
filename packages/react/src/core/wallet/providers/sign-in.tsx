import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useInterval } from 'react-use';
import { SiweMessage } from 'siwe';
import { useAccount, useSignMessage } from 'wagmi';

import { useCancel, useChainId, useStickyState } from '../../../common';

export type SignInProviderProps = {
  children?: ReactNode;
  uri?: string;
  statement?: string;
  expireIn?: number;
  storageKey?: string;
};

const domain = typeof window !== 'undefined' ? window?.location?.host : '';
const origin = typeof window !== 'undefined' ? window.location.origin : '';

export const SIWE_DEFAULT_MESSAGE_STATEMENT =
  'I agree to sign-in with this wallet and accept terms of service.';

function createSiweMessage(args: Partial<SiweMessage>) {
  const message = new SiweMessage({
    domain,
    uri: origin,
    version: '1',
    ...args,
  });
  return message;
}

export type SignInState = {
  signedIn?: boolean;
  signatureMessage?: string;
  signatureHex?: string;
  siweMessage?: SiweMessage;
};

type SignInContextValue = {
  data: SignInState;
  isLoading: boolean;
  error?: Error | string | null;
  signIn: (args?: {
    message?: SiweMessage;
  }) => Promise<SignInState | undefined>;
  signOut: () => Promise<void>;
};

export const SignInContext = React.createContext<SignInContextValue | null>(
  null,
);

export const SignInProvider = ({
  children,
  storageKey = 'flair-sign-in-cache',
  uri,
  statement,
  expireIn,
}: SignInProviderProps) => {
  const chainId = useChainId();
  const account = useAccount();

  const domain = uri ? new URL(uri).hostname : undefined;

  const [signInState, setSignInState] = useStickyState<SignInState>(
    { signedIn: false },
    storageKey,
  );

  const siweMessage = useMemo(
    () =>
      createSiweMessage({
        chainId,
        address: account.address,
        statement: statement || SIWE_DEFAULT_MESSAGE_STATEMENT,
        ...(domain ? { domain } : {}),
        ...(uri ? { uri } : {}),
        ...(expireIn
          ? {
              expirationTime: new Date(+(Date.now() + expireIn)).toISOString(),
            }
          : {}),
      }),
    [account.address, chainId, domain, expireIn, statement, uri],
  );

  const {
    error: signatureHexError,
    isLoading: signatureHexLoading,
    isError: signatureHexIsError,
    status: signatureHexStatus,
    signMessageAsync,
  } = useSignMessage();

  const cancelQuery = useCancel();
  const signIn = useCallback(
    async (args?: { message?: SiweMessage }) => {
      const m = args?.message || siweMessage;
      const signatureMessage = m.prepareMessage();

      let didCancel = false;
      cancelQuery(() => {
        didCancel = true;
      });
      setSignInState((p) => ({ ...p, signedIn: false }));
      try {
        const signatureHex = await signMessageAsync({
          message: m.prepareMessage(),
        });
        if (!didCancel) {
          setSignInState((p) => ({
            ...p,
            signatureHex,
            signatureMessage,
            siweMessage: m,
            signedIn: true,
          }));
        }
        return {
          signatureHex,
          signatureMessage,
          siweMessage: m,
          signedIn: true,
        } as SignInState;
      } catch (error: any) {
        console.error(`Error signing message: `, error);
      }
    },
    [cancelQuery, setSignInState, signMessageAsync, siweMessage],
  );
  const signOut = useCallback(async () => {
    setSignInState((p) => ({
      ...p,
      signedIn: false,
      signatureHex: undefined,
      signatureMessage: undefined,
      siweMessage: undefined,
    }));
  }, [setSignInState]);
  const checkExpiration = useCallback(() => {
    if (signInState.signedIn && signInState?.siweMessage?.expirationTime) {
      const expirationTime = new Date(signInState.siweMessage.expirationTime);
      const now = Date.now();
      if (+expirationTime < +now) {
        signOut();
      }
    }
  }, [
    signInState?.signedIn,
    signInState?.siweMessage?.expirationTime,
    signOut,
  ]);

  useEffect(checkExpiration, [checkExpiration]);
  useInterval(checkExpiration, 60_000);

  const value = {
    data: signInState,
    error: signatureHexError,
    isLoading: signatureHexLoading,
    isError: signatureHexIsError,
    status: signatureHexStatus,
    signIn,
    signOut,
  };

  return React.createElement(SignInContext.Provider, { value }, children);
};

export const useSignInContext = () => {
  const context = React.useContext(SignInContext);
  if (!context) throw Error('Must be used within <SignInProvider>');
  return context;
};
