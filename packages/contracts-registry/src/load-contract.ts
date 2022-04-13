import { FlairInvalidVersionError } from './errors';
import { REGISTRY } from './registry';
import { LATEST_VERSION, Version } from './versions';
import { FlairInvalidArtifactError } from './errors/invalid-artifact';

export const loadContract = (path: string, version: Version = LATEST_VERSION) => {
    if (!REGISTRY[version]) {
        throw new FlairInvalidVersionError(version);
    }

    const contract = REGISTRY[version][path];

    if (!contract) {
        throw new FlairInvalidArtifactError(path, version);
    }

    return contract;
}