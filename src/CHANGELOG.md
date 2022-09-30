# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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

**Note:** Version bump only for package @flair-sdk/stories





## 2.9.9 (2022-09-28)


### Bug Fixes

* remove check for loading in refetch hook ([04865cb](https://github.com/flair-sdk/typescript/commit/04865cbb92cb59baac8aa82939c4060a98458e4d))





## 2.9.8 (2022-09-28)


### Bug Fixes

* set loading to true initially when fetching tiers ([bcd5fbb](https://github.com/flair-sdk/typescript/commit/bcd5fbb0201620c095935cdab7afb758a347bbee))





## 2.9.7 (2022-09-28)

**Note:** Version bump only for package @flair-sdk/stories





## 2.9.6 (2022-09-28)

**Note:** Version bump only for package @flair-sdk/stories





## 2.9.5 (2022-09-26)

**Note:** Version bump only for package @flair-sdk/stories





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

**Note:** Version bump only for package @flair-sdk/stories





## 2.7.1 (2022-09-25)

**Note:** Version bump only for package @flair-sdk/stories





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

**Note:** Version bump only for package @flair-sdk/stories





## 2.3.1 (2022-09-22)

**Note:** Version bump only for package @flair-sdk/stories





# 2.3.0 (2022-09-22)


### Features

* update contracts for new functions ([263798f](https://github.com/flair-sdk/typescript/commit/263798ff51eabe14c73a14a2cfb50493183fa4f3))





## 2.2.1 (2022-09-21)

**Note:** Version bump only for package @flair-sdk/stories





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

**Note:** Version bump only for package @flair-sdk/stories





## 2.0.2 (2022-09-20)

**Note:** Version bump only for package @flair-sdk/stories





## 2.0.1 (2022-09-20)

**Note:** Version bump only for package @flair-sdk/stories
