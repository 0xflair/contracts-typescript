import { BigNumber, BigNumberish } from 'ethers';

export function min(a: BigNumberish, b: BigNumberish) {
  return BigNumber.from(a).lt(b) ? BigNumber.from(a) : BigNumber.from(b);
}

export function openModalWithData(
  args: { url: string; width?: string; height?: string },
  rampRequest: Record<string, any>,
) {
  const h = Number(args.height || 550);
  const w = Number(args.width || 600);
  const y = window?.top
    ? window.top.outerHeight / 2 + window.top.screenY - h / 2
    : 0;
  const x = window?.top
    ? window?.top?.outerWidth / 2 + window?.top?.screenX - w / 2
    : 0;

  const modal = window.open(
    args.url,
    '_blank',
    `width=${w},height=${h},top=${y},left=${x},once=true,scrollbars=yes,status=0,toolbar=0,menubar=0,location=0`,
  );

  if (!modal) {
    throw new Error('Failed to open modal');
  }

  modal.postMessage(
    {
      flair: true,
      type: 'BalanceRampRequest',
      rampRequest,
    },
    args.url,
  );

  modal.focus();

  return modal;
}
