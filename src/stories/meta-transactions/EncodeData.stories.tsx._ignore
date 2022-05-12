import {
  ContractDefinition,
  LATEST_VERSION,
  REGISTRY,
} from '@0xflair/contracts-registry';
import { ZERO_ADDRESS } from '@0xflair/react-common';
import { PRIMARY_BUTTON } from '@0xflair/react-ui';
import { utils } from 'ethers';
import { useCallback, useState } from 'react';

export default {
  title: 'Encode calldata',
};

type Args = {
  contractDefinition: ContractDefinition;
  functionName: string;
  functionArgsJson: any[];
};

export const Default = (args: Args) => {
  const [calldata, setCalldata] = useState('');

  const encodeData = useCallback(() => {
    const abi = args.contractDefinition?.artifact?.abi;
    const iface = new utils.Interface(abi);

    const calldata = iface.encodeFunctionData(
      args.functionName,
      Object.values(args.functionArgsJson)
    );

    setCalldata(calldata);
  }, [
    args.contractDefinition?.artifact?.abi,
    args.functionArgsJson,
    args.functionName,
  ]);

  return (
    <>
      <p>
        Fill the function data in controls panel below, then click button below:
      </p>
      <p className="text-sm">{calldata}</p>
      <button className={PRIMARY_BUTTON} onClick={encodeData}>
        Encode Data
      </button>
    </>
  );
};

const ContractNames = Object.keys(REGISTRY[LATEST_VERSION]);

Default.args = {
  contractDefinition: ContractNames.find((n) =>
    n.includes('OneOfOneCollection')
  ),
  functionName: 'mintWithTokenURIsByOwner',
  functionArgsJson: {
    to: ZERO_ADDRESS,
    count: 2,
    tokenURIs: ['ipfs://zzzzz', 'ipfs://wwwwww'],
  },
};

Default.argTypes = {
  contractDefinition: {
    options: ContractNames,
    mapping: REGISTRY[LATEST_VERSION],
    control: { type: 'select' },
  },
};
