import { ethers } from 'ethers';
import { Chain, useNetwork } from 'wagmi';

import { CopyButton } from './CopyButton';

type Props = {
  className?: string;
  chain?: Chain;
  txResponse?: ethers.providers.TransactionResponse;
  txReceipt?: ethers.providers.TransactionReceipt;
};

export const TransactionLink = ({
  className = 'text-sm text-indigo-700',
  chain,
  txResponse,
  txReceipt,
}: Props) => {
  const { activeChain } = useNetwork();

  const txHash = txResponse?.hash || txReceipt?.transactionHash;
  const scannerChain = chain || activeChain;
  const explorer = scannerChain?.blockExplorers?.default;

  return (
    <div className={className}>
      {txHash ? (
        <>
          {explorer ? (
            <a
              href={`${explorer.url}/tx/${txHash}`}
              target={'_blank'}
              className={'text-sm text-indigo-700'}
              rel="noreferrer"
            >
              View on {explorer.name.toString()}
            </a>
          ) : (
            <CopyButton
              className="inline-block truncate w-20"
              label={`Copy TxHash: ${txHash.toString()}`}
            />
          )}
        </>
      ) : null}
    </div>
  );
};
