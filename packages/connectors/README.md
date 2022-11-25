# `@flair-sdk/connectors`

Ready-made WAGMI connectors for various providers as open-source.

## Getting Started

### Installation

1. Install the package:

   ```sh
   npm install @flair-sdk/connectors
   ```

2. Install peer dependencies if not installed yet:

   ```sh
   npm install ethers wagmi
   ```

## Example

```ts
import { createClient } from 'wagmi';
import {
   Web3OnboardGamestopConnector,
   Web3OnboardLedgerConnector
} from '@flair-sdk/connectors';

const chains = // based on wagmi docs...

const connectors = [
   new Web3OnboardGamestopConnector({
      chains,
      options: {
            appName: 'Flair',
            appLogo: 'https://app.flair.dev/logo-light-filled.png',
      },
   }),
   new Web3OnboardLedgerConnector({
      chains,
      options: {
         appName: 'Flair',
         appLogo: 'https://app.flair.dev/logo-light-filled.png',
      },
   }),
];

const client = createClient({
   connectors,
   // rest of wagmi config...
});
```