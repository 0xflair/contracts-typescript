# Flair SDK: `react-crypto-prices`

React components and hooks to get prices of cryptocurrency coins and tokens from CoinGecko.

## Getting Started

### Installation

1. Install the package:

   ```sh
   npm install @0xflair/react-crypto-prices
   ```

2. Install peer dependencies:

   ```sh
   npm install axios

   # if visual components needed:
   npm install tailwindcss @headlessui/react @heroicons/react @tailwindcss/aspect-ratio
   ```

3. Configure `tailwind.config.js` (Tailwind v3) to scan SDK for classes (if visual components needed):

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

4. Configure the React provider:

   ```ts
   const cryptoPricesConfig = {
     coinGecko: {
       apiKey: "xxxx",
       symbols: ["ethereum", "matic-network"],
     },
   };

   const App = () => {
     return (
       <div className="app">
         <CryptoPricesProvider config={cryptoPricesConfig}>
           <HookExample />
         </CryptoPricesProvider>
       </div>
     );
   };
   ```

### Usage

#### Simple Price

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
