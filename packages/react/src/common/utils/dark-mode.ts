let explicitDarkMode: boolean | undefined = undefined;

export const isDarkMode = () => {
  const darkByUrl =
    typeof window !== 'undefined'
      ? window?.location?.href?.toLowerCase()?.includes('mode=dark')
      : undefined;

  const darkByMedia =
    typeof window !== 'undefined'
      ? window?.matchMedia?.('(prefers-color-scheme: dark)').matches
      : undefined;

  const darkByLocalStorage =
    typeof window !== 'undefined'
      ? window?.localStorage?.getItem?.('mode') === 'dark'
      : undefined;

  return Boolean(
    explicitDarkMode !== undefined
      ? explicitDarkMode
      : darkByUrl || darkByLocalStorage, //  || darkByMedia
  );
};

export const setDarkMode = (
  value: boolean | undefined,
  saveToStorage = false,
) => {
  explicitDarkMode = value;

  if (saveToStorage) {
    if (typeof window !== 'undefined') {
      window?.localStorage?.setItem?.('mode', value ? 'dark' : 'light');
    }
  }

  if (typeof document !== 'undefined') {
    if (isDarkMode()) {
      document?.documentElement?.classList?.add('dark');
    } else {
      document?.documentElement?.classList?.remove('dark');
    }
  }
};
