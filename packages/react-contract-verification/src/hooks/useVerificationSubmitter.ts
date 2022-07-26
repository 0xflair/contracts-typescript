import { Environment } from '@0xflair/common';
import {
  ContractFqn,
  ContractVersion,
  loadContract,
} from '@0xflair/contracts-registry';
import { useAxiosPost } from '@0xflair/react-common';
import { useLoginJwt } from '@0xflair/react-wallet';
import * as axios from 'axios';
import { ethers } from 'ethers';
import { useMemo } from 'react';

import { FLAIR_CONTRACT_VERIFICATION_BACKEND } from '../constants';

type Props = {
  env?: Environment;
  chainId?: number;
  contractFqn?: ContractFqn;
  contractVersion?: ContractVersion;
  contractAddress?: string;
  constructorArguments?: any[];
};

export const useVerificationSubmitter = ({
  env = Environment.PROD,
  chainId,
  contractFqn,
  contractVersion,
  contractAddress,
  constructorArguments,
}: Props) => {
  const loginJwt = useLoginJwt();

  const encodedConstructorArguments = useMemo(() => {
    try {
      if (!contractFqn || !constructorArguments) {
        return '';
      }
      const definition = loadContract(contractFqn, contractVersion);
      const iface = new ethers.utils.Interface(definition.artifact.abi);

      return iface.encodeDeploy(constructorArguments);
    } catch (e) {
      console.warn(e);
      return '';
    }
  }, [contractFqn, contractVersion, constructorArguments]);

  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${loginJwt}`,
    };
  }, [loginJwt]);

  const data = useMemo(() => {
    return {
      chainId,
      contractAddress,
      contractFqn,
      contractVersion,
      encodedConstructorArguments,
    };
  }, [
    chainId,
    contractAddress,
    contractFqn,
    contractVersion,
    encodedConstructorArguments,
  ]);

  return useAxiosPost({
    url: `${FLAIR_CONTRACT_VERIFICATION_BACKEND[env]}/v1/contract-verifications`,
    data,
    headers,
  });
};
