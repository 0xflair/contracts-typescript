import { ethers } from 'ethers';
import { Chain, useNetwork } from 'wagmi';

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
  const [{ data: network }] = useNetwork();

  const txHash = txResponse?.hash || txReceipt?.transactionHash;
  const scannerChain = chain || network.chain;
  const explorer = ((scannerChain?.blockExplorers as any) || [])[0];

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
              View on {explorer.name}
            </a>
          ) : (
            <span className="truncate w-40">{txHash}</span>
          )}
        </>
      ) : null}
    </div>
  );
};
