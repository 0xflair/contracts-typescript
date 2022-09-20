export class FlairInvalidArtifactError extends Error {
  constructor(expectedArtifact: string, expectedVersion: string) {
    super(
      `Artifact ${expectedArtifact} (version ${expectedVersion}) does not exist in Flair's registry`
    );
    this.name = 'FlairInvalidArtifactError';
  }
}
