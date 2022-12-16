# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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

**Note:** Version bump only for package @flair-sdk/common





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

**Note:** Version bump only for package @flair-sdk/common





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

**Note:** Version bump only for package @flair-sdk/common





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

**Note:** Version bump only for package @flair-sdk/common





## 2.61.1 (2022-12-10)


### Bug Fixes

* use correct abi for tierToTokenId method ([66b2adf](https://github.com/flair-sdk/typescript/commit/66b2adf878af13c71ae93ca1571960c8590f705d))





# 2.61.0 (2022-12-10)


### Features

* enabled balance ramp on all chains by default ([a722f47](https://github.com/flair-sdk/typescript/commit/a722f477e2db76a1bad032afdc9ba20412768cd3))





## 2.60.3 (2022-12-10)

**Note:** Version bump only for package @flair-sdk/common





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

**Note:** Version bump only for package @flair-sdk/common





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

**Note:** Version bump only for package @flair-sdk/common





## 2.50.6 (2022-11-27)


### Bug Fixes

* force upper bound on mint input ([d0333fd](https://github.com/flair-sdk/typescript/commit/d0333fdbce8ce176b6845ed5c3b83f600f33a7c7))





## 2.50.5 (2022-11-25)

**Note:** Version bump only for package @flair-sdk/common





## 2.50.4 (2022-11-25)


### Bug Fixes

* pass auto connect flag to wallet provider ([1d826c7](https://github.com/flair-sdk/typescript/commit/1d826c711166026a1e4ea6da1129f9c85fbe2f4a))





## 2.50.3 (2022-11-25)


### Bug Fixes

* invalidate only if it not already fetching ([97dc2ac](https://github.com/flair-sdk/typescript/commit/97dc2ace061e05d5f6b05f3af6760fc498de0852))





## 2.50.2 (2022-11-25)

**Note:** Version bump only for package @flair-sdk/common





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





# 2.47.0 (2022-11-24)


### Features

* add method to get metatx by id ([860b814](https://github.com/flair-sdk/typescript/commit/860b814aec14b2304c55135bac7208998b813f03))





## 2.46.8 (2022-11-24)

**Note:** Version bump only for package @flair-sdk/common





## 2.46.7 (2022-11-24)

**Note:** Version bump only for package @flair-sdk/common





## 2.46.6 (2022-11-24)


### Bug Fixes

* hide status bar when not connected ([736e394](https://github.com/flair-sdk/typescript/commit/736e394f19e69b0bd7d195e69bf1d864016c8511))





## 2.46.5 (2022-11-22)


### Bug Fixes

* add more cases to catch insufficient funds ([7149829](https://github.com/flair-sdk/typescript/commit/7149829a0a645de37a02b6ce44c473017d8e7817))





## 2.46.4 (2022-11-17)


### Bug Fixes

* erc1155 max supply batching, dark mode by media, erc721 balance ([6ad594c](https://github.com/flair-sdk/typescript/commit/6ad594cfb37432999747d1c395329eb2d802f02d))





## 2.46.3 (2022-11-14)


### Bug Fixes

* remove console.logs ([6e8b192](https://github.com/flair-sdk/typescript/commit/6e8b1925b3a70679b35bf19905533795593bc6f4))





## 2.46.2 (2022-11-14)


### Bug Fixes

* better modal styling on mobile screens and with all wallet options ([345d04d](https://github.com/flair-sdk/typescript/commit/345d04d8120a22b9fff4ef8bc91f623a3a5d3a1e))





## 2.46.1 (2022-11-14)


### Bug Fixes

* wallet styling for small screens ([7f88f6f](https://github.com/flair-sdk/typescript/commit/7f88f6f2b6811dca7dd1b83b2e5d731e5ff4aa59))





# 2.46.0 (2022-11-14)


### Features

* add sequence and web3auth wallets ([3f6f94b](https://github.com/flair-sdk/typescript/commit/3f6f94b623f8a12f529d318245cdc35fe16a35d0))





## 2.45.1 (2022-11-13)

**Note:** Version bump only for package @flair-sdk/common





# 2.45.0 (2022-11-12)


### Features

* add defaults in metatx config ([213cc7c](https://github.com/flair-sdk/typescript/commit/213cc7c433fc0163758bd504d8120cf8eeb2f75b))





# 2.44.0 (2022-11-11)


### Features

* allow passing default values for meta transactions ([01109c1](https://github.com/flair-sdk/typescript/commit/01109c1930dbb77cfb6fc9569086215bd3db8d04))





## 2.43.2 (2022-11-10)


### Bug Fixes

* use pinata gateway for general links ([8ddf3a8](https://github.com/flair-sdk/typescript/commit/8ddf3a842ecffb5afe86707d830f3e038db7f2e0))





## 2.43.1 (2022-11-10)


### Bug Fixes

* shorter name for web3auth connector ([e07d07f](https://github.com/flair-sdk/typescript/commit/e07d07f98bcbf3e39425a3d9bc8607c8caa875a7))





# 2.43.0 (2022-11-09)


### Features

* allow disabling disconnect button ([eac51e5](https://github.com/flair-sdk/typescript/commit/eac51e5b0b4d1dc85e92902c507d1e8bed41008a))





## 2.42.8 (2022-11-09)


### Bug Fixes

* update axios get hook to avoid response checks ([92cfb6c](https://github.com/flair-sdk/typescript/commit/92cfb6c3e51aeeaec7c495a355aaff2e22cc80fc))





## 2.42.7 (2022-11-08)


### Bug Fixes

* open http links in a new tab ([008af2e](https://github.com/flair-sdk/typescript/commit/008af2e8af03019f47bc9933d7c8883d3c712972))





## 2.42.6 (2022-11-08)


### Bug Fixes

* put condition of window everywhere for next.js ([200b37d](https://github.com/flair-sdk/typescript/commit/200b37d5bbd3fa9b592dcc96779899efefc69355))





## 2.42.5 (2022-11-08)


### Bug Fixes

* handle desktop and mobile differently ([28f1033](https://github.com/flair-sdk/typescript/commit/28f1033a85890ab4f46517069b46145bff70411e))





## 2.42.4 (2022-11-08)


### Bug Fixes

* allow setting class name for tiered sales selectoe ([c61da81](https://github.com/flair-sdk/typescript/commit/c61da81088a40f175a7ac9052d04567ebab5ec15))





## 2.42.3 (2022-11-08)


### Bug Fixes

* better responsiveness for wallet options ([965633e](https://github.com/flair-sdk/typescript/commit/965633e904bc1ac00e2df81c58ade9ae1ba5a142))





## 2.42.2 (2022-11-08)


### Bug Fixes

* show wc modal even for deeplinks for more robust ux ([ed40a77](https://github.com/flair-sdk/typescript/commit/ed40a774dc9423f7506284cae2050b50283ddea6))





## 2.42.1 (2022-11-08)


### Bug Fixes

* do not show walelt connect qrcode for deep links ([690d9dc](https://github.com/flair-sdk/typescript/commit/690d9dc55a2455c489b765d6e9133b7138baf1e7))





# 2.42.0 (2022-11-08)


### Features

* open wallet connect deep links after connecting ([fa8596c](https://github.com/flair-sdk/typescript/commit/fa8596c582c3b425a11a5ba32e4e79d7904104da))





# 2.41.0 (2022-11-07)


### Features

* add more wallets as deeplinks ([09873fd](https://github.com/flair-sdk/typescript/commit/09873fd03c49e0c4cd227b7c7e34f2aadb1d90ef))





## 2.40.2 (2022-11-07)

**Note:** Version bump only for package @flair-sdk/common





## 2.40.1 (2022-11-07)


### Bug Fixes

* correct call to add torus plugin ([14abfc7](https://github.com/flair-sdk/typescript/commit/14abfc777876a4163d520d0370b13174c0b9c2f5))





# 2.40.0 (2022-11-07)


### Features

* add torus wallet option ([f947fc1](https://github.com/flair-sdk/typescript/commit/f947fc16049fae8681274a6ab40d289fec523659))





## 2.39.2 (2022-11-07)


### Bug Fixes

* add the dark mode class to html tag ([82b35ae](https://github.com/flair-sdk/typescript/commit/82b35ae7f9c8f46d43fed5e1edaa2faccd63451f))





## 2.39.1 (2022-11-07)


### Bug Fixes

* immediately apply dark mode if changed ([23028fc](https://github.com/flair-sdk/typescript/commit/23028fce072b33ae2a363b460b2fa02b050e39e8))





# 2.39.0 (2022-11-07)


### Features

* allow setting dark mode dynamically ([0c35e15](https://github.com/flair-sdk/typescript/commit/0c35e15c2212181899a931abe64a0d6ba471f03a))





## 2.38.1 (2022-11-07)


### Bug Fixes

* dark mode for magic and correct icon for injected ([50679bf](https://github.com/flair-sdk/typescript/commit/50679bfaba6fa80f842e55ba2efb2f8ebf32796e))





# 2.38.0 (2022-11-04)


### Features

* simpler connect palette and select account on connect for metamask ([e3028fb](https://github.com/flair-sdk/typescript/commit/e3028fb41617ab77163066d16bd7a3ff307638b7))





## 2.37.3 (2022-10-25)

**Note:** Version bump only for package @flair-sdk/common





## 2.37.2 (2022-10-25)


### Bug Fixes

* add status checks for loading var ([0b43db9](https://github.com/flair-sdk/typescript/commit/0b43db92e3d0742bf1c6ada085bd7a5bd731b6a5))





## 2.37.1 (2022-10-24)

**Note:** Version bump only for package @flair-sdk/common





# 2.37.0 (2022-10-24)


### Features

* enable custodial wallet by default ([06932ba](https://github.com/flair-sdk/typescript/commit/06932ba1ecb23c4ec99a111556ca4f8ac6a3aede))





## 2.36.4 (2022-10-24)


### Bug Fixes

* remove extra underlines from classname ([d957599](https://github.com/flair-sdk/typescript/commit/d957599eeb780481519707bf260b751c9c388cea))





## 2.36.3 (2022-10-24)

**Note:** Version bump only for package @flair-sdk/common





## 2.36.2 (2022-10-24)


### Bug Fixes

* remove unused arguments ([95fd0d7](https://github.com/flair-sdk/typescript/commit/95fd0d746383c4f8d4ffede98135b8d9268a511e))





## 2.36.1 (2022-10-22)


### Bug Fixes

* correct type for decimals hook ([e6daec9](https://github.com/flair-sdk/typescript/commit/e6daec9595900f2840d37c15625a8373c514302e))





# 2.36.0 (2022-10-22)


### Features

* add decimals locked hook ([bd21f61](https://github.com/flair-sdk/typescript/commit/bd21f615127346632f221930ae10fc0843698059))





## 2.35.2 (2022-10-22)


### Bug Fixes

* put alchemy on highest priority ([d4611a8](https://github.com/flair-sdk/typescript/commit/d4611a8236e2d1458f0846f93f525498b1d4c395))





## 2.35.1 (2022-10-22)


### Bug Fixes

* disable auto watch for balance ([d2ce369](https://github.com/flair-sdk/typescript/commit/d2ce369b1f74cc22dc2af74d3fbd650504997245))





# 2.35.0 (2022-10-21)


### Features

* add basic erc20 hooks and components ([0576e0e](https://github.com/flair-sdk/typescript/commit/0576e0e8d13096602a6b30b3cf0cec7040237513))





# 2.34.0 (2022-10-21)


### Features

* port all new chains ([ca410d2](https://github.com/flair-sdk/typescript/commit/ca410d2769335092d06a01cf8ee61e7df941e699))





## 2.33.1 (2022-10-20)


### Bug Fixes

* send the ramp request periodically ([dedcce8](https://github.com/flair-sdk/typescript/commit/dedcce8a23bb6ceb68344920f2db6836f39fc6f5))





# 2.33.0 (2022-10-20)


### Features

* pass data via messages vs params ([b2d06c8](https://github.com/flair-sdk/typescript/commit/b2d06c805f7cb3ae000044310dbbdffd0db5fe70))





## 2.32.2 (2022-10-20)


### Bug Fixes

* only capture insufficient funds exceptions ([18bae4b](https://github.com/flair-sdk/typescript/commit/18bae4b072979eed331463e2d88da0b8ab51257c))





## 2.32.1 (2022-10-19)


### Bug Fixes

* export balance package ([7d59e3d](https://github.com/flair-sdk/typescript/commit/7d59e3d9e6181abaa2ce708bf2ffd0ed38566848))





# 2.32.0 (2022-10-19)


### Features

* port various improvements from new dashboard ([#2](https://github.com/flair-sdk/typescript/issues/2)) ([b2230e4](https://github.com/flair-sdk/typescript/commit/b2230e408631b109a8ce4a8dca74a776a7a294ca))





## 2.31.2 (2022-10-11)


### Bug Fixes

* ignore analysis error ([7c2e1f0](https://github.com/flair-sdk/typescript/commit/7c2e1f0ffb9c1b6023ce1ae0478c793325b9f7dd))





## 2.31.1 (2022-10-11)


### Bug Fixes

* put correct defaults when calculating eligible amount ([001ff23](https://github.com/flair-sdk/typescript/commit/001ff237b46529d0be402cdedd04885bba7a6ae5))





# 2.31.0 (2022-10-11)


### Features

* more robust eligible amount calculation ([4b431dd](https://github.com/flair-sdk/typescript/commit/4b431dd24422688d8325d252577a23625fcdfd2c))





# 2.30.0 (2022-10-10)


### Features

* more suitable connect dialog for embeds ([d2b2e3c](https://github.com/flair-sdk/typescript/commit/d2b2e3ce983bad44ba2a9bcb5d252ffe13139c01))





# 2.29.0 (2022-10-10)


### Features

* hide tier selector if less than 2 available options ([8d5b780](https://github.com/flair-sdk/typescript/commit/8d5b78058d96d3af325bab098859260145a5318a))





## 2.28.1 (2022-10-10)


### Bug Fixes

* use the same confirmations number within the write hook ([e116f40](https://github.com/flair-sdk/typescript/commit/e116f405925dc9d599b63d976376c6c4af9b0eec))





# 2.28.0 (2022-10-10)


### Features

* allow normalizing tiers config only ([2d4db89](https://github.com/flair-sdk/typescript/commit/2d4db893d6ffbb34a257da45d1e52a9af802d6ff))





## 2.27.5 (2022-10-10)


### Bug Fixes

* disable caching for multicall read by default ([09010a9](https://github.com/flair-sdk/typescript/commit/09010a967c0df4acec21cb7e0ee19bb3ddc044c6))





## 2.27.4 (2022-10-10)


### Bug Fixes

* remove isStale condition for tier detection ([7e3f5c6](https://github.com/flair-sdk/typescript/commit/7e3f5c6cec795abf12cb822dbc30c53d7ab4bd6b))





## 2.27.3 (2022-10-10)


### Bug Fixes

* disable caching of tiers temporarily ([fe9d021](https://github.com/flair-sdk/typescript/commit/fe9d021f344a03ac35353971cf90d881cbdde711))





## 2.27.2 (2022-10-10)


### Bug Fixes

* merge both configs and tiers enrichment states ([4d3f404](https://github.com/flair-sdk/typescript/commit/4d3f404f16e0dd827e9b81ca3b2a5509ff60aaab))





## 2.27.1 (2022-10-10)


### Bug Fixes

* avoid detecting tier when data is stale ([7d028b3](https://github.com/flair-sdk/typescript/commit/7d028b3a4284b2c675fa34ecd9b78c7f130d004d))





# 2.27.0 (2022-10-10)


### Features

* move supply and metadata hooks to modules ([14e5eaa](https://github.com/flair-sdk/typescript/commit/14e5eaa958ab683b49d30a33743ecf47e115ce1e))





# 2.26.0 (2022-10-09)


### Features

* make listeners async and execute one by one ([bc80e02](https://github.com/flair-sdk/typescript/commit/bc80e02bb0c1297b61d3b2393279be243f538f59))





# 2.25.0 (2022-10-09)


### Features

* allow registering and invoking listeners for diamond provider ([49a985b](https://github.com/flair-sdk/typescript/commit/49a985b06fff39a5a67ad0e46c83b40a76d19996))





## 2.24.2 (2022-10-09)


### Bug Fixes

* remove unnecessary import ([9f9888c](https://github.com/flair-sdk/typescript/commit/9f9888c54b111ea13cc24e0a947d9922158ca2af))





## 2.24.1 (2022-10-09)

**Note:** Version bump only for package @flair-sdk/common





# 2.24.0 (2022-10-09)


### Features

* merge states of multiple hooks for erc1155 tokens ([d7fa20e](https://github.com/flair-sdk/typescript/commit/d7fa20e94614f9e8120cc61588422a8b1980b918))





## 2.23.5 (2022-10-09)


### Bug Fixes

* expose fetchStatus on tokens hook ([c49420b](https://github.com/flair-sdk/typescript/commit/c49420bdaeb2755804f4cb74320bce400426a8da))





## 2.23.4 (2022-10-09)


### Bug Fixes

* consistent naming for proposed calls vars ([85398ce](https://github.com/flair-sdk/typescript/commit/85398ceab037986982046ea8d80e925a71423764))





## 2.23.3 (2022-10-07)


### Bug Fixes

* correct function interface for tier to token ids hook ([da59ec3](https://github.com/flair-sdk/typescript/commit/da59ec33630e249240ac467257751bf00f86da86))





## 2.23.2 (2022-10-07)


### Bug Fixes

* correctly export the success dialog ([2d4f26d](https://github.com/flair-sdk/typescript/commit/2d4f26d46804b15a7436f00ebb7d8fcadadbf6d3))





## 2.23.1 (2022-10-07)


### Bug Fixes

* correct calculation of contract interface on read hook ([5081125](https://github.com/flair-sdk/typescript/commit/5081125e182424ac05fd2bc33e1c0a532c5ee72a))





# 2.23.0 (2022-10-07)


### Features

* remove dependency on contract interfaces for tiered sales hooks ([85d85e0](https://github.com/flair-sdk/typescript/commit/85d85e07ae986a15f35c3662dccef4877e3a1c13))





## 2.22.3 (2022-10-07)


### Bug Fixes

* typo in class name ([60b9beb](https://github.com/flair-sdk/typescript/commit/60b9beb0e229b795a3c7c9976af173b9f28456fd))





## 2.22.2 (2022-10-07)


### Bug Fixes

* various imports and wrong dep on styled-components ([3c3e11b](https://github.com/flair-sdk/typescript/commit/3c3e11b6db8db30cbc0aeecd99a4435b45ac8fef))





## 2.22.1 (2022-10-07)

**Note:** Version bump only for package @flair-sdk/common





# 2.22.0 (2022-10-07)


### Features

* add class names to minting section component ([792a99d](https://github.com/flair-sdk/typescript/commit/792a99d4533b2957dd16743e7ef318e531deb594))





# 2.21.0 (2022-10-07)


### Features

* port success dialog to sdk ([ebb78e8](https://github.com/flair-sdk/typescript/commit/ebb78e8da16f44b6d3693854422d6a0a8ee89b7a))





## 2.20.5 (2022-10-06)


### Bug Fixes

* preserve values in multicall read hook ([5cb66f6](https://github.com/flair-sdk/typescript/commit/5cb66f6a6b2414dc7095951c95a2c1e38938eebb))





## 2.20.4 (2022-10-06)


### Bug Fixes

* add missing () for metadata hook ([ad30589](https://github.com/flair-sdk/typescript/commit/ad30589ae5276d6b85da631bc243e5109a4a0de3))





## 2.20.3 (2022-10-06)


### Bug Fixes

* uriSuffix hook function name and remove feature hooks ([525d37e](https://github.com/flair-sdk/typescript/commit/525d37e1dd2f3426f31fa3588bd514a3961cb357))





## 2.20.2 (2022-10-06)


### Bug Fixes

* remove dependency on contracts abis in metadata hooks ([a6b4a9c](https://github.com/flair-sdk/typescript/commit/a6b4a9c88cdfdef0856b6e5694ab45c90a87dc6f))





## 2.20.1 (2022-10-06)


### Bug Fixes

* correct import path for ipfs normalizer ([0cf6c3a](https://github.com/flair-sdk/typescript/commit/0cf6c3a31b6129022fdf57f33efcb77c73024123))





# 2.20.0 (2022-10-06)


### Features

* port tiered sales components ([10fd9d3](https://github.com/flair-sdk/typescript/commit/10fd9d33388862260b46abadcb92dc5ad7fbf6d6))





## 2.19.6 (2022-10-06)


### Bug Fixes

* lower cache time ([9a3063e](https://github.com/flair-sdk/typescript/commit/9a3063eb84cdf543e4523440e537c900d9b296e8))





## 2.19.5 (2022-10-05)

**Note:** Version bump only for package @flair-sdk/common





## 2.19.4 (2022-10-05)


### Bug Fixes

* use named return vars for tiers configs ([b623ad4](https://github.com/flair-sdk/typescript/commit/b623ad4c7b45c1abf0ad5ce4faf00375e8501c87))





## 2.19.3 (2022-10-05)


### Bug Fixes

* remove dependency on contract abis ([1637502](https://github.com/flair-sdk/typescript/commit/1637502b51688849333e44c6cfb7f17745d712c7))





## 2.19.2 (2022-10-05)

**Note:** Version bump only for package @flair-sdk/common





## 2.19.1 (2022-10-05)


### Bug Fixes

* add correct return types for sale tiers configs hooks ([4d1b9ed](https://github.com/flair-sdk/typescript/commit/4d1b9eda71893ceecdf570f26b3549e6e6e72659))





# 2.19.0 (2022-10-05)


### Features

* allow defining the interface on call-level ([3f44765](https://github.com/flair-sdk/typescript/commit/3f44765c6dcfa273a3c18d3570382c9bc966da34))





# 2.18.0 (2022-10-05)


### Features

* default to contractInterface if provided on useContractRead ([35c9f2a](https://github.com/flair-sdk/typescript/commit/35c9f2ace735455e338761bd8ae6394b00ffbd41))





## 2.17.1 (2022-10-04)


### Bug Fixes

* more robust crypto value component ([d0b90e6](https://github.com/flair-sdk/typescript/commit/d0b90e6c225d31ec6476f7703bf1da9ed414b855))





# 2.17.0 (2022-10-04)


### Features

* remove facet lookups and no dependency on contracts registry ([10bfee2](https://github.com/flair-sdk/typescript/commit/10bfee2333b69fd686b3d45e6e55d5549eefc182))





## 2.16.8 (2022-10-03)


### Bug Fixes

* use correct variable for mint count ([f6e0151](https://github.com/flair-sdk/typescript/commit/f6e0151e382dfcc954bf14ebce556cfbb9e90487))





## 2.16.7 (2022-10-03)


### Bug Fixes

* remove confirmations from wait method ([b309f81](https://github.com/flair-sdk/typescript/commit/b309f810d3e9cffd506aea9b023971c5b977f08d))





## 2.16.6 (2022-10-03)


### Bug Fixes

* prepare mint write only if all vars are ready and use correct price ([fbcbf09](https://github.com/flair-sdk/typescript/commit/fbcbf0995f7c743939dfd641027b3a36faae94c4))





## 2.16.5 (2022-10-03)

**Note:** Version bump only for package @flair-sdk/common





## 2.16.4 (2022-10-03)


### Bug Fixes

* only prepare if all required params are provided ([591f968](https://github.com/flair-sdk/typescript/commit/591f968d9a14fdd0ae5f39e7d915fbed4cd1640f))





## 2.16.3 (2022-10-03)

**Note:** Version bump only for package @flair-sdk/common





## 2.16.2 (2022-10-03)


### Bug Fixes

* remove unused deps and more robust window access ([a09621c](https://github.com/flair-sdk/typescript/commit/a09621cf95da6c296a553b317c29eb41c9880571))





## 2.16.1 (2022-10-03)


### Bug Fixes

* sane defaults for tiered sales hooks ([6cfe4dd](https://github.com/flair-sdk/typescript/commit/6cfe4dd7f1f53103cca646a38781ca43828d90d0))





# 2.16.0 (2022-10-03)


### Features

* add prepare error and loading variables to contract write hook ([31b1c0b](https://github.com/flair-sdk/typescript/commit/31b1c0b466fb39e3df655b823fa5a3e58380c584))





## 2.15.2 (2022-10-02)


### Bug Fixes

* correctly deserialize bignumber ([65b990a](https://github.com/flair-sdk/typescript/commit/65b990accd14fc2e615e1483f7b9eeba09456d41))





## 2.15.1 (2022-10-02)


### Bug Fixes

* remove active chain dependency ([1950e22](https://github.com/flair-sdk/typescript/commit/1950e2266ca590f2ff4084d851a2ded62e7d0eb3))





# 2.15.0 (2022-10-02)


### Features

* separate injected from metamask wallet ([be4b07a](https://github.com/flair-sdk/typescript/commit/be4b07ae0c15f5a9c865d35efb639d4587941336))





# 2.14.0 (2022-10-02)


### Features

* add multicall hooks and update sale tiers ([b37ed6e](https://github.com/flair-sdk/typescript/commit/b37ed6e7a651c5efa69d1649a66582fc5683c265))





# 2.13.0 (2022-10-02)


### Features

* pass prepared data via hook ([80d97fe](https://github.com/flair-sdk/typescript/commit/80d97fec4adbff6429004e2beb5633791224522e))





## 2.12.13 (2022-10-02)


### Bug Fixes

* remove storybook for now ([d383a7f](https://github.com/flair-sdk/typescript/commit/d383a7f2488ca9e8d08af92f373305328427e9ae))





## 2.12.12 (2022-10-02)


### Bug Fixes

* fetch all 10 tiers ([154a2c6](https://github.com/flair-sdk/typescript/commit/154a2c6a0dba907b81c48ea26d32bb7b24b09ea9))





## 2.12.11 (2022-10-01)

**Note:** Version bump only for package @flair-sdk/common





## 2.12.10 (2022-10-01)


### Bug Fixes

* more robust crypto value component ([9fb5082](https://github.com/flair-sdk/typescript/commit/9fb5082b7b57ed0a0a0ac188f16770b0c0f6bcf0))





## 2.12.9 (2022-10-01)


### Bug Fixes

* normalize tiers dictrionary and set sane cache defaults ([3bec871](https://github.com/flair-sdk/typescript/commit/3bec871615934aa945f5f3eb5c8ac567d14a3a50))





## 2.12.8 (2022-10-01)

**Note:** Version bump only for package @flair-sdk/common





## 2.12.7 (2022-10-01)


### Bug Fixes

* backward compatible react-query behavior ([b7cdb43](https://github.com/flair-sdk/typescript/commit/b7cdb433c71f444739d199a09bd42c9b0942a71e))





## 2.12.6 (2022-09-30)


### Bug Fixes

* check if tier id is undefined ([5dc359d](https://github.com/flair-sdk/typescript/commit/5dc359d5b8b07fa9489e5bd6a74ca4efe69e2339))





## 2.12.5 (2022-09-30)


### Bug Fixes

* isEligible variable ([e635ce4](https://github.com/flair-sdk/typescript/commit/e635ce41be8602bfe2edd330279e0d0df3ccce21))





## 2.12.4 (2022-09-30)


### Bug Fixes

* remove multiplexing when using react query ([718cc4d](https://github.com/flair-sdk/typescript/commit/718cc4df917ad69083b25535f65e2060998dea84))





## 2.12.3 (2022-09-30)


### Bug Fixes

* pass minter address as part of query context ([c803109](https://github.com/flair-sdk/typescript/commit/c80310975ac1e7f179856324ae0cc88e39694924))





## 2.12.2 (2022-09-30)


### Bug Fixes

* always calculate allowlist and eligible amount ([8c18dd9](https://github.com/flair-sdk/typescript/commit/8c18dd9756fe6c72f0f951cec8319a78a4044b26))





## 2.12.1 (2022-09-30)


### Bug Fixes

* remove unnecessary variables from sale tiers hook ([b9ce0ce](https://github.com/flair-sdk/typescript/commit/b9ce0cecafb4f950a55fcdc3148fc29658d6b6c9))





# 2.12.0 (2022-09-30)


### Features

* use react query when fetching tiers ([f591461](https://github.com/flair-sdk/typescript/commit/f59146158327948f34cd3966f2601531adb6d856))





# 2.11.0 (2022-09-30)


### Features

* update detection to consider more rules ([cd90765](https://github.com/flair-sdk/typescript/commit/cd90765c7a91b08e7d352305cae23140deda791e))





## 2.10.2 (2022-09-29)


### Bug Fixes

* decouple auto-detection from auto-selection of tiers ([f4abfe1](https://github.com/flair-sdk/typescript/commit/f4abfe1cfe96353c4d3de55b9b050a0543405edc))





## 2.10.1 (2022-09-29)


### Bug Fixes

* add missing vars in sales provider ([fe3bb0b](https://github.com/flair-sdk/typescript/commit/fe3bb0b42659a0bf95fb21726b1c37f2164ee05a))





# 2.10.0 (2022-09-29)


### Features

* add mint success handler ([d40ea32](https://github.com/flair-sdk/typescript/commit/d40ea326460e0ae1b06e1332a8a085a65ebd3454))





## 2.9.10 (2022-09-29)

**Note:** Version bump only for package @flair-sdk/common





## 2.9.9 (2022-09-28)


### Bug Fixes

* remove check for loading in refetch hook ([04865cb](https://github.com/flair-sdk/typescript/commit/04865cbb92cb59baac8aa82939c4060a98458e4d))





## 2.9.8 (2022-09-28)


### Bug Fixes

* set loading to true initially when fetching tiers ([bcd5fbb](https://github.com/flair-sdk/typescript/commit/bcd5fbb0201620c095935cdab7afb758a347bbee))





## 2.9.7 (2022-09-28)

**Note:** Version bump only for package @flair-sdk/common





## 2.9.6 (2022-09-28)

**Note:** Version bump only for package @flair-sdk/common





## 2.9.5 (2022-09-26)

**Note:** Version bump only for package @flair-sdk/common





## 2.9.4 (2022-09-26)


### Bug Fixes

* fetch tiers after contract abi is loaded ([7a76e91](https://github.com/flair-sdk/typescript/commit/7a76e91f1f7abdbedad9e61c29cbba6ecf58e0b9))





## 2.9.3 (2022-09-26)


### Bug Fixes

* fetch tiers after contract is constructed ([7d9ceef](https://github.com/flair-sdk/typescript/commit/7d9ceef6c21e41937a4a15af4f5b36700c0f1407))





## 2.9.2 (2022-09-26)


### Bug Fixes

* fetching tiers of a tiered sales ([d501712](https://github.com/flair-sdk/typescript/commit/d50171271d570fdbffa5963d5c3f6d22e357fe2b))





## 2.9.1 (2022-09-26)


### Bug Fixes

* create contract from abi vs typechain factory ([a09a2b5](https://github.com/flair-sdk/typescript/commit/a09a2b5b1cccf390ef2b5fadc38655422270ba46))





# 2.9.0 (2022-09-26)


### Features

* add tiered sales module ([9fb9aa8](https://github.com/flair-sdk/typescript/commit/9fb9aa839161195f21e744e5f8676ed98e106ae5))





# 2.8.0 (2022-09-26)


### Features

* add func to find facet by reference ([050aee7](https://github.com/flair-sdk/typescript/commit/050aee7dade2dc8bb3b882aaf2f709ed806117de))





## 2.7.2 (2022-09-25)

**Note:** Version bump only for package @flair-sdk/common





## 2.7.1 (2022-09-25)

**Note:** Version bump only for package @flair-sdk/common





# 2.7.0 (2022-09-25)


### Features

* use the new registry and contract reference model ([733b4aa](https://github.com/flair-sdk/typescript/commit/733b4aa2a0ed5777bd8514ac9b2c31df9e473a5b))





# 2.6.0 (2022-09-25)


### Features

* update facet manifest and set all peers deps as optional ([b5d344b](https://github.com/flair-sdk/typescript/commit/b5d344b4f8b1fc9190ad498a8fb1786b12ca7b49))





## 2.5.4 (2022-09-25)


### Bug Fixes

* avoid calling when tierId is null ([27c1e5a](https://github.com/flair-sdk/typescript/commit/27c1e5a5ea8e1d50c3e9a0d146f1d5f287d36c62))





## 2.5.3 (2022-09-24)


### Bug Fixes

* allow setting current tier when auto detection is off ([30a48b5](https://github.com/flair-sdk/typescript/commit/30a48b5240692892cb28ab56701d515be24f179d))





## 2.5.2 (2022-09-24)


### Bug Fixes

* enable fetching of sale tiers in minting provider ([32210e8](https://github.com/flair-sdk/typescript/commit/32210e80c272d3124a70628b6885a33ced9a8161))





## 2.5.1 (2022-09-24)


### Bug Fixes

* enable sale minter by default ([dfb3d55](https://github.com/flair-sdk/typescript/commit/dfb3d554553f20476e9ddc41350621edbc2c5c9a))





# 2.5.0 (2022-09-24)


### Features

* allow overriding patch request call ([41d4751](https://github.com/flair-sdk/typescript/commit/41d4751e07a5370f8d9631f85e1f986eeabcaee4))





## 2.4.1 (2022-09-23)


### Bug Fixes

* streamlined metadata uri calculation ([dc3b35e](https://github.com/flair-sdk/typescript/commit/dc3b35e720303b97b78af54af437f0b59ec30ae9))





# 2.4.0 (2022-09-23)


### Features

* add batch operations for supply tracking ([791d4bd](https://github.com/flair-sdk/typescript/commit/791d4bd1340f4d9570a4d0a62cc085017aa03927))





## 2.3.4 (2022-09-23)


### Bug Fixes

* use consistent name for address ([72ff623](https://github.com/flair-sdk/typescript/commit/72ff62370ff95fa484535315f361a2552f7716e0))





## 2.3.3 (2022-09-22)


### Bug Fixes

* correct type for contract read ([0b5619e](https://github.com/flair-sdk/typescript/commit/0b5619ed802da0d8db092034416e554f58b1f365))





## 2.3.2 (2022-09-22)

**Note:** Version bump only for package @flair-sdk/common





## 2.3.1 (2022-09-22)

**Note:** Version bump only for package @flair-sdk/common





# 2.3.0 (2022-09-22)


### Features

* update contracts for new functions ([263798f](https://github.com/flair-sdk/typescript/commit/263798ff51eabe14c73a14a2cfb50493183fa4f3))





## 2.2.1 (2022-09-21)

**Note:** Version bump only for package @flair-sdk/common





# 2.2.0 (2022-09-21)


### Features

* bump up contracts to add new facets ([7e22a59](https://github.com/flair-sdk/typescript/commit/7e22a590c4c4779f9382a48fee9b4a8c31be7f4e))





## 2.1.2 (2022-09-21)


### Bug Fixes

* enable fetching tiers by default ([db7f3e0](https://github.com/flair-sdk/typescript/commit/db7f3e07beb811a1463c5553d60842bd5c9451be))





## 2.1.1 (2022-09-21)


### Bug Fixes

* auto fetch tiers when contract address is available ([7c4cee4](https://github.com/flair-sdk/typescript/commit/7c4cee4c34a83835682643c09d97f07d2465da4a))





# 2.1.0 (2022-09-21)


### Features

* remove simple sales and support new architecture ([#1](https://github.com/flair-sdk/typescript/issues/1)) ([80d87aa](https://github.com/flair-sdk/typescript/commit/80d87aaa72c2bf1f927118b218348290377845c1))





## 2.0.18 (2022-09-20)


### Bug Fixes

* export facet manifest ([4aae5ab](https://github.com/flair-sdk/typescript/commit/4aae5ab520b851a4ee577afcde27ba53232af106))





## 2.0.17 (2022-09-20)

**Note:** Version bump only for package @flair-sdk/common





## 2.0.2 (2022-09-20)

**Note:** Version bump only for package @flair-sdk/common





## 2.0.1 (2022-09-20)

**Note:** Version bump only for package @flair-sdk/common
