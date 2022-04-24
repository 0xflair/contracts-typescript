export class FlairInvalidVersionError extends Error {
  constructor(expectedVersion: string) {
    super(`Version ${expectedVersion} does not exist in Flair's registry`);
    this.name = 'FlairInvalidVersionError';
  }
}
