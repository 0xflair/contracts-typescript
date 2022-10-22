# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
