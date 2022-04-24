export const normalizeIpfsUrl = (uri?: string) =>
  uri?.replace(/^ipfs:\/\//i, 'https://cloudflare-ipfs.com/ipfs/');
