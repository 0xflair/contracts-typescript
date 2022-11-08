# Flair Typescript SDK

A complete suite of Flair reusable components and clients for frontend and backend development.

## Packages

| Name                                   | Description                                                                                                                                                                                 |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [@flair&#x2011;sdk/react](./packages/react)   | React hooks and components for features like Wallet, NFT Collections, Token Streams, etc. (browser only)                                                                                    |
| [@flair&#x2011;sdk/metatx](./packages/metatx) | Extension to ether.js `Contract` class to make all functions compatible with native meta transactions standard ([ERC 2771](https://eips.ethereum.org/EIPS/eip-2771)). (node.js and browser) |
| [@flair&#x2011;sdk/ipfs](./packages/ipfs)     | Utility functions to interact with IPFS, useful for NFT metadata storage. (node.js and browser)                                                                                             |

## Examples

Explore all the examples using the Flair SDK in the [flair-sdk/examples](https://github.com/flair-sdk/examples) repo:

- [Simple wallet integration and connect button](https://github.com/flair-sdk/examples/tree/main/react/simple-wallet-integration)
- [Custom minting sales in your own website](https://github.com/flair-sdk/examples/tree/main/react/custom-tiered-sales)
- [Minting NFTs from your backend via a trustless relayer API](https://github.com/flair-sdk/examples/tree/main/express/mint-erc721-with-metadata)
- [Customize sales logic in the smart contract](https://github.com/flair-sdk/examples/tree/main/solidity/custom-sales-logic)


## Documentation

Visit [docs.flair.dev](https://docs.flair.dev) for the full SDK documentation.

## Development

This repository is equipped with [Storybook](https://storybook.js.org/) for ease of development and manual testing.

1. Clone this repo:

   ```sh
   git clone https://github.com/flair-sdk/typescript.git
   ```

2. Install dependencies:

   ```sh
   npm install
   ```
