import * as React from "react";
import { ContractFactory, ContractInterface, Signer } from "ethers";

export type ContractDeployerConfig = {
  /** Contract interface or ABI */
  contractInterface: ContractInterface;
  /** Contract bytecode */
  contractByteCode: string;
  /** Signer to attach to contract */
  signer?: Signer;
};

const newContract = <T = ContractFactory>({
  contractInterface,
  contractByteCode,
  signer,
}: ContractDeployerConfig) =>
  <T>(
    (<unknown>(
      new ContractFactory(contractInterface, contractByteCode, signer)
    ))
  );

export const useContractDeployer = <Contract = any>({
  contractInterface,
  contractByteCode,
  signer,
}: ContractDeployerConfig) => {
  return React.useMemo(() => {
    return newContract<Contract>({
        contractInterface,
        contractByteCode,
      signer,
    });
  }, [contractInterface, contractByteCode, signer]);
};
