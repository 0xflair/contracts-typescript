let explicitDarkMode: boolean | undefined = undefined;

export const isDarkMode = () => {
  const darkByUrl = window?.location?.href
    ?.toLowerCase()
    ?.includes('mode=dark');

  const darkByMedia = window?.matchMedia?.(
    '(prefers-color-scheme: dark)',
  ).matches;

  const darkByLocalStorage = window?.localStorage?.getItem?.('mode') === 'dark';

  return explicitDarkMode !== undefined
    ? explicitDarkMode
    : darkByUrl || darkByMedia || darkByLocalStorage;
};

export const setDarkMode = (
  value: boolean | undefined,
  saveToStorage = false,
) => {
  explicitDarkMode = value;

  if (saveToStorage) {
    window?.localStorage?.setItem?.('mode', value ? 'dark' : 'light');
  }
};
