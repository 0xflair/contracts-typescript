import { useERC721FullFeaturedContractDeployer } from "../../hooks/collections";
import { useSigner } from "wagmi";
import { WalletProvider, ConnectButton } from "@0xflair/react-wallet";

export default {
  title: "ERC721 Full Featured Collection",
  decorators: [
    (Story: any) => (
      <WalletProvider>
        <Story />
      </WalletProvider>
    ),
  ],
};

type Config = {
  collectionName: string;
  collectionSymbol: string;
};

export const Default = (args: Config) => {
  // const [{ data: signer, error, loading }, getSigner] = useSigner();

  // const {} = useERC721FullFeaturedContractDeployer({});

  return (
    <div className="bg-gray-100 p-8">
      <button>Deploy</button>
      <ul className="grid gap-4 list list-decimal">
        {/* <li><ConnectButton>Yay! Connected!</ConnectButton></li> */}
        <li>fdf</li>
      </ul>
    </div>
  );
};

Default.args = {
  collectionName: "Flair Angels",
  collectionSymbol: "ANGEL",
} as Config;
