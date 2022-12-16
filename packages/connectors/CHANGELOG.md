# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.68.11 (2022-12-16)


### Bug Fixes

* fallback to off-chain config for tiers ([2c35e90](https://github.com/flair-sdk/typescript/commit/2c35e90b5e8fdc61ea7435fccf95c23840be9c69))





## 2.68.10 (2022-12-16)


### Bug Fixes

* add missing preferDedicatedGateway flag for metadata image ([fec6c03](https://github.com/flair-sdk/typescript/commit/fec6c03959fca62bb5d1000f5c2b342d5c5c677a))





## 2.68.9 (2022-12-16)


### Bug Fixes

* wait a bit longer before considering window closed ([c0190d2](https://github.com/flair-sdk/typescript/commit/c0190d241334ccff5616966ad52688ce5528383b))





## 2.68.8 (2022-12-16)


### Bug Fixes

* batch requests to fetching tiers for faster ux ([#22](https://github.com/flair-sdk/typescript/issues/22)) ([066c334](https://github.com/flair-sdk/typescript/commit/066c3344ede9b6d662258b9813a8b6af58adbfa4))





## 2.68.7 (2022-12-16)


### Bug Fixes

* allow using dedicated gateway on media component ([1607732](https://github.com/flair-sdk/typescript/commit/160773212bc6921affac5bd7d4565b774746931f))





## 2.68.6 (2022-12-15)


### Bug Fixes

* check against undefined for final tier ([242bf43](https://github.com/flair-sdk/typescript/commit/242bf437db381717f66a014d63dd6adc19367793))





## 2.68.5 (2022-12-15)


### Bug Fixes

* consider erc20 decimals for the output token ([#21](https://github.com/flair-sdk/typescript/issues/21)) ([c4dd793](https://github.com/flair-sdk/typescript/commit/c4dd79325608dd0390770b7ce17c20ad88dea517))





## 2.68.4 (2022-12-15)


### Bug Fixes

* move loading elements to sdk ([b8b9a60](https://github.com/flair-sdk/typescript/commit/b8b9a60a8b48d3eaef0dc157ac6d1662197a0a0c))





## 2.68.3 (2022-12-15)


### Bug Fixes

* re-create wagmi when config changes, prepare mint if sale active ([73c3942](https://github.com/flair-sdk/typescript/commit/73c3942302dcaf5caabf377ca9e6c06022cf1385))





## 2.68.2 (2022-12-15)


### Bug Fixes

* separate disconnection and init attempts ([2c8e548](https://github.com/flair-sdk/typescript/commit/2c8e548793100210304241558ca6dbffcf51b615))





## 2.68.1 (2022-12-15)

**Note:** Version bump only for package @flair-sdk/connectors





# 2.68.0 (2022-12-15)


### Features

* batch rpc calls, correct goerli symbol, support any injected provider and chain ([#20](https://github.com/flair-sdk/typescript/issues/20)) ([22d0aeb](https://github.com/flair-sdk/typescript/commit/22d0aebdaef9c8c6c8499841c25fc16879095b51))





# 2.67.0 (2022-12-14)


### Features

* allow customizing sale status component ([3e6f2c9](https://github.com/flair-sdk/typescript/commit/3e6f2c92293bf31123e114c8ccaea8399a1a8dfc))





## 2.66.3 (2022-12-14)


### Bug Fixes

* create wagmi client only once ([95f4a94](https://github.com/flair-sdk/typescript/commit/95f4a94e7e1c83cf66867fb1f08af54d68da5e25))





## 2.66.2 (2022-12-14)


### Bug Fixes

* use cloudflare for public ipfs gateway ([278d304](https://github.com/flair-sdk/typescript/commit/278d304d1f984ea793f0f3e1a8481c332d1ed7b0))





## 2.66.1 (2022-12-13)

**Note:** Version bump only for package @flair-sdk/connectors





# 2.66.0 (2022-12-13)


### Features

* longer cache for tier info, passing tier id in mint callback ([738ea42](https://github.com/flair-sdk/typescript/commit/738ea4279505f8e5fe1d2a100810a291e8ecbcad))





## 2.65.8 (2022-12-13)


### Bug Fixes

* add 150k relayer overhead to estimated gas limit ([3a052bb](https://github.com/flair-sdk/typescript/commit/3a052bb856c4f63710439fb0abbe7c2230a1c726))





## 2.65.7 (2022-12-13)


### Bug Fixes

* accurate gas fees with proper buffer ([#19](https://github.com/flair-sdk/typescript/issues/19)) ([68caf4b](https://github.com/flair-sdk/typescript/commit/68caf4ba08a35c0df101da1e860401e58ad34210))





## 2.65.6 (2022-12-12)


### Bug Fixes

* smaller list for popular tokens on eth ([a77df91](https://github.com/flair-sdk/typescript/commit/a77df91f41d6bc77ff3e87bdfeaa2b416cd1d486))





## 2.65.5 (2022-12-12)


### Bug Fixes

* use more stable rpc for Fuse chain ([6f465bd](https://github.com/flair-sdk/typescript/commit/6f465bd8a685e20fcca42a1daae2e9c20720a064))





## 2.65.4 (2022-12-12)


### Bug Fixes

* send original tx request when ignoring balance ramp ([a77bffd](https://github.com/flair-sdk/typescript/commit/a77bffd53c05463a253043012e8b00346123a025))





## 2.65.3 (2022-12-12)


### Bug Fixes

* remove gas fee parameters when skipping balance ramp ([57a34c1](https://github.com/flair-sdk/typescript/commit/57a34c144eaef1950307806e319a146b6dce8f1a))





## 2.65.2 (2022-12-12)

**Note:** Version bump only for package @flair-sdk/connectors





## 2.65.1 (2022-12-12)


### Bug Fixes

* assume no balance if it fails to fetch ([5feaa86](https://github.com/flair-sdk/typescript/commit/5feaa864f37d8ff9c2f515dda6a32f0d1ea20249))





# 2.65.0 (2022-12-12)


### Features

* add negate component for ability to mint ([21ef5b3](https://github.com/flair-sdk/typescript/commit/21ef5b3a15cf53d2deef405882b3de2ac2154e13))





## 2.64.3 (2022-12-11)


### Bug Fixes

* use arrow func when checking methods ([e2c20fb](https://github.com/flair-sdk/typescript/commit/e2c20fbc200d6f8565b8adcd5932a7c03a75996f))





## 2.64.2 (2022-12-11)


### Bug Fixes

* check if method is provided before condition ([6d879d2](https://github.com/flair-sdk/typescript/commit/6d879d2932cfa9a90660cc8f86ded0f66ccbfd8e))





## 2.64.1 (2022-12-11)


### Bug Fixes

* add missing type and use proper property name ([380aac9](https://github.com/flair-sdk/typescript/commit/380aac99b1892355209834a4d1e03079ea276b15))





# 2.64.0 (2022-12-11)


### Features

* add bitpay payment option ([#18](https://github.com/flair-sdk/typescript/issues/18)) ([f0f41bf](https://github.com/flair-sdk/typescript/commit/f0f41bf0e0d65b01f6872880830a95f5a6b6e4ae))





## 2.63.4 (2022-12-11)


### Bug Fixes

* avoid initial fetch when not enabled ([1fcfd81](https://github.com/flair-sdk/typescript/commit/1fcfd81b85e7d42b5081b5d5d4a70c6eaf2eeb7e))





## 2.63.3 (2022-12-11)


### Bug Fixes

* use same prop type for erc721 and erc1155 selector ([60dc58c](https://github.com/flair-sdk/typescript/commit/60dc58c70d3f7ae12e8fada2868d3a93a7630bbf))





## 2.63.2 (2022-12-11)


### Bug Fixes

* allow showing a loading element for tier selector ([301c946](https://github.com/flair-sdk/typescript/commit/301c946fb166fce94ac6412f1eb8256de3b2f71c))





## 2.63.1 (2022-12-11)


### Bug Fixes

* accept big numberish for tier id ([b3c8778](https://github.com/flair-sdk/typescript/commit/b3c8778e11f4f1a693ac47fbca73b584f8423d4c))





# 2.63.0 (2022-12-11)


### Features

* allow customizing tier selector and pass all useful info ([#17](https://github.com/flair-sdk/typescript/issues/17)) ([405507e](https://github.com/flair-sdk/typescript/commit/405507ee7318c50b6bb7019505a77ad7ed489564))





# 2.62.0 (2022-12-11)


### Features

* add useful classes to tier selector elements ([9fcd568](https://github.com/flair-sdk/typescript/commit/9fcd5684aaffd94e243d08b80e3be54ea78b547e))





## 2.61.5 (2022-12-11)


### Bug Fixes

* pass down props to tiered-sales-selector ([76eb172](https://github.com/flair-sdk/typescript/commit/76eb172f0fb955ec7859bf2a3bc92618e5df57d6))





## 2.61.4 (2022-12-11)


### Bug Fixes

* pass down props to tiered-sales-selector ([#16](https://github.com/flair-sdk/typescript/issues/16)) ([ec2e3ff](https://github.com/flair-sdk/typescript/commit/ec2e3fffe73bc1675abaaa781f781096da925295))





## 2.61.3 (2022-12-11)


### Bug Fixes

* pass contractAddress to useTieredSalesAllowlistChecker ([31a3512](https://github.com/flair-sdk/typescript/commit/31a3512636cd6d11c03adc17340f3fbd92b4d7ae))





## 2.61.2 (2022-12-11)

**Note:** Version bump only for package @flair-sdk/connectors





## 2.61.1 (2022-12-10)


### Bug Fixes

* use correct abi for tierToTokenId method ([66b2adf](https://github.com/flair-sdk/typescript/commit/66b2adf878af13c71ae93ca1571960c8590f705d))





# 2.61.0 (2022-12-10)


### Features

* enabled balance ramp on all chains by default ([a722f47](https://github.com/flair-sdk/typescript/commit/a722f477e2db76a1bad032afdc9ba20412768cd3))





## 2.60.3 (2022-12-10)

**Note:** Version bump only for package @flair-sdk/connectors





## 2.60.2 (2022-12-10)


### Bug Fixes

* fetch tiers on initial render ([2e928bb](https://github.com/flair-sdk/typescript/commit/2e928bbea8e93c7e3c39111430fc67d31f7c0d11))





## 2.60.1 (2022-12-10)


### Bug Fixes

* remove extra console.log ([3288201](https://github.com/flair-sdk/typescript/commit/328820183136290bf29fe7680c5c916d38bd7aac))





# 2.60.0 (2022-12-10)


### Features

* provide a way to refresh tiers cache ([#15](https://github.com/flair-sdk/typescript/issues/15)) ([fe95c57](https://github.com/flair-sdk/typescript/commit/fe95c57b82374e283f90a65d27654466fcab421e))





## 2.59.2 (2022-12-10)


### Bug Fixes

* consistent version for react query provider ([1f34dd7](https://github.com/flair-sdk/typescript/commit/1f34dd75ad759a1f4c5c0093649b68a87993d551))





## 2.59.1 (2022-12-10)


### Bug Fixes

* read mutability for multicall and propagate errors ([e9f688b](https://github.com/flair-sdk/typescript/commit/e9f688b13d7e6e6fa190821891af1e7db358840b))





# 2.59.0 (2022-12-10)


### Features

* allow configuring dedicated web3auth and upgrade wagmi to 0.8.x ([#14](https://github.com/flair-sdk/typescript/issues/14)) ([a26dcda](https://github.com/flair-sdk/typescript/commit/a26dcdac2b32fd777005bee5a528f20ef8d3a54c))





## 2.58.1 (2022-12-09)


### Bug Fixes

* update wallet connectors based on dynamic configs ([a138ea3](https://github.com/flair-sdk/typescript/commit/a138ea3a1d1f5ab23ace702f757f1676629d986f))





# 2.58.0 (2022-12-09)


### Features

* allow configuring web3auth and magic link ([#13](https://github.com/flair-sdk/typescript/issues/13)) ([f67346d](https://github.com/flair-sdk/typescript/commit/f67346d72f587022fa8f14f494caead9d2956f00))





## 2.57.1 (2022-12-09)


### Bug Fixes

* always lower case contract addresses ([8d47257](https://github.com/flair-sdk/typescript/commit/8d47257217dc3dc8334943ddcd76ab469d81ac8f))





# 2.57.0 (2022-12-09)


### Features

* add a pay button wrapper for easier interface ([89e28d7](https://github.com/flair-sdk/typescript/commit/89e28d7b55c162415f8e124d5ca3308f346da5aa))





# 2.56.0 (2022-12-09)


### Features

* add ramp config in sales provider ([#12](https://github.com/flair-sdk/typescript/issues/12)) ([d82c7f7](https://github.com/flair-sdk/typescript/commit/d82c7f7649dadc3bbe34b780755838a74266f9a3))





## 2.55.3 (2022-12-08)


### Bug Fixes

* remove customData field entirely ([e17f228](https://github.com/flair-sdk/typescript/commit/e17f2286ec6aa48b6b9941bb44c5b23b47eb7948))





## 2.55.2 (2022-12-08)


### Bug Fixes

* remove customData when sending the tx via ethers ([3031dc5](https://github.com/flair-sdk/typescript/commit/3031dc5da5d408ef1e2862cecf0bb7586f9b5bc3))





## 2.55.1 (2022-12-08)


### Bug Fixes

* add missing export for approve button ([493cfac](https://github.com/flair-sdk/typescript/commit/493cfacf707a22e5e31b9ce38d0d237a0642617f))





# 2.55.0 (2022-12-08)


### Features

* support erc20 in tiered sales minting components ([#11](https://github.com/flair-sdk/typescript/issues/11)) ([8ac6ea1](https://github.com/flair-sdk/typescript/commit/8ac6ea13f8903be8cb69cdbe44a7d1448210308a))





## 2.54.1 (2022-12-04)

**Note:** Version bump only for package @flair-sdk/connectors





# 2.54.0 (2022-12-04)


### Features

* add independent social connectors ([#10](https://github.com/flair-sdk/typescript/issues/10)) ([3bae692](https://github.com/flair-sdk/typescript/commit/3bae6925f72ed600d6b531a3bc23096c06aae3cd))





# 2.53.0 (2022-12-03)


### Features

* show title and image for erc721 tier selector if exists ([#9](https://github.com/flair-sdk/typescript/issues/9)) ([1ead52e](https://github.com/flair-sdk/typescript/commit/1ead52e5bc374bfe982fc6a4e150202629c434f2))





## 2.52.1 (2022-12-02)


### Bug Fixes

* do not include legacy gas price if eip1559 tx ([a1e6b94](https://github.com/flair-sdk/typescript/commit/a1e6b948bb165dfe164a1140245e0f472f5c672e))





# 2.52.0 (2022-12-02)


### Features

* pass legacy gas price in estimation ([#8](https://github.com/flair-sdk/typescript/issues/8)) ([9dea0dc](https://github.com/flair-sdk/typescript/commit/9dea0dc2897569ca3f6551593c6ec2eef649294b))





# 2.51.0 (2022-12-01)


### Features

* allow enabling balance ramp on all chains ([fbc03a9](https://github.com/flair-sdk/typescript/commit/fbc03a922c517637dfd1125d845dcb87e9a23f32))





## 2.50.10 (2022-11-30)


### Bug Fixes

* add more types to balance ramp ([f3822d5](https://github.com/flair-sdk/typescript/commit/f3822d524f7cd7a0d7c0df0e26983c5b22c31764))





## 2.50.9 (2022-11-30)


### Bug Fixes

* add utrust type of balance ramp ([52a78fc](https://github.com/flair-sdk/typescript/commit/52a78fcf0c0e7701a0307c36408a15e9cef04b23))





## 2.50.8 (2022-11-29)


### Bug Fixes

* update to latest ethers for infura support for arbitrum ([#6](https://github.com/flair-sdk/typescript/issues/6)) ([d32ef82](https://github.com/flair-sdk/typescript/commit/d32ef82fb664f53154e9644318b9366ebd12b42c))





## 2.50.7 (2022-11-28)

**Note:** Version bump only for package @flair-sdk/connectors





## 2.50.6 (2022-11-27)


### Bug Fixes

* force upper bound on mint input ([d0333fd](https://github.com/flair-sdk/typescript/commit/d0333fdbce8ce176b6845ed5c3b83f600f33a7c7))





## 2.50.5 (2022-11-25)

**Note:** Version bump only for package @flair-sdk/connectors





## 2.50.4 (2022-11-25)


### Bug Fixes

* pass auto connect flag to wallet provider ([1d826c7](https://github.com/flair-sdk/typescript/commit/1d826c711166026a1e4ea6da1129f9c85fbe2f4a))





## 2.50.3 (2022-11-25)


### Bug Fixes

* invalidate only if it not already fetching ([97dc2ac](https://github.com/flair-sdk/typescript/commit/97dc2ace061e05d5f6b05f3af6760fc498de0852))





## 2.50.2 (2022-11-25)

**Note:** Version bump only for package @flair-sdk/connectors





## 2.50.1 (2022-11-25)


### Bug Fixes

* refresh contract metadata if during analysis ([ed698ed](https://github.com/flair-sdk/typescript/commit/ed698ed1228353ef85909170e0dcce043159a9a8))





# 2.50.0 (2022-11-24)


### Features

* allow configuring auto-conenct behavior of the wallet provider ([873c5e9](https://github.com/flair-sdk/typescript/commit/873c5e9fb57432bf402b0c355f7406c9eaf3e709))





# 2.49.0 (2022-11-24)


### Features

* auto resolve transaction when relayed via balance ramp ([7ab1c48](https://github.com/flair-sdk/typescript/commit/7ab1c481bab772aa5c40ac4981158cb09cfe4e40))





# 2.48.0 (2022-11-24)


### Features

* move connectors to a separate package ([#4](https://github.com/flair-sdk/typescript/issues/4)) ([83e6f9d](https://github.com/flair-sdk/typescript/commit/83e6f9d87b65140976e7f8b061fd373be7623807))
