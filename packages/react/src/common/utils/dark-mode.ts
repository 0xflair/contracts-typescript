let explicitDarkMode: boolean | undefined = undefined;

export const isDarkMode = () => {
  const darkByUrl =
    typeof window !== 'undefined'
      ? window?.location?.href?.toLowerCase()?.includes('mode=dark')
      : undefined;

  const darkByMedia = window?.matchMedia?.(
    '(prefers-color-scheme: dark)',
  ).matches;

  const darkByLocalStorage =
    typeof window !== 'undefined'
      ? window?.localStorage?.getItem?.('mode') === 'dark'
      : undefined;

  return explicitDarkMode !== undefined
    ? explicitDarkMode
    : darkByUrl || darkByMedia || darkByLocalStorage;
};

export const setDarkMode = (
  value: boolean | undefined,
  saveToStorage = false,
) => {
  explicitDarkMode = value;

  if (saveToStorage && typeof window !== 'undefined') {
    window?.localStorage?.setItem?.('mode', value ? 'dark' : 'light');
  }

  if (typeof document !== 'undefined') {
    if (isDarkMode()) {
      document?.documentElement?.classList?.add('dark');
    } else {
      document?.documentElement?.classList?.remove('dark');
    }
  }
};
