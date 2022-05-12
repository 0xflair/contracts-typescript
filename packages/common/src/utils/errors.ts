function translateErrorName(error: Error) {
  switch (error.name) {
    case 'FlairInvalidArtifactError':
      return `Requested artifact (e.g. smart contract) does not exist, make sure to use correct path. ${error.message}`;
    case 'FlairInvalidVersionError':
      return `Requested version (e.g. specific smart contract version) does not exist, make sure to use correct version. ${error.message}`;
    default:
      return `${error.name}: ${error.message}`;
  }
}

export function extractHumanReadableError(input: any) {
  const error = input.error || input;

  if (error) {
    if (error.data && error.data.message) {
      return error.data.message;
    } else if (error.error && error.error.message) {
      return error.error.message;
    } else if (error.reason) {
      return error.reason;
    } else if (error.name) {
      return translateErrorName(error);
    } else if (error.message) {
      return error.message;
    } else {
      return error.toString();
    }
  }

  return input.toString();
}

export function translateContractError(message: string) {
  if (message.includes('DISTRIBUTOR/TOO_EARLY')) {
    return 'Too early, you can claim only once every 1 hour.';
  } else if (message.includes('DISTRIBUTOR/NOT_LAUNCHED')) {
    return 'Claiming is not enabled yet.';
  }

  return message;
}
