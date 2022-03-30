# Flair SDK: `react-ipfs`

React components and hooks to work with IPFS. This library uses Flair's APIs to upload and pin the file to IPFS, but the file will not be stored on the backend.

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

#### IPFS Uploader Hook

```tsx
import { useIpfsUploader } from "@0xflair/react-ipfs";

function App() {
  const [userFile, serUserFile] = useState<File>();
  const [{
    data: ipfsUrl,
    error: ipfsError,
    loading: ipfsLoading
  }, ipfsUpload] = useIpfsUploader({
    autoUpload: true,
    fromFile: userFile,
  });

  return (
    <ul>
      <li>Choose file: <input type="file" value={userFile} onChange={setUserFile} /></li>
      <li>IPFS Loading: {ipfsLoading ? 'Yes...' : 'Idle'}</li>
      <li>IPFS Error: {ipfsError?.message || ipfsError?.toString()}</li>
    </ul>
  );
```
