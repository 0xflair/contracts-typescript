import { Environment } from '@0xflair/common';
import {
  LATEST_VERSION,
  loadContract,
  REGISTRY,
  Version,
} from '@0xflair/contracts-registry';
import {
  MetaTransaction,
  MetaTransactionsClient,
} from '@0xflair/meta-transactions';
import { ZERO_ADDRESS } from '@0xflair/react-common';
import { RequireConnect, WalletProvider } from '@0xflair/react-wallet';
// import { useCallback, useMemo, useState } from '@storybook/addons';
import { useCallback, useMemo, useState } from 'react';
import { useNetwork, useSigner } from 'wagmi';

export default {
  title: 'Sign metadata',
  decorators: [
    (Story: any) => (
      <WalletProvider>
        <Story />
      </WalletProvider>
    ),
  ],
};

type Args = {
  version: Version;
  forwarder: string;

  from: string;
  to: string;
  value: string;
  minGasPrice: number;
  maxGasPrice: number;
  expiresAt: number;
  nonce: string;
  data: string;
};

export const Default = (args: Args) => {
  const { data: signer } = useSigner();
  const { activeChain } = useNetwork();

  const [signature, setSignature] = useState<string>('');
  const [response, setResponse] = useState<MetaTransaction | null>(null);

  const metaTransactionsClient = useMemo(() => {
    try {
      return new MetaTransactionsClient({
        chainId: 4,
        flairClientId: '1234',
        env: Environment.DEV,
      });
    } catch (e) {}
  }, []);

  const doSign = useCallback(async () => {
    if (!activeChain || !signer || !metaTransactionsClient) {
      return;
    }
    const signature = await metaTransactionsClient.signMetaTransaction(
      activeChain.id,
      signer,
      {
        from: args.from,
        to: args.to,
        value: args.value,
        minGasPrice: args.minGasPrice,
        maxGasPrice: args.maxGasPrice,
        expiresAt: args.expiresAt,
        nonce: args.nonce,
        data: args.data,
      }
    );
    setSignature(signature as string);
  }, [activeChain, args, metaTransactionsClient, signer]);

  const doSubmit = useCallback(async () => {
    if (!activeChain || !signer || !metaTransactionsClient) {
      return;
    }
    const response = await metaTransactionsClient.submit(
      activeChain.id,
      signer,
      {
        from: args.from,
        to: args.to,
        data: args.data,
      }
    );
    setResponse(response);
  }, [activeChain, args, metaTransactionsClient, signer]);

  const forwarderContract = useMemo(() => {
    try {
      return loadContract(
        'common/meta-transactions/UnorderedForwarder',
        args.version
      );
    } catch (e) {
      return null;
    }
  }, [args]);

  const forwarderAddress =
    activeChain?.id && forwarderContract && forwarderContract.address
      ? forwarderContract.address[activeChain.id.toString()]
      : undefined;

  return (
    <RequireConnect>
      <ul>
        <li>Forwarder Address: {forwarderAddress}</li>
        <li>Signature: {signature?.toString() || '...'}</li>
        <li>Response: {(response && JSON.stringify(response)) || '...'}</li>
        <li>
          <button onClick={() => doSign()}>Sign the meta-transaction</button>
        </li>
        <li>
          <button onClick={() => doSubmit()}>
            Submit the meta-transaction
          </button>
        </li>
      </ul>
    </RequireConnect>
  );
};

Default.args = {
  version: LATEST_VERSION,
  forwarder: ZERO_ADDRESS,

  from: ZERO_ADDRESS,
  to: ZERO_ADDRESS,
  value: '0',
  minGasPrice: 0,
  maxGasPrice: 100000000000,
  expiresAt: 8000000000000,
  // generate a random number in uint256 type
  nonce: Math.floor(Math.random() * 1000000000).toString(),
  data: '0x',
} as Args;

Default.argTypes = {
  version: {
    control: { type: 'select', options: Object.keys(REGISTRY) },
  },
  forwarder: {
    control: { type: 'text' },
  },
  from: {
    control: { type: 'text' },
  },
  to: {
    control: { type: 'text' },
  },
};
