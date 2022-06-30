import { BigNumberish, BytesLike } from 'ethers';

export type NormalizedFunction = {
  interface: any[];
  functionName: string;
  args: any[];
};

export type FunctionNormalizer = {
  signature: string;
  normalize(args?: any, context?: any): NormalizedFunction;
};

// TODO Move functions to their relevant use-case packages

export const FunctionsRegistry: FunctionNormalizer[] = [
  {
    signature: 'mintTo(address,uint256)',
    normalize: (args: { to: BytesLike; amount: BigNumberish }) => {
      return {
        interface: ['function mintTo(address,uint256)'],
        functionName: 'mintTo',
        args: [args.to, args.amount],
      };
    },
  },
  {
    signature: 'mint(address,uint256)',
    normalize: (args: { to: BytesLike; amount: BigNumberish }) => {
      return {
        interface: ['function mint(address,uint256)'],
        functionName: 'mint',
        args: [args.to, args.amount],
      };
    },
  },
  {
    signature: 'setProceedsRecipient(address)',
    normalize: (args: { recipient: BytesLike }) => {
      return {
        interface: ['function setProceedsRecipient(address)'],
        functionName: 'setProceedsRecipient',
        args: [args.recipient],
      };
    },
  },
  {
    signature: 'setPrimarySaleRecipient(address)',
    normalize: (args: { recipient: BytesLike }) => {
      return {
        interface: ['function setPrimarySaleRecipient(address)'],
        functionName: 'setPrimarySaleRecipient',
        args: [args.recipient],
      };
    },
  },
  {
    signature: 'proceedsRecipient()',
    normalize: (args: {}) => {
      return {
        interface: ['function proceedsRecipient() view returns (address)'],
        functionName: 'proceedsRecipient',
        args: [],
      };
    },
  },
  {
    signature: 'maxSupply()',
    normalize: (args: {}) => {
      return {
        interface: ['function maxSupply() view returns (uint256)'],
        functionName: 'maxSupply',
        args: [],
      };
    },
  },
  {
    signature: 'totalSupply()',
    normalize: (args: {}) => {
      return {
        interface: ['function totalSupply() view returns (uint256)'],
        functionName: 'totalSupply',
        args: [],
      };
    },
  },
  {
    signature: 'supply()',
    normalize: (args: {}) => {
      return {
        interface: ['function supply() view returns (uint256)'],
        functionName: 'supply',
        args: [],
      };
    },
  },
  {
    signature: 'currentSupply()',
    normalize: (args: {}) => {
      return {
        interface: ['function currentSupply() view returns (uint256)'],
        functionName: 'currentSupply',
        args: [],
      };
    },
  },
  {
    signature: 'setMaxSupply(uint256)',
    normalize: (args: { newMaxSupply: BigNumberish }) => {
      return {
        interface: ['function setMaxSupply(uint256)'],
        functionName: 'setMaxSupply',
        args: [args.newMaxSupply],
      };
    },
  },
  {
    signature: 'maxSupplyFrozen()',
    normalize: (args: {}) => {
      return {
        interface: ['function maxSupplyFrozen() view returns (bool)'],
        functionName: 'maxSupplyFrozen',
        args: [],
      };
    },
  },
  {
    signature: 'freezeMaxSupply()',
    normalize: (args: {}) => {
      return {
        interface: ['function freezeMaxSupply()'],
        functionName: 'freezeMaxSupply',
        args: [],
      };
    },
  },
  {
    signature: 'baseURIFrozen()',
    normalize: (args: {}) => {
      return {
        interface: ['function baseURIFrozen() view returns (bool)'],
        functionName: 'baseURIFrozen',
        args: [],
      };
    },
  },

  /**
   * Streams
   */

  // ERC721MultiTokenStream
  {
    signature: 'ticketToken()',
    normalize(args: {}) {
      return {
        interface: ['function ticketToken() view returns (address)'],
        functionName: 'ticketToken',
        args: [],
      };
    },
  },
  {
    signature: 'claim(uint256)',
    normalize(args: { ticketTokenId: BigNumberish }) {
      return {
        interface: ['function claim(uint256)'],
        functionName: 'claim',
        args: [args.ticketTokenId],
      };
    },
  },
  {
    signature: 'claim(uint256,address)',
    normalize(args: { ticketTokenId: BigNumberish; claimToken: BytesLike }) {
      return {
        interface: ['function claim(uint256,address)'],
        functionName: 'claim',
        args: [args.ticketTokenId, args.claimToken],
      };
    },
  },
  {
    signature: 'claim(uint256[])',
    normalize(args: { ticketTokenIds: BigNumberish[] }) {
      return {
        interface: ['function claim(uint256[])'],
        functionName: 'claim',
        args: [args.ticketTokenIds],
      };
    },
  },
  {
    signature: 'claim(uint256[],address,address)',
    normalize(args: {
      ticketTokenIds: BigNumberish[];
      claimToken: BytesLike;
      owner: BytesLike;
    }) {
      return {
        interface: ['function claim(uint256[],address,address)'],
        functionName: 'claim',
        args: [args.ticketTokenIds, args.claimToken, args.owner],
      };
    },
  },

  // ERC721EmissionReleaseExtension
  {
    signature: 'emissionRate()',
    normalize(args: {}) {
      return {
        interface: ['function emissionRate() view returns (uint256)'],
        functionName: 'emissionRate',
        args: [],
      };
    },
  },
  {
    signature: 'emissionTimeUnit()',
    normalize(args: {}) {
      return {
        interface: ['function emissionTimeUnit() view returns (uint64)'],
        functionName: 'emissionTimeUnit',
        args: [],
      };
    },
  },
  {
    signature: 'emissionStart()',
    normalize(args: {}) {
      return {
        interface: ['function emissionStart() view returns (uint64)'],
        functionName: 'emissionStart',
        args: [],
      };
    },
  },
  {
    signature: 'emissionEnd()',
    normalize(args: {}) {
      return {
        interface: ['function emissionEnd() view returns (uint64)'],
        functionName: 'emissionEnd',
        args: [],
      };
    },
  },
  {
    signature: 'releasedAmountUntil(uint64)',
    normalize(args: { calculateUntil: BigNumberish }) {
      return {
        interface: [
          'function releasedAmountUntil(uint64) view returns (uint256)',
        ],
        functionName: 'releasedAmountUntil',
        args: [args.calculateUntil],
      };
    },
  },
  {
    signature: 'emissionAmountUntil(uint64)',
    normalize(args: { calculateUntil: BigNumberish }) {
      return {
        interface: [
          'function emissionAmountUntil(uint64) view returns (uint256)',
        ],
        functionName: 'emissionAmountUntil',
        args: [args.calculateUntil],
      };
    },
  },

  // ERC721ShareSplitExtension
  {
    signature: 'totalShares()',
    normalize(args: {}) {
      return {
        interface: ['function totalShares() view returns (uint256)'],
        functionName: 'totalShares',
        args: [],
      };
    },
  },
  {
    signature: 'shares(uint256)',
    normalize(args: { tokenId: BigNumberish }) {
      return {
        interface: ['function shares(uint256) view returns (uint256)'],
        functionName: 'shares',
        args: [args.tokenId],
      };
    },
  },
  {
    signature: 'setSharesForTokens(uint256[],uint256[])',
    normalize(args: {
      ticketTokenIds: BigNumberish[];
      shares: BigNumberish[];
    }) {
      return {
        interface: ['function setSharesForTokens(uint256[],uint256[])'],
        functionName: 'setSharesForTokens',
        args: [args.ticketTokenIds, args.shares],
      };
    },
  },
  {
    signature: 'getSharesByTokens(uint256[])',
    normalize(args: { ticketTokenIds: BigNumberish[] }) {
      return {
        interface: [
          'function getSharesByTokens(uint256[]) view returns (uint256[])',
        ],
        functionName: 'getSharesByTokens',
        args: [args.ticketTokenIds],
      };
    },
  },
];
