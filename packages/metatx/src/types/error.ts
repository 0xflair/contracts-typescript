export type StandardErrorDetails =
  | Record<string, unknown>
  | Record<string, any>
  | null;

export type StandardErrorCauses = StandardError[] | null;

export type StandardError = {
  code: string;
  message?: string;
  details?: StandardErrorDetails;
  causes?: StandardErrorCauses;
  timestamp?: string;
};
