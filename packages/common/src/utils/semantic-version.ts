export const compareSemanticVersion = (a: string, b: string): -1 | 0 | 1 => {
  const pa = a.replace(/^v/i, '').split('.');
  const pb = b.replace(/^v/i, '').split('.');
  for (var i = 0; i < 3; i++) {
    const na = Number(pa[i]);
    const nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }
  return 0;
};
