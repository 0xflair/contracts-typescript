# `@flair-sdk/metatx`

A typescript (and Node.js) library to help construct and submit ([EIP-2771](https://eips.ethereum.org/EIPS/eip-2771)) meta transactions using Flair's forwarder contracts.

## Getting Started

#### Requirements

Your contracts need to have ERC-2771 support. [Flair](https://flair.dev) provides out-of-box support based on OpenZeppelin's ERC2771Context for contracts deployed.

### Installation

Install the package using NPM or Yarn:

```sh
npm install @flair-sdk/metatx

// or

yarn add @flair-sdk/metatx
```

## Examples

Here are the example projects using this library:

- [Node.js / Express / mint-nft-by-role-meta-transactions](https://github.com/0xflair/examples/tree/main/nodejs/express/mint-nft-by-role-meta-transactions): Mint NFTs from your backend, via Flair trustless relayers.

- [Node.js / Express / mint-one-of-one-nfts-meta-transactions](https://github.com/0xflair/examples/tree/main/nodejs/express/mint-one-of-one-nfts-meta-transactions): Mint NFTs from your backend, via Flair trustless relayers.
