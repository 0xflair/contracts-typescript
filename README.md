# Flair Typescript SDK

A complete suite of Flair reusable components and clients for frontend and backend development.

## React

These components and hooks are for [React](https://reactjs.org/) framework to easily build a web3 dApp and optionally integrate with Flair ecosystem.

| Package                          | Description                                                                                                                           | Links                                      |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------- |
| `flair-sdk`                      | This package exports all components below for convenience. If you import this package you don't need to import any of packages below. | -                                          |
| `@0xflair/react-common`          | Commonly used React hooks and components.                                                                                             | [README](./packages/react-common)          |
| `@0xflair/react-wallet`          | Ready-made drop-in wallet-related components and hooks, such as Connect button, Network switcher, Web3 provider, etc.                 | [README](./packages/react-wallet)          |
| `@0xflair/react-nft-collections` | React hooks and components to create, manage, mint and read ERC721 NFT collections.                                                   | [README](./packages/react-nft-collections) |
| `@0xflair/react-address-lists`   | React hooks and components to create and manage, and generate merkle trees for address lists. Useful for mintlists, allowlists etc.   | [README](./packages/react-address-lists)   |
| `@0xflair/react-contracts`       | Common React hooks to interact with smart contracts.                                                                                  | [README](./packages/react-contracts)       |
| `@0xflair/react-crypto-prices`   | React components and hooks to work with crypto prices both as input or for display.                                                   | [README](./packages/react-crypto-prices)   |
| `@0xflair/react-openzeppelin`    | React hooks built to interact with OpenZeppelin contracts.                                                                            | [README](./packages/react-openzeppelin)    |
| `@0xflair/react-ipfs`            | Easy to use react hooks for working with IPFS such as uploading.                                                                      | [README](./packages/react-ipfs)            |
| `@0xflair/react-ui`              | Tailwind and React components and hooks that helps building a web3 dApp dashboard.                                                    | [README](./packages/react-ui)              |

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

3. Start the Storybook for any package:

   ```sh
   cd packages/react-wallet
   npm start
   ```
