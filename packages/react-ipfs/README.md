# Flair SDK: `react-ipfs`

React components and hooks to work with IPFS.

## Getting Started

### Installation

1. Install the package:

   ```sh
   npm install @0xflair/react-ipfs
   ```

2. Install peer dependencies:

   ```sh
   npm install axios

   # if visual components needed:
   npm install tailwindcss @headlessui/react @heroicons/react @tailwindcss/aspect-ratio
   ```

3. Configure `tailwind.config.js` to scan SDK for classes (if visual components needed):

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

### Usage

#### IPFS Upload (using @0xflair/react-dashboard's image field)

```tsx
import { CryptoPrice, CryptoUnits } from "@0xflair/react-crypto-prices";

function App() {
  return (
    <>
      <CryptoPrice value='0.06' unit={CryptoUnits.ETHER} />
    </>
  );
```

#### Price Hook

```tsx
import { useCryptoPrice } from "@0xflair/react-crypto-prices";

function App() {
  const [{data, error, loading}, fetchPrice] = useCryptoPrice({
    symbol: 'ethereum'
  });

  return (
    <ul>
        <li>Price of Ether: {data.usd} USD</li>
        <li>Loading: {loading ? 'Yes...' : 'Idle'}</li>
        <li>Error: {error}</li>
    </ul>
  );
```
