export const normalizeIpfsUrl = (
  uri?: string,
  preferManagedGateway?: boolean,
) =>
  uri?.replace(
    /^ipfs:\/\//i,
    preferManagedGateway
      ? 'https://ipfs.flair.finance/ipfs/'
      : 'https://gateway.pinata.cloud/ipfs/',
  );
