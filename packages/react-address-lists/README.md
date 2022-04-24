# Flair SDK: `react-address-lists`

Ready-made React components and hooks to create and manage a list of addresses (mintlist, allowlist, etc) and generate merkle root and proofs.

## Getting Started

### Installation

1. Install the package:

   ```sh
   npm install @0xflair/react-address-lists
   ```

2. Install peer dependencies if not installed yet:

   ```sh
   # if using visual components:
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
