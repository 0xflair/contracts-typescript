import { Environment } from '@flair-sdk/common';
import {
  ContractReference,
  findContractByReference,
} from '@flair-sdk/registry';
import * as axios from 'axios';
import { ethers } from 'ethers';
import { useMemo } from 'react';

import { useAxiosPost } from '../../../common';
import { useLoginJwt } from '../../wallet';
import { FLAIR_CONTRACT_VERIFICATION_BACKEND } from '../constants';

type Props = {
  env?: Environment;
  chainId?: number;
  contractReference?: ContractReference;
  contractAddress?: string;
  constructorArguments?: any[];
};

export const useVerificationSubmitter = ({
  env = Environment.PROD,
  chainId,
  contractReference,
  contractAddress,
  constructorArguments,
}: Props) => {
  const loginJwt = useLoginJwt();

  const encodedConstructorArguments = useMemo(() => {
    try {
      if (!contractReference || !constructorArguments) {
        return '';
      }
      const definition = findContractByReference(contractReference);
      const iface = new ethers.utils.Interface(definition?.artifact?.abi || []);

      return iface.encodeDeploy(constructorArguments);
    } catch (e) {
      console.warn(e);
      return '';
    }
  }, [contractReference, constructorArguments]);

  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  const data = useMemo(() => {
    return {
      chainId,
      contractAddress,
      contractReference,
      encodedConstructorArguments,
    };
  }, [
    chainId,
    contractAddress,
    contractReference,
    encodedConstructorArguments,
  ]);

  return useAxiosPost({
    url: `${FLAIR_CONTRACT_VERIFICATION_BACKEND[env]}/v1/contract-verifications`,
    data,
    headers,
  });
};
