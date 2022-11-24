import { SequenceConnector as SequenceConnectorOfficial } from '@0xsequence/wagmi-connector';
import { CustodyType } from '@flair-sdk/common';

export class SequenceConnector extends SequenceConnectorOfficial {
  name: string = 'Sequence';
  icon = 'https://sequence.xyz/sequence-icon.svg';
  available: boolean = true;
  custodyType: CustodyType = CustodyType.MPC;
}
