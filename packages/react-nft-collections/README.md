# Flair SDK: `react-nft-collections`

Ready-made React components and hooks for working with ERC721 and ERC1155 NFTs in a web3 dApp. This SDK also supports interacting with Flair smart contracts and extensions.

## Getting Started

### Installation

1. Install the package:

   ```sh
   npm install @0xflair/react-nft-collections
   ```

2. Install peer dependencies if not installed yet:

   ```sh
   npm install ethers wagmi

   # and if using visual components:
   npm install tailwindcss @headlessui/react @heroicons/react @tailwindcss/aspect-ratio
   ```

3. Configure `tailwind.config.js` (Tailwind v3) to scan SDK for classes:

   ```javascript
   module.exports = {
     purge: [
       "./public/**/*.html",
       "./src/**/*.{js,jsx,ts,tsx,vue}",

       // This line tells Tailwind to look into SDK files
       "./node_modules/@0xflair/**/*.{js,jsx,ts,tsx,vue}",
     ],
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     plugins: [
       // These plugsins are used in this package
       require("@tailwindcss/forms"),
       require("@tailwindcss/aspect-ratio"),
     ],
   };
   ```

## Documentation

Visit [docs.flair.finance/sdk/nft-collections](https://docs.flair.finance/sdk/nft-collections) for the full SDK documentation.
