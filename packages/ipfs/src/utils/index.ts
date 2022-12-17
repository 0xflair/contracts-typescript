export const normalizeIpfsUrl = (
  uri?: string,
  preferManagedGateway?: boolean | string,
) =>
  uri?.replace(
    /^ipfs:\/\//i,
    preferManagedGateway === true
      ? 'https://ipfs.flair.finance/ipfs/'
      : preferManagedGateway
      ? `${preferManagedGateway}`
      : 'https://cloudflare-ipfs.com/ipfs/',
  );
