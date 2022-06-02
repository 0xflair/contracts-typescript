# Flair Typescript SDK

A complete suite of Flair reusable components and clients for frontend and backend development.

## React

These components and hooks are for [React](https://reactjs.org/) framework to easily build a web3 dApp and optionally integrate with Flair ecosystem.

| Package                                                                          | Description                                                                                                                           |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| [flair-sdk](./packages/flair-sdk)                                                | This package exports all components below for convenience. If you import this package you don't need to import any of packages below. |
| [@0xflair/react&#x2011;common](./packages/react-common)                          | Commonly used React hooks and components such as deploying a contract, getting chain information, Axios hooks, etc.                   |
| [@0xflair/react&#x2011;wallet](./packages/react-wallet)                          | Ready-made drop-in wallet-related components and hooks, such as Connect button, Network switcher, Web3 provider, etc.                 |
| [@0xflair/react&#x2011;nft&#x2011;collections](./packages/react-nft-collections) | React hooks and components to create, manage, mint and read ERC721 NFT collections.                                                   |
| [@0xflair/react&#x2011;nft&#x2011;tokens](./packages/react-nft-tokens)           | React hooks to retrieve NFT tokens of a specific wallet or collection.                                                                |
| [@0xflair/react&#x2011;token&#x2011;streams](./packages/react-token-streams)     | React hooks and components to create token streams such as staking pools or airdropped rewards based on NFTs.                         |
| [@0xflair/react&#x2011;address&#x2011;lists](./packages/react-address-lists)     | React hooks and components to create and manage, and generate merkle trees for address lists. Useful for mintlists, allowlists etc.   |
| [@0xflair/react&#x2011;coingecko](./packages/react-coingecko)                    | React components and hooks to work with crypto prices both as input or for display.                                                   |
| [@0xflair/react&#x2011;openzeppelin](./packages/react-openzeppelin)              | React hooks built to interact with OpenZeppelin contracts.                                                                            |
| [@0xflair/react&#x2011;ipfs](./packages/react-ipfs)                              | Easy to use react hooks for working with IPFS such as uploading.                                                                      |
| [@0xflair/react&#x2011;ui](./packages/react-ui)                                  | Tailwind and React components and hooks that helps building a web3 dApp dashboard.                                                    |

## Documentation

Visit [docs.flair.finance](https://docs.flair.finance) for the full SDK documentation.

## Development

This repository is equipped with [Storybook](https://storybook.js.org/) for ease of development and manual testing.

1. Clone this repo:

   ```sh
   git clone https://github.com/0xflair/typescript-sdk.git
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the Storybook:

   ```sh
   npm start
   ```
