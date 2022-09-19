import { Signer } from 'ethers';
import { useMemo, useState } from 'react';

export const useAddressOfSigner = (signer?: Signer): string | undefined => {
  const [address, setAddress] = useState<string>();

  useMemo(async () => {
    if (signer && (signer.getAddress || signer instanceof Signer)) {
      setAddress(await signer.getAddress());
    }
  }, [signer]);

  return address;
};
