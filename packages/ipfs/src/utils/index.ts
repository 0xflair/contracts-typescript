export const normalizeIpfsUrl = (uri?: string) =>
  uri?.replace(/^ipfs:\/\//i, 'https://ipfs.flair.finance/ipfs/');
