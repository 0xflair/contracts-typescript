# Flair SDK: `react-coingecko`

React hooks to get prices of cryptocurrency coins and tokens from CoinGecko.

## Getting Started

### Installation

1. Install the package:

   ```sh
   npm install @flair-sdk/react-coingecko
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
       "./node_modules/@flair-sdk/**/*.{js,jsx,ts,tsx,vue}",
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
         <CoinGeckoProvider config={cryptoPricesConfig}>
           <HookExample />
         </CoinGeckoProvider>
       </div>
     );
   };
   ```

### Usage

#### Simple Price

```tsx
import { CryptoPrice, CryptoUnits } from "@flair-sdk/react-coingecko";

function App() {
  return (
    <>
      <CryptoPrice value='0.06' unit={CryptoUnits.ETHER} />
    </>
  );
```

#### Price Hook

```tsx
import { useCryptoPrice } from "@flair-sdk/react-coingecko";

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
