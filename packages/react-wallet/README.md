# Flair SDK: `react-wallet`

Ready-made drop-in web3 wallet React components and hooks.

## Getting Started

### Installation

1. Install the package:

   ```sh
   npm install @flair-sdk/react-wallet
   ```

2. Install peer dependencies:

   ```sh
   npm install ethers wagmi-core tailwindcss @headlessui/react @heroicons/react @tailwindcss/aspect-ratio
   ```

3. Configure `tailwind.config.js` to scan SDK for classes:

   ```javascript
   module.exports = {
     purge: [
       "./public/**/*.html",
       "./src/**/*.{js,jsx,ts,tsx,vue}",

       // This line tells Tailwind to look into SDK files
       "./node_modules/@flair-sdk/**/*.{js,jsx,ts,tsx,vue}",
     ],
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     plugins: [
       // These plugsins are used in this package
       require("@tailwindcss/forms"),
       require("@tailwindcss/aspect-ratio"),
     ],
   };
   ```

4. Configure the React provider:
   TODO

### Usage

```ts
import { NetworkSelector } from "@flair-sdk/react-wallet";

function App() {
  return (
    <>
        Your network: <NetworkSelector />
    </>
  );
```
