import { TieredSalesSelector } from '../../../../finance/tiered-sales/components/TieredSalesSelector';
import { useTieredSalesContext } from '../../../../finance/tiered-sales/providers';
import { Tier } from '../../../../finance/tiered-sales/types';
import { ERC1155TokenBadge } from '../../base/components/ERC1155TokenBadge';
import { useTierToTokenIds } from '../hooks';

type RenderProps = {
  checked: boolean;
  active: boolean;
  disabled: boolean;
  tierId: string;
  tier: Tier;
  tokenId?: string;
};

type Props = {
  labelElement?: (props: RenderProps) => JSX.Element;
};

export const ERC1155TieredSalesSelector = ({ labelElement }: Props) => {
  const {
    data: { chainId, contractAddress, tiers },
  } = useTieredSalesContext();

  const { data: tierToTokenIds } = useTierToTokenIds({
    chainId,
    contractAddress,
    tierIds: Object.keys(tiers || {}),
    enabled: Boolean(chainId && contractAddress && tiers),
  });

  const renderElement = labelElement
    ? labelElement
    : ({ checked, tierId, tokenId }: RenderProps) => (
        <>
          {tokenId ? (
            <ERC1155TokenBadge
              chainId={chainId}
              contractAddress={contractAddress}
              tokenId={tokenId}
              selected={checked}
              defaultRender={<>Tier #{tierId.toString()}</>}
            />
          ) : (
            <>Tier #{tierId.toString()}</>
          )}
        </>
      );

  return (
    <TieredSalesSelector
      labelElement={(props) =>
        renderElement({
          ...props,
          tokenId: props?.tierId && tierToTokenIds?.[props?.tierId]?.toString(),
        })
      }
    />
  );
};
