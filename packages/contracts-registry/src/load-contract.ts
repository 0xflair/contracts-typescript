import { REGISTRY } from './registry';
import { LATEST_VERSION, Version } from './versions';

export const loadContract = (path: string, version: Version = LATEST_VERSION) => {
    const contract = REGISTRY[version][path];

    if (!contract) {
        throw new Error(`Contract artifact not found: ${path}`);
    }

    return contract;
}