import * as React from 'react';

import {
  extractHumanReadableError,
  translateContractError,
} from '../../utils/errors';

export interface Props {
  error?: string | string[] | null | Error | any;
}

export class Errors extends React.Component<Props> {
  render() {
    const { error } = this.props;

    const mainClass = 'errors text-sm rounded-md bg-red-100 p-2 text-red-800';

    if (typeof error === 'string') {
      return (
        <ul className={mainClass}>
          <li>{error}</li>
        </ul>
      );
    }

    if (error instanceof Array) {
      return (
        <ul className={mainClass}>
          {error.map((e: React.ReactNode) => (
            <li>
              <Errors error={e} />
            </li>
          ))}
        </ul>
      );
    }

    if (typeof error === 'object') {
      if (error === null) {
        return '';
      }

      if (error.response) {
        switch (error.response?.data?.code) {
          case 'GITHUB_BAD_CREDENTIALS':
            return (
              <ul className={mainClass}>
                <li>
                  Make sure configured GitHub personal access token is correct
                </li>
                <li>
                  If part of a GitHub organization, make sure personal access
                  token has "Enabled SSO"
                </li>
              </ul>
            );
          default:
            return (
              <ul className={mainClass}>
                <li>
                  {error.response?.data?.message ||
                    `Unexpected error with status ${error.status}`}
                </li>
              </ul>
            );
        }
      }

      if (error instanceof Error) {
        return (
          <ul className={mainClass}>
            <li>{translateContractError(extractHumanReadableError(error))}</li>
          </ul>
        );
      }

      return (
        <ul className={mainClass}>
          <li>{translateContractError(extractHumanReadableError(error))}</li>
        </ul>
      );
    }

    return '';
  }
}
