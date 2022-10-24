# Flair Typescript SDK

A complete suite of Flair reusable components and clients for frontend and backend development.

## Packages

| Name                                   | Description                                                                                                                                                                                 |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [@flair&#x2011;sdk/react](./packages/react)   | React hooks and components for features like Wallet, NFT Collections, Token Streams, etc. (browser only)                                                                                    |
| [@flair&#x2011;sdk/metatx](./packages/metatx) | Extension to ether.js `Contract` class to make all functions compatible with native meta transactions standard ([ERC 2771](https://eips.ethereum.org/EIPS/eip-2771)). (node.js and browser) |
| [@flair&#x2011;sdk/ipfs](./packages/ipfs)     | Utility functions to interact with IPFS, useful for NFT metadata storage. (node.js and browser)                                                                                             |

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

3. Start the Storybook:

   ```sh
   npm start
   ```
