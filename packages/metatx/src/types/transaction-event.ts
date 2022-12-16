export type EventParameter = {
  name: string;
  type: string;
  value: string;
  formatted?: string;
};

export type EventName = string | 'Mint' | 'Burn';

export type TransactionEvent = {
  name: EventName;
  logName: string;
  logTopic: string;
  signature: string;
  args: Record<string, string>;
  details: EventParameter[];
};
