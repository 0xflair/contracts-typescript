import {
  ContractManifest,
  ContractReference,
  findContractByReference,
} from '@flair-sdk/registry';
import { useEffect, useState } from 'react';

type Config = {
  contractReference?: ContractReference;
};

export const useContractManifest = ({ contractReference }: Config) => {
  const [manifest, setManifest] = useState<ContractManifest>();

  useEffect(() => {
    if (!contractReference) {
      setManifest(undefined);
      return;
    }

    try {
      const manifest = findContractByReference(contractReference);
      setManifest(manifest);
    } catch (error) {
      setManifest(undefined);
    }
  }, [contractReference]);

  return manifest;
};
