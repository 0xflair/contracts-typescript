import { Environment } from '@flair-sdk/common';
import axios from 'axios';
import { Signer } from 'ethers';
import { Required } from 'utility-types';

import { FLAIR_META_TRANSACTIONS_BACKEND } from './constants';
import { EIP712_MTX_TYPES } from './eip712';
import { generateRandomUint256 } from './random-uint256';
import { MetaTransactionSignedData as MetaTransactionUnsignedData } from './types';
import { MetaTransaction } from './types/meta-transaction';

type Config = {
  env?: Environment;
  forwarder: string;
  flairClientId: string;
  defaults?: Partial<MetaTransaction>;
};

export class MetaTransactionsClient {
  public forwarder: string;

  constructor(private readonly config: Config) {
    this.forwarder = config.forwarder as string;

    if (!this.forwarder) {
      throw new Error(
        `Could not determine meta transactions forwarder address, please specify forwarder address (given ${config.forwarder})`,
      );
    }
  }

  get defaults() {
    return {
      value: '0',
      minGasPrice: '0',
      maxGasPrice: '100000000000',
      expiresAt: 8000000000,
      nonce: generateRandomUint256(),
      forwarder: this.forwarder as string,
      ...(this.config.defaults || {}),
    } as const;
  }

  async submit(
    chainId: number,
    signer: Signer,
    metaTransactionUnsignedData: Required<
      Partial<MetaTransactionUnsignedData>,
      'from' | 'to' | 'data'
    >,
  ): Promise<MetaTransaction> {
    const unsignedData = { ...this.defaults, ...metaTransactionUnsignedData };

    const signature = await this.signMetaTransaction(
      chainId,
      signer,
      unsignedData,
    );

    const response = await axios.post<MetaTransaction>(
      `${
        FLAIR_META_TRANSACTIONS_BACKEND[this.config.env || Environment.PROD]
      }/v1/meta-transactions`,
      { chainId, ...unsignedData, signature },
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

  async fetchById(id: MetaTransaction['id']): Promise<MetaTransaction> {
    const response = await axios.get<MetaTransaction>(
      `${
        FLAIR_META_TRANSACTIONS_BACKEND[this.config.env || Environment.PROD]
      }/v1/meta-transactions/${id}`,
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
    metaTransactionUnsignedData: MetaTransactionUnsignedData,
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
      metaTransactionUnsignedData,
    );
  }
}
