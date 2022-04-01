import React, { Dispatch, SetStateAction } from "react";

export const useStickyState = <S>(
  initialState: S,
  key: string,
  ignoredKeys?: string[]
): [S, Dispatch<SetStateAction<S>>] => {
  const [value, setValue] = React.useState<S>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : initialState;
  });

  React.useEffect(() => {
    if (typeof value === "object") {
      const cloneValue: any = Object.assign({}, value);
      Object.keys(cloneValue).forEach((key) => {
        if (ignoredKeys?.includes(key)) {
          cloneValue[key] = undefined;
        }
      });
      window.localStorage.setItem(key, JSON.stringify(cloneValue));
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};
