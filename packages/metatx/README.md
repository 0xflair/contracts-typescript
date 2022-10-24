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

- [Typescript / Express / mint-erc721-with-metadata](https://github.com/flair-sdk/examples/tree/main/express/mint-erc721-with-metadata): Mint NFTs from your backend, via trustless relayers APIs.
