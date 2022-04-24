import { ConnectButton, WalletProvider } from '@0xflair/react-wallet';
import { useCallback } from 'react';
import { useSigner } from 'wagmi';

import { useERC721FullFeaturedContractDeployer } from '../../src/hooks/presets/erc721-full-featured/useERC721FullFeaturedDeployer';

export default {
  title: 'ERC721 Full Featured Collection',
  decorators: [
    (Story: any) => (
      <WalletProvider>
        <Story />
      </WalletProvider>
    ),
  ],
};

type Config = {
  collectionName: string;
  collectionSymbol: string;
  collectionMetadataUri: string;
  placeholderMetadataUri: string;
  maxSupply: number;
  preSalePrice: number;
  preSaleMaxPerWallet: number;
  publicSalePrice: number;
  maxMintPerTx: number;
};

export const Default = (args: Config) => {
  const [{ data: signer }] = useSigner();

  const [
    { data: deployData, error: deployError, loading: deployLoading },
    deployContract,
  ] = useERC721FullFeaturedContractDeployer({
    signer,
  });

  const handleDeploy = useCallback(() => {
    return deployContract(
      args.collectionName,
      args.collectionSymbol,
      args.collectionMetadataUri,
      args.placeholderMetadataUri,
      args.maxSupply,
      args.preSalePrice,
      args.preSaleMaxPerWallet,
      args.publicSalePrice,
      args.maxMintPerTx
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deployContract]);

  return (
    <div className="bg-gray-100 p-8">
      <ul className="grid gap-4 list list-decimal">
        <li>
          <ConnectButton>Yay! Connected!</ConnectButton>
        </li>
        <li>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDeploy}
          >
            Deploy
          </button>
        </li>
        <li>deployData(.address)={deployData?.address}</li>
        <li>deployError={deployError}</li>
        <li>deployLoading={deployLoading}</li>
      </ul>
    </div>
  );
};

Default.args = {
  collectionName: 'Flair Angels',
  collectionSymbol: 'ANGEL',
  collectionMetadataUri: 'ipfs://xxxxx',
  placeholderMetadataUri: 'ipfs://xxxxx',
  maxSupply: 10000,
  preSalePrice: 1000000000000000000,
  preSaleMaxPerWallet: 2,
  publicSalePrice: 10000000000000000000,
  maxMintPerTx: 10,
} as Config;
