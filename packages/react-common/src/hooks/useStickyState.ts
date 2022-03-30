import React, { Dispatch, SetStateAction } from "react";

export const useStickyState = <S>(
  initialState: S,
  key: string
): [S, Dispatch<SetStateAction<S>>] => {
  const [value, setValue] = React.useState<S>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : initialState;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
