# Flair SDK: `react-openzeppelin`

Ready-made React hooks on top of OpenZeppelin smart contracts. This library is built on top of amazing [wagmi](https://wagmi.sh).

## Getting Started

### Installation

```sh
npm install @flair-sdk/react-openzeppelin
```

The dependencies:

- `ethers`: ^5.6.5
- [`wagmi`](https://wagmi.sh): ^0.3.5

## Hooks

#### `useOzHasRole`

Check if a certain address has a specific Openzeppelin's AccessControl role or not.

```ts
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { useOzHasRole } from "@flair-sdk/react-openzeppelin";

const { data, error, isLoading } = useOzHasRole({
  // You contract address that is using Openzeppelin's AccessControl
  contractAddress: "0x111111111111111111111111111111",

  // The address to check if it has the role or not
  address: "0x222222222222222222222222222222",

  // The role hash you want to check
  role: keccak256(toUtf8Bytes("MINTER_ROLE")),
});
```

#### `useOzRoleGranter`

Assign a certain role to a specific address.

#### `useOzRoleRenouncer`

Renounce a certain role from an already granted address.

#### `useOzOwner`

Check if a certain address is owner based on Openzeppelin's Ownable.

## Missing something?

This library is a work in progress and we'll be adding new hooks as we need them. If there's a method you want to see as a simple hook feel free to open an issue or better create a PR :)
