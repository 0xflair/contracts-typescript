import { Environment, StandardError } from '@flair-sdk/common';
import { Signer } from 'ethers';
import got, { Got } from 'got';
import { Required } from 'utility-types';

import { FLAIR_META_TRANSACTIONS_BACKEND } from './constants';
import { EIP712_MTX_TYPES } from './eip712';
import { generateRandomUint256 } from './random-uint256';
import { MetaTransactionUnsignedData } from './types';
import { MetaTransaction } from './types/meta-transaction';

type Config = {
  env?: Environment;
  forwarder: string;
  flairClientId: string;
  defaults?: Partial<MetaTransaction>;
};

export class MetaTransactionsClient {
  public forwarder: string;

  private gotInstance!: Got;

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

  private getGotInstance(): Got {
    if (!this.gotInstance) {
      this.gotInstance = got.extend({
        prefixUrl: `${
          FLAIR_META_TRANSACTIONS_BACKEND[this.config.env || Environment.PROD]
        }/`,
        responseType: 'json',
        retry: 5,
        throwHttpErrors: true,
        timeout: 5_000,
      });
    }

    return this.gotInstance;
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

    try {
      const response = await this.getGotInstance().post<MetaTransaction>(
        `v1/meta-transactions`,
        {
          json: { chainId, ...unsignedData, signature },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Flair-Client-Id': this.config.flairClientId,
          },
        },
      );

      return response.body;
    } catch (e: any) {
      if (e.response?.body?.code) {
        throw e.response?.body;
      }

      throw {
        code: 'ErrTransactionQueueFailed',
        message: e.message || e.toString(),
        details: {
          originalError: e,
        },
      } as StandardError;
    }
  }

  async fetchById(id: MetaTransaction['id']): Promise<MetaTransaction> {
    const response = await this.getGotInstance().get<MetaTransaction>(
      `v1/meta-transactions/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Flair-Client-Id': this.config.flairClientId,
        },
      },
    );

    return response.body;
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
