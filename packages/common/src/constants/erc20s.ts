export const DOLLAR_STABLECOIN_SYMBOLS = [
  'USD',
  'DAI',
  'USDC',
  'USDT',
  'BUSD',
  'USDP',
];

export const POPULAR_ERC20_TOKENS = {
  1: [
    {
      symbol: 'DAI',
      contractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
    {
      symbol: 'USDC',
      contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    {
      symbol: 'USDT',
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    {
      symbol: 'BUSD',
      contractAddress: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    },
    {
      symbol: 'USDP',
      contractAddress: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
    },
    {
      symbol: 'WETH',
      contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
  ],
  // Ethereum Goerli
  5: [
    {
      symbol: 'USDC',
      contractAddress: '0x2a0cF3E01F4422d1701A690Ab504c0909627486b',
    },
    {
      symbol: 'WETH',
      contractAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
  ],
  // Binance Mainnet
  56: [
    {
      symbol: 'USDT',
      contractAddress: '0x55d398326f99059ff775485246999027b3197955',
    },
    {
      symbol: 'USDC',
      contractAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    },
    {
      symbol: 'BUSD',
      contractAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    {
      symbol: 'WETH',
      contractAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    {
      symbol: 'WBNB',
      contractAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
  ],
  // Polygon
  137: [
    {
      symbol: 'DAI',
      contractAddress: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    },
    {
      symbol: 'USDC',
      contractAddress: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    },
    {
      symbol: 'USDT',
      contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    },
    {
      symbol: 'BUSD',
      contractAddress: '0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7',
    },
    {
      symbol: 'WETH',
      contractAddress: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
  ],
  // Polygon Mumbai
  80001: [
    {
      symbol: 'WETH',
      contractAddress: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
  ],
  // Arbitrum One
  42161: [
    {
      symbol: 'USDC',
      contractAddress: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    },
    {
      symbol: 'USDT',
      contractAddress: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    },
    {
      symbol: 'WETH',
      contractAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
  ],
};
