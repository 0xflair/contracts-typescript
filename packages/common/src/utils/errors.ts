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

  let result;

  if (error) {
    if (error.data && error.data.message) {
      result = error.data.message;
    } else if (error.error && error.error.message) {
      result = error.error.message;
    } else if (error.reason) {
      result = error.reason;
    } else if (error.name) {
      result = translateErrorName(error);
    } else if (error.message) {
      result = error.message;
    } else {
      result = error.toString();
    }
  } else {
    result = input.toString();
  }

  if (result.includes('transaction underpriced')) {
    result = 'You must use higher gas price. Transaction is underpriced.';
  }

  return result;
}

export function translateContractError(message: string) {
  if (message.includes('DISTRIBUTOR/TOO_EARLY')) {
    return 'Too early, you can claim only once every 1 hour.';
  } else if (message.includes('DISTRIBUTOR/NOT_LAUNCHED')) {
    return 'Claiming is not enabled yet.';
  } else if (message.includes('MAXED_ALLOWANCE')) {
    return 'You have minted your maximum allocation.';
  } else if (message.includes('ALREADY_ENDED')) {
    return 'Sale is finished.';
  } else if (message.includes('NOT_STARTED')) {
    return 'Sale is not started yet.';
  } else if (message.includes('NOT_ALLOWLISTED')) {
    return 'This wallet address is not allowlisted.';
  } else if (message.includes('EXCEEDS_MAX')) {
    return 'Max allocation reached, this wallet cannot mint anymore.';
  }

  return message;
}
