import { providers } from 'ethers';

import { getBalanceRampClient } from '../services/balance-ramp.factory';

export const wrapEthersSigner = (signer: providers.JsonRpcSigner) => {
  let originalSigner: providers.JsonRpcSigner = {} as any;

  originalSigner.getChainId = signer.getChainId.bind(signer);
  originalSigner.estimateGas = signer.estimateGas.bind(signer);
  originalSigner.sendTransaction = signer.sendTransaction.bind(signer);
  originalSigner.getBalance = signer.getBalance.bind(signer);
  originalSigner.getAddress = signer.getAddress.bind(signer);
  originalSigner.getFeeData = signer.getFeeData.bind(signer);

  signer.estimateGas = async (transactionRequest) => {
    return getBalanceRampClient().handleEstimateGas(
      originalSigner,
      transactionRequest,
    );
  };

  signer.sendTransaction = async (transactionRequest) => {
    return getBalanceRampClient().handleSendTransaction(
      originalSigner,
      transactionRequest,
    );
  };

  const originalConnectUnchecked = signer.connectUnchecked.bind(signer);
  signer.connectUnchecked = (...args) => {
    return wrapEthersSigner(originalConnectUnchecked(...args));
  };

  return signer;
};