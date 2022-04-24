import {
  extractHumanReadableError,
  translateContractError,
} from '@0xflair/react-common';
import * as React from 'react';

interface Props {
  title?: string;
  className?: string;
  error?: string | string[] | null | Error | any;
}

export const Errors = ({
  title,
  error,
  className = 'errors flex flex-col gap-2 text-sm rounded-md bg-red-100 p-2 text-red-800',
}: Props) => {
  let errorsList: React.ReactNode = null;

  if (typeof error === 'string') {
    errorsList = (
      <ul>
        <li>{error}</li>
      </ul>
    );
  } else if (error instanceof Array) {
    errorsList = (
      <ul>
        {error.map((e: React.ReactNode) => (
          <li>
            <Errors error={e} />
          </li>
        ))}
      </ul>
    );
  } else if (typeof error === 'object') {
    if (error === null) {
      errorsList = null;
    } else if (error.response) {
      switch (error.response?.data?.code) {
        case 'GITHUB_BAD_CREDENTIALS':
          errorsList = (
            <ul>
              <li>
                Make sure configured GitHub personal access token is correct
              </li>
              <li>
                If part of a GitHub organization, make sure personal access
                token has "Enabled SSO"
              </li>
            </ul>
          );
          break;
        default:
          errorsList = (
            <ul>
              <li>
                {error.response?.data?.message ||
                  `Unexpected error with status ${error.status}`}
              </li>
            </ul>
          );
      }
    } else if (error instanceof Error) {
      errorsList = (
        <ul>
          <li>{translateContractError(extractHumanReadableError(error))}</li>
        </ul>
      );
    } else {
      errorsList = (
        <ul>
          <li>{translateContractError(extractHumanReadableError(error))}</li>
        </ul>
      );
    }
  }

  return (
    <div className={className}>
      {title && <h3 className="font-bold">{title}</h3>}
      {errorsList}
    </div>
  );
};
