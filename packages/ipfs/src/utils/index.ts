export const normalizeIpfsUrl = (
  uri?: string,
  preferManagedGateway?: boolean,
) =>
  uri?.replace(
    /^ipfs:\/\//i,
    preferManagedGateway
      ? 'https://ipfs.flair.finance/ipfs/'
      : 'https://ipfs.io/ipfs/',
  );
