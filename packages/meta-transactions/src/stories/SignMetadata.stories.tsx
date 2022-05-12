import { Environment } from '@0xflair/common';
import {
  LATEST_VERSION,
  loadContract,
  REGISTRY,
  Version,
} from '@0xflair/contracts-registry';
import { ZERO_ADDRESS } from '@0xflair/react-common';
import { RequireConnect, WalletProvider } from '@0xflair/react-wallet';
import { useArgs } from '@storybook/client-api';
import { useCallback, useMemo, useState } from 'react';
import { useNetwork, useSigner } from 'wagmi';

import { MetaTransactionsClient } from '../meta-transactions.client';
import { MetaTransaction } from '../types/meta-transaction';

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

export const Default = () => {
  const { data: signer } = useSigner();
  const { activeChain } = useNetwork();

  // const args = useMemo(
  //   () => ({
  //     version: LATEST_VERSION,
  //     forwarder: ZERO_ADDRESS,

  //     from: ZERO_ADDRESS,
  //     to: ZERO_ADDRESS,
  //     value: '0',
  //     minGasPrice: 0,
  //     maxGasPrice: 100000000000,
  //     expiresAt: 8000000000000,
  //     // generate a random number in uint256 type
  //     nonce: Math.floor(Math.random() * 1000000000).toString(),
  //     data: '0x',
  //   }),
  //   []
  // );

  const [args, setArgs] = useArgs();
  const [signature, setSignature] = useState<string>();
  const [response, setResponse] = useState<MetaTransaction>();

  const metaTransactionsClient = useMemo(
    () =>
      new MetaTransactionsClient({
        chainId: 4,
        flairClientId: '1234',
        env: Environment.DEV,
      }),
    []
  );

  const forwarderContract = loadContract(
    'common/meta-transactions/UnorderedForwarder',
    args.version
  );
  const forwarderAddress =
    activeChain?.id && forwarderContract.address
      ? forwarderContract.address[activeChain.id.toString()]
      : undefined;

  // useEffect(() => {
  //   if (args.forwarder === ZERO_ADDRESS && forwarderAddress) {
  //     setArgs({
  //       ...args,
  //       forwarder: forwarderAddress,
  //     });
  //   }
  // }, [forwarderAddress, args.forwarder, args, setArgs]);

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

  return (
    <RequireConnect>
      <ul>
        {/* <li>Forwarder Address: {args.forwarder}</li> */}
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
