import { Environment } from '@0xflair/common';
import {
  ContractVersion,
  LATEST_VERSION,
  loadContract,
} from '@0xflair/contracts-registry';
import axios from 'axios';
import { Signer } from 'ethers';
import { Required } from 'utility-types';

import { FLAIR_META_TRANSACTIONS_BACKEND } from './constants';
import { EIP712_MTX_TYPES } from './eip712';
import { generateRandomUint256 } from './random-uint256';
import { MetaTransactionSignedData } from './types';
import { MetaTransaction } from './types/meta-transaction';

type Config =
  | {
      env?: Environment;
      chainId: number;
      contractVersion?: ContractVersion;
      forwarder?: string;
      flairClientId: string;
      defaults?: Partial<MetaTransaction>;
    }
  | {
      env?: Environment;
      chainId?: number;
      contractVersion?: ContractVersion;
      forwarder: string;
      flairClientId: string;
      defaults?: Partial<MetaTransaction>;
    };

export class MetaTransactionsClient {
  public forwarder: string;

  constructor(private readonly config: Config) {
    this.forwarder = config.forwarder as string;

    if (!config.forwarder && config.chainId) {
      try {
        const forwarderDefinition = loadContract(
          'common/meta-transactions/UnorderedForwarder',
          LATEST_VERSION,
        );
        this.forwarder = forwarderDefinition.address?.[
          String(config.chainId)
        ] as string;
      } catch (e) {
        console.warn(
          `Could not load contract (chain ${config.chainId}) to determine forwarder: ${e}`,
        );
      }
    }

    if (!this.forwarder) {
      throw new Error(
        `Could not determine meta transactions forwarder address, please either specify chainId (given ${config.chainId}) or forwarder address (given ${config.forwarder})`,
      );
    }
  }

  get defaults() {
    return {
      value: '0',
      minGasPrice: '0',
      maxGasPrice: '1000000000000',
      expiresAt: 8000000000,
      nonce: generateRandomUint256(),
      forwarder: this.forwarder as string,
      ...(this.config.defaults || {}),
    } as const;
  }

  async submit(
    chainId: number,
    signer: Signer,
    metaTransactionSignedData: Required<
      Partial<MetaTransactionSignedData>,
      'from' | 'to' | 'data'
    >,
  ): Promise<MetaTransaction> {
    const signedData = { ...this.defaults, ...metaTransactionSignedData };

    const signature = await this.signMetaTransaction(
      chainId,
      signer,
      signedData,
    );

    const response = await axios.post<MetaTransaction>(
      `${
        FLAIR_META_TRANSACTIONS_BACKEND[this.config.env || Environment.PROD]
      }/v1/meta-transactions`,
      { chainId, ...signedData, signature },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Flair-Client-Id': this.config.flairClientId,
        },
      },
    );

    return response.data;
  }

  async signMetaTransaction(
    chainId: number,
    signer: Signer,
    metaTransactionSignedData: MetaTransactionSignedData,
    forwarderAddress?: string,
    forwarderName: string = 'UnorderedForwarder',
    forwarderVersion: string = '0.0.1',
  ): Promise<string> {
    // @ts-ignore
    return await signer._signTypedData(
      {
        name: forwarderName,
        version: forwarderVersion,
        chainId,
        verifyingContract: forwarderAddress || this.forwarder,
      },
      EIP712_MTX_TYPES,
      metaTransactionSignedData,
    );
  }
}
