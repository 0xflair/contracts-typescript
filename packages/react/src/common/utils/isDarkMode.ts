export const isDarkMode = () => {
  const darkByUrl = window?.location?.href
    ?.toLowerCase()
    ?.includes('mode=dark');

  const darkByMedia = window?.matchMedia?.(
    '(prefers-color-scheme: dark)',
  ).matches;

  const darkByLocalStorage = window?.localStorage?.getItem?.('mode') === 'dark';

  return darkByUrl || darkByMedia || darkByLocalStorage;
};
