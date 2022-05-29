# Flair SDK: `react-token-streams`

Ready-made React components and hooks for working with Flair's NFT-based streaming pools in a web3 dApp. This SDK also supports interacting with Flair smart contracts and extensions.

## Getting Started

### Installation

1. Install the package:

   ```sh
   npm install @0xflair/react-token-streams
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
       // These plugins are used in this package
       require("@tailwindcss/forms"),
       require("@tailwindcss/aspect-ratio"),
     ],
   };
   ```

## Documentation

Visit [docs.flair.finance/sdk/token-streams](https://docs.flair.finance/sdk/token-streams) for the full SDK documentation.
