import * as React from "react";
import { Signer } from "ethers";
import { useContractDeployer } from "../../../common/useContractDeployer";

import ERC721FullFeaturedContractArtifact from "@0xflair/evm-contracts/collections/ERC721/presets/ERC721FullFeaturedCollection.json";
const ERC721FullFeaturedContractBytecode = require("@0xflair/evm-contracts/collections/ERC721/presets/ERC721FullFeaturedCollection.sol");

export type ERC721FullFeaturedContractDeployerConfig = {
  signer?: Signer;
};

export const useERC721FullFeaturedContractDeployer = <Contract = any>({
  signer,
}: ERC721FullFeaturedContractDeployerConfig) => {
  return useContractDeployer({
    contractInterface: ERC721FullFeaturedContractArtifact.abi,
    contractByteCode: ERC721FullFeaturedContractBytecode,
    signer,
  });
};
