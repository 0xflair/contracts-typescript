import React, { Dispatch, SetStateAction } from 'react';

export const useStickyState = <S>(
  initialState: S,
  key: string,
  ignoredKeys?: string[],
): [S, Dispatch<SetStateAction<S>>] => {
  const supportsLocalStorage =
    typeof window !== 'undefined' &&
    typeof window?.localStorage !== 'undefined';

  const [value, setValue] = React.useState<S>(() => {
    const stickyValue = supportsLocalStorage
      ? window?.localStorage.getItem(key)
      : null;

    try {
      return stickyValue !== null && stickyValue !== undefined
        ? JSON.parse(stickyValue)
        : initialState;
    } catch (error) {
      return initialState;
    }
  });

  React.useEffect(() => {
    if (!supportsLocalStorage) return;

    if (typeof value === 'object') {
      const cloneValue: any = Object.assign({}, value);
      Object.keys(cloneValue).forEach((key) => {
        if (ignoredKeys?.includes(key)) {
          cloneValue[key] = undefined;
        }
      });

      if (typeof window !== 'undefined') {
        window?.localStorage.setItem(key, JSON.stringify(cloneValue));
      }
    } else {
      if (typeof window !== 'undefined') {
        window?.localStorage.setItem(key, JSON.stringify(value));
      }
    }
  }, [ignoredKeys, key, supportsLocalStorage, value]);

  return [value, setValue];
};
