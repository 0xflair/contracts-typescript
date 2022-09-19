# Flair SDK: `react-dashboard`

Tailwind and React components and hooks that helps building a web3 dApp dashboard.

## Getting Started

### Installation

1. Install the package:

   ```sh
   npm install @flair-sdk/react-ui
   ```

2. Install peer dependencies if not already done:

   ```sh
   npm install tailwindcss @headlessui/react @heroicons/react @tailwindcss/aspect-ratio
   ```

3. Configure `tailwind.config.js` (Tailwind v3) to scan SDK for classes:

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

### Example

```ts
import { FormSection } from "@flair-sdk/react-ui";

function CreatePage() {
  return (
    <>
      <FormSection
        title={"Wallet Info"}
        description={"Provide information about your wallet"}
      >
        ...
      </FormSection>
    </>
  );
```
