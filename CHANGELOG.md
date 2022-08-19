# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.103.0 (2022-08-19)


### Features

* export isolated css styles for wallet ([#14](https://github.com/0xflair/typescript-sdk/issues/14)) ([0c55ec5](https://github.com/0xflair/typescript-sdk/commit/0c55ec5023f5dac8fca43d9a8afb86626d72639c))





## 0.102.1 (2022-08-16)


### Bug Fixes

* export reserved supply component ([40481a6](https://github.com/0xflair/typescript-sdk/commit/40481a6f7dc6dac0ae9a6fedf50636a2e645d77a))





# 0.102.0 (2022-08-16)


### Features

* allow passing number of mints when calculating the price ([a497c91](https://github.com/0xflair/typescript-sdk/commit/a497c910f46f9f455d3c1fb6bf8dfded23a25a3f))





## 0.101.1 (2022-08-16)


### Bug Fixes

* use consistent naming for tier supply hooks and components ([7f5b58f](https://github.com/0xflair/typescript-sdk/commit/7f5b58f7f813759caecb573e50e5338d9261367b))





# 0.101.0 (2022-08-16)


### Features

* automatically detect simple sales tiers ([#13](https://github.com/0xflair/typescript-sdk/issues/13)) ([d475cd5](https://github.com/0xflair/typescript-sdk/commit/d475cd5c48e4549e92fbc85ec3b369e849ba9cb0))





## 0.100.3 (2022-08-15)


### Bug Fixes

* friendly error messages ([4311ed1](https://github.com/0xflair/typescript-sdk/commit/4311ed138ff28a758ff715f2a3bfc95a568f2f71))





## 0.100.2 (2022-08-15)


### Bug Fixes

* select a no allowlist tier if active ([ea844fc](https://github.com/0xflair/typescript-sdk/commit/ea844fca0bf7bdf192a26caeb2efacb2a0d407dc))





## 0.100.1 (2022-08-15)


### Bug Fixes

* reset eligiblity when tier id is changed ([81a9d3d](https://github.com/0xflair/typescript-sdk/commit/81a9d3d7d0183ed6680155ddb9c468a765d6f7d0))





# 0.100.0 (2022-08-15)


### Features

* allow calling hook actions async ([44640e1](https://github.com/0xflair/typescript-sdk/commit/44640e1e161ee87f3c2db36eef4e7ba81edd56d4))





## 0.99.5 (2022-08-15)


### Bug Fixes

* disable caching for status, eligiblity and allowlist checking ([3200cd3](https://github.com/0xflair/typescript-sdk/commit/3200cd30c44dc31d7089ed0406356c34c30cfa84))





## 0.99.4 (2022-08-14)


### Bug Fixes

* allow testing a wallet address and remove cache for eligibility ([4e0c643](https://github.com/0xflair/typescript-sdk/commit/4e0c6436f1c2109859b13c70b454bb51174344c0))





## 0.99.3 (2022-08-12)


### Bug Fixes

* detect tiers even if wallet is not connected ([7488e17](https://github.com/0xflair/typescript-sdk/commit/7488e1725a39807c923812a19c2a4483c96f52cf))





## 0.99.2 (2022-08-12)


### Bug Fixes

* check against exact undefined ([7f7a6e3](https://github.com/0xflair/typescript-sdk/commit/7f7a6e3b1ab2b6b4d7eaa4ab9c7938e76c1ccf0f))





## 0.99.1 (2022-08-12)


### Bug Fixes

* use undefined until eligiblity is actually checked ([6e0ed51](https://github.com/0xflair/typescript-sdk/commit/6e0ed51bfe241ce6cc593852402e3ee05e631881))





# 0.99.0 (2022-08-12)


### Features

* allow passing default tier to minting section component ([0be78d5](https://github.com/0xflair/typescript-sdk/commit/0be78d5a4e38becc4dc8c2cf3acbebe5f8889730))





## 0.98.2 (2022-08-11)


### Bug Fixes

* always lower-case the merkle tree ([f164833](https://github.com/0xflair/typescript-sdk/commit/f164833f9cac4bc3a3933ee527661df91549d430))





## 0.98.1 (2022-08-11)


### Bug Fixes

* update packages ([e5c2e9f](https://github.com/0xflair/typescript-sdk/commit/e5c2e9fa37c018f95d50f059e8ad5b25b8d7baba))





# 0.98.0 (2022-08-10)


### Features

* add binance chain info ([69800d2](https://github.com/0xflair/typescript-sdk/commit/69800d22117d183deccf50a2976d75e4d2e061b5))





## 0.97.9 (2022-08-09)


### Bug Fixes

* less aggressive query for wallet nfts ([80157e5](https://github.com/0xflair/typescript-sdk/commit/80157e5eaf1a4f07e2ae58ea365897e0d4da2b43))





## 0.97.8 (2022-08-09)


### Bug Fixes

* load wallet nfts on new blocks ([c31f742](https://github.com/0xflair/typescript-sdk/commit/c31f742ca4b6e5bc8be4181072c83187ca811f54))





## 0.97.7 (2022-08-09)


### Bug Fixes

* correct order of hooks ([23d7d5c](https://github.com/0xflair/typescript-sdk/commit/23d7d5c7abf416076eec6b0a04ad30a0312b8698))





## 0.97.6 (2022-08-09)


### Bug Fixes

* correctly account for unstaked tokens ([e301839](https://github.com/0xflair/typescript-sdk/commit/e301839ba577aa8e8803cb06776f98dc2bb5aa23))





## 0.97.5 (2022-08-09)


### Bug Fixes

* coingecko mapping for crypto prices ([057f60c](https://github.com/0xflair/typescript-sdk/commit/057f60c01d276446da9da00dd55817f67e636e1a))





## 0.97.4 (2022-08-09)


### Bug Fixes

* only fetch unlocked if supports lockable extension ([a64cbf2](https://github.com/0xflair/typescript-sdk/commit/a64cbf2720ac7ceabbf7c6c5a3a4ff0ae8f70ecf))





## 0.97.3 (2022-08-09)


### Bug Fixes

* import factories from contracts registry ([c7b9baf](https://github.com/0xflair/typescript-sdk/commit/c7b9baf11bafd7b22245242c6cf35733dec111dd))





## 0.97.2 (2022-08-09)


### Bug Fixes

* add humanize lib in peer deeps ([77d7bb0](https://github.com/0xflair/typescript-sdk/commit/77d7bb05e4c65d9963a988ee639ca4711f321680))





## 0.97.1 (2022-08-09)


### Bug Fixes

* get provider from hooks ([430cb47](https://github.com/0xflair/typescript-sdk/commit/430cb47b7884fd12b8430ebd8897b68b6bdaff23))





# 0.97.0 (2022-08-09)


### Features

* get provider from hooks ([f2be6b4](https://github.com/0xflair/typescript-sdk/commit/f2be6b4c997066e0ebe84c03a531d93b609ba09b))





## 0.96.4 (2022-08-09)


### Bug Fixes

* specify network id to avoid breaking wagmi ([939eefb](https://github.com/0xflair/typescript-sdk/commit/939eefbaab6e21904aff75ce0045bc163b30a077))





## 0.96.3 (2022-08-09)


### Bug Fixes

* use defined rpc urls vs default providers ([59b7151](https://github.com/0xflair/typescript-sdk/commit/59b7151af19fe5938742b6c9f0efaf27dbd94ebf))





## 0.96.2 (2022-08-07)


### Bug Fixes

* multiplexing of smart contract information ([4e421ab](https://github.com/0xflair/typescript-sdk/commit/4e421ab72efdece97a639924197443186d6ebda3))





## 0.96.1 (2022-08-07)


### Bug Fixes

* packaging ([284c9fb](https://github.com/0xflair/typescript-sdk/commit/284c9fb48a08a0030081220e38102423b47451e9))





# 0.96.0 (2022-08-06)


### Features

* add evmos and correct avalanche code ([2c23245](https://github.com/0xflair/typescript-sdk/commit/2c2324506762cafb827b7b92b02c1f63afc609ae))





## 0.95.13 (2022-08-06)


### Bug Fixes

* hide the price if no price info ([51e31bc](https://github.com/0xflair/typescript-sdk/commit/51e31bcad3ce1b3ee593c25b57c29e56fa3c69ec))





## 0.95.12 (2022-08-06)


### Bug Fixes

* import paths ([29b41d6](https://github.com/0xflair/typescript-sdk/commit/29b41d6fa908df8a10ccd783cbd90cdddfc69c94))





## 0.95.11 (2022-08-06)


### Bug Fixes

* read flair chains in chain info hook ([a91436c](https://github.com/0xflair/typescript-sdk/commit/a91436cb27ca80ab507d82572b9eab108d8cc9f5))





## 0.95.10 (2022-08-06)


### Bug Fixes

* deploy okc factories + various chain issues ([8dd564c](https://github.com/0xflair/typescript-sdk/commit/8dd564c33ec98162f98ca7576badb30371bc6753))





## 0.95.9 (2022-08-05)


### Bug Fixes

* default to 0 value ([959f05c](https://github.com/0xflair/typescript-sdk/commit/959f05ce9294ea040535371c35b11b143f14a70a))





## 0.95.8 (2022-08-05)


### Bug Fixes

* avoid failing if letters are used in price field ([23a31b8](https://github.com/0xflair/typescript-sdk/commit/23a31b8424236104963bf111d679ff6e7909f190))





## 0.95.7 (2022-08-05)


### Bug Fixes

* refetch tokens in custody after staking ([6edc5d1](https://github.com/0xflair/typescript-sdk/commit/6edc5d1f606a792a156049ee063c645c4c725b31))





## 0.95.6 (2022-08-05)


### Bug Fixes

* avoid fetching smart contract multiple times ([b5f9eba](https://github.com/0xflair/typescript-sdk/commit/b5f9eba762a1cdbe135e5d4694f5e5be74bfc649))





## 0.95.5 (2022-08-05)


### Bug Fixes

* add key for chain view component ([904c12f](https://github.com/0xflair/typescript-sdk/commit/904c12fe9688b5aeaba337e03119069a9dbb3ab3))





## 0.95.4 (2022-08-04)


### Bug Fixes

* remove refetch method from interval ([3c86d90](https://github.com/0xflair/typescript-sdk/commit/3c86d902abbb59ccd9d635f6471897775567e145))





## 0.95.3 (2022-08-04)


### Bug Fixes

* bump up the contracts registry ([5f913b3](https://github.com/0xflair/typescript-sdk/commit/5f913b3e1ef0109e425162454b0d140b24036328))





## 0.95.2 (2022-08-04)


### Bug Fixes

* specify chain for prepare and remove tokens in custody from unlocked array ([b7f4083](https://github.com/0xflair/typescript-sdk/commit/b7f4083292d8da821e027f2f2aad4a68064d9c1e))





## 0.95.1 (2022-08-04)


### Bug Fixes

* include tokens in custody in nfts array ([d4c5a76](https://github.com/0xflair/typescript-sdk/commit/d4c5a766847efc3abc05e17b45b7fff39f254a99))





# 0.95.0 (2022-08-04)


### Features

* add staking duration hooks ([f08465d](https://github.com/0xflair/typescript-sdk/commit/f08465dc3082e79652e3f2f0261d4da9c131fdd1))





# 0.94.0 (2022-08-04)


### Features

* add custodial staking related hooks ([9a640be](https://github.com/0xflair/typescript-sdk/commit/9a640bede0bfec0a6d81b0d09e90a7cea23b018c))





# 0.93.0 (2022-08-04)


### Features

* bump up the contracts registry ([0fda302](https://github.com/0xflair/typescript-sdk/commit/0fda3021a58847edbd31b90d286b859739c12ff8))





## 0.92.7 (2022-08-04)

**Note:** Version bump only for package @0xflair/typescript-sdk





## 0.92.6 (2022-08-03)


### Bug Fixes

* automatically update some data for better ux ([70b1128](https://github.com/0xflair/typescript-sdk/commit/70b112886e10130c9d531747a5f42731abe9a120))





## 0.92.5 (2022-08-03)


### Bug Fixes

* watch the approval status after approving ([db88b58](https://github.com/0xflair/typescript-sdk/commit/db88b58c36020b1868f2b1a1cf9d520b846df8cb))





## 0.92.4 (2022-08-03)


### Bug Fixes

* how preparation is calculated ([34b07fe](https://github.com/0xflair/typescript-sdk/commit/34b07fe68b2e0403cca9a64cba0425db75f80f2e))





## 0.92.3 (2022-08-03)


### Bug Fixes

* enable approver fetch ([6549be4](https://github.com/0xflair/typescript-sdk/commit/6549be45401625c308d3abbb346c307a15bf8310))





## 0.92.2 (2022-08-03)


### Bug Fixes

* pass owner account address to prepare hook ([393d038](https://github.com/0xflair/typescript-sdk/commit/393d038d5393a8d81cb7ba81a20ada61e8258079))





## 0.92.1 (2022-08-03)


### Bug Fixes

* avoid fetching context too early ([bb739c5](https://github.com/0xflair/typescript-sdk/commit/bb739c5adeecc34fa25cb1e3a3c2f6a51cb3283a))





# 0.92.0 (2022-08-03)


### Features

* add hooks and components for custodial staking ([#11](https://github.com/0xflair/typescript-sdk/issues/11)) ([854e0ab](https://github.com/0xflair/typescript-sdk/commit/854e0abf0297b79cfc8e7b2f3fe240649e174519))





# 0.91.0 (2022-08-03)


### Features

* add new chains + update react wallet ui ([#10](https://github.com/0xflair/typescript-sdk/issues/10)) ([4227bcf](https://github.com/0xflair/typescript-sdk/commit/4227bcfc8890262085a82cb64c902873103ef26e))





## 0.90.2 (2022-08-03)


### Bug Fixes

* add react query client provider ([b630fd7](https://github.com/0xflair/typescript-sdk/commit/b630fd72c31b7ee487e266e6de6225c92f9c7773))





## 0.90.1 (2022-08-03)


### Bug Fixes

* add the new forwarder addresses ([d7a464c](https://github.com/0xflair/typescript-sdk/commit/d7a464c9bc0f0b35327eca7498136b7ffcc3f58b))





# 0.90.0 (2022-08-02)


### Features

* bump up contract registry and allow setting forwarder address on mtx ([33c7a3d](https://github.com/0xflair/typescript-sdk/commit/33c7a3d16e6fb18416418cfff2db89158000ba00))





# 0.89.0 (2022-08-02)


### Features

* upgrade packages and add v1.19 contracts ([9f965c6](https://github.com/0xflair/typescript-sdk/commit/9f965c61976ad02b399fb16bde78425ae57da920))





## 0.88.8 (2022-08-01)


### Bug Fixes

* skip the tier if user maxed their allowance or not allowlisted ([b19efa2](https://github.com/0xflair/typescript-sdk/commit/b19efa2641e23aebee62f5ae31b3bf16091aa641))





## 0.88.7 (2022-08-01)


### Bug Fixes

* poll smart contract info while detecting ([464e334](https://github.com/0xflair/typescript-sdk/commit/464e334b51a12f1986ab427c6b6a6be914d62a3f))





## 0.88.6 (2022-08-01)


### Bug Fixes

* remove caching of sales and allowlist status ([e6dfb5d](https://github.com/0xflair/typescript-sdk/commit/e6dfb5dd5f2c3333066e93d2192fb33cf913c1ea))





## 0.88.5 (2022-08-01)


### Bug Fixes

* start from first tier for detection ([600a07e](https://github.com/0xflair/typescript-sdk/commit/600a07e3be9bbd31a5315cd8c8b8026235bf8b80))





## 0.88.4 (2022-08-01)


### Bug Fixes

* show auto detection loading even when used cached ([392cecd](https://github.com/0xflair/typescript-sdk/commit/392cecdcd3727a53f574347839a3c60a8c092468))





## 0.88.3 (2022-07-31)


### Bug Fixes

* show status after tier detection is finished ([ef225f9](https://github.com/0xflair/typescript-sdk/commit/ef225f95fa75ddbcb99038c8de714711155c7168))





## 0.88.2 (2022-07-31)


### Bug Fixes

* package deps ([c0204e8](https://github.com/0xflair/typescript-sdk/commit/c0204e850fb5d82a74a1a260a8b7f8bb4c8fd0ea))





## 0.88.1 (2022-07-31)


### Bug Fixes

* avoid repeating fetching sale tiers ([0966451](https://github.com/0xflair/typescript-sdk/commit/096645131c136873a76d030bdba16bed877cf11d))





# 0.88.0 (2022-07-31)


### Features

* bump up all contracts and their master copy addresses ([fb8afb3](https://github.com/0xflair/typescript-sdk/commit/fb8afb3bf2618e8b4009b53fe7a721f422af529c))





## 0.87.10 (2022-07-31)


### Bug Fixes

* hide any user indicator while loading information ([431c1fa](https://github.com/0xflair/typescript-sdk/commit/431c1fadaad8a0015b22c2fba46a3d382ec60e00))





## 0.87.9 (2022-07-30)


### Bug Fixes

* avoid requests if proof is not fetched yet ([09fbf3d](https://github.com/0xflair/typescript-sdk/commit/09fbf3d267561735a57c6375be92675c9be9bad7))





## 0.87.8 (2022-07-30)


### Bug Fixes

* remove contract version from tier minter ([05a1757](https://github.com/0xflair/typescript-sdk/commit/05a1757b245af3e49d4a7911ef69863dabd81f51))





## 0.87.7 (2022-07-30)


### Bug Fixes

* use defaults to avoid failing call ([6ad4bb2](https://github.com/0xflair/typescript-sdk/commit/6ad4bb2cd439e1b41aca0a7b8f059b78633acbde))





## 0.87.6 (2022-07-30)


### Bug Fixes

* avoid calling when minter address is not set ([5156680](https://github.com/0xflair/typescript-sdk/commit/5156680763ee359e777d77a45ee42256f2f0dfe9))





## 0.87.5 (2022-07-30)


### Bug Fixes

* calculate eligible even without allowlist ([81d7308](https://github.com/0xflair/typescript-sdk/commit/81d730883633c3738bd07f26771a2ddc8fc7a218))





## 0.87.4 (2022-07-29)


### Bug Fixes

* bump up the contracts registry ([74e6647](https://github.com/0xflair/typescript-sdk/commit/74e66477b023468968ec38d80170b369e9374ff6))





## 0.87.3 (2022-07-29)


### Bug Fixes

* bump up the contracts registry ([2373fad](https://github.com/0xflair/typescript-sdk/commit/2373fadb75455d5453b424e820334a36d0ccfd7a))





## 0.87.2 (2022-07-29)


### Bug Fixes

* use correct name maxAllowance ([f1e64f2](https://github.com/0xflair/typescript-sdk/commit/f1e64f2ce0d10da802055488e01068d3405ac5d0))





## 0.87.1 (2022-07-29)


### Bug Fixes

* add max allocation to address list item ([df26d8a](https://github.com/0xflair/typescript-sdk/commit/df26d8a18ab327f7042f986002a27d3252368325))





# 0.87.0 (2022-07-29)


### Features

* add tiering extension to sdk ([#9](https://github.com/0xflair/typescript-sdk/issues/9)) ([09e25b0](https://github.com/0xflair/typescript-sdk/commit/09e25b018eeb1720244f16bdb4ef1faacc02f663))





# 0.86.0 (2022-07-28)


### Features

* bump up contracts registry ([0b0d990](https://github.com/0xflair/typescript-sdk/commit/0b0d990404db1dfce6bca82016ea827cfdd0b5d0))





# 0.85.0 (2022-07-28)


### Features

* bump up contracts registry ([b8a8758](https://github.com/0xflair/typescript-sdk/commit/b8a8758e61bed0d5f85e16d1cab6dbc0a6df4a51))





## 0.84.2 (2022-07-26)


### Bug Fixes

* add v1.7 version to registry ([44cad65](https://github.com/0xflair/typescript-sdk/commit/44cad6589c7fa6a06b0b666244b41ac61dce0ef7))





## 0.84.1 (2022-07-26)


### Bug Fixes

* do not fail if encoding constructor fails ([23ee4d8](https://github.com/0xflair/typescript-sdk/commit/23ee4d805b64691da8eca00ac7ee9b031624b259))





# 0.84.0 (2022-07-26)


### Features

* bump up contracts registry ([6b5831c](https://github.com/0xflair/typescript-sdk/commit/6b5831c17f464bb70f3c08396230b922a5dc8262))





# 0.83.0 (2022-07-25)


### Features

* add rate by tokens ([159a9cf](https://github.com/0xflair/typescript-sdk/commit/159a9cfd5f0b4bb1fb400e5fb1ee8040cffec449))





# 0.82.0 (2022-07-25)


### Features

* add stream rate by token hook ([31eb7de](https://github.com/0xflair/typescript-sdk/commit/31eb7de189f5dee8fa0fb02c55a7b1635185c916))





## 0.81.1 (2022-07-21)


### Bug Fixes

* allow additional metadata attributes without overriding new values ([571a5a0](https://github.com/0xflair/typescript-sdk/commit/571a5a08cc0c0a602f9e875487b895aa0c24fcb4))





# 0.81.0 (2022-07-21)


### Features

* bump up the contracts registry ([193d879](https://github.com/0xflair/typescript-sdk/commit/193d8799c002b5253850303b2d2a2254ec526e47))





# 0.80.0 (2022-07-21)


### Features

* add staking extension hooks and components ([#8](https://github.com/0xflair/typescript-sdk/issues/8)) ([e5048be](https://github.com/0xflair/typescript-sdk/commit/e5048bef2faed34c382fbcec0962f2d8c5b031a1))





# 0.79.0 (2022-07-21)


### Features

* bump up the contracts version ([d6125cd](https://github.com/0xflair/typescript-sdk/commit/d6125cdfb03e2d26a129363ed826b1eed3d16108))





# 0.78.0 (2022-07-20)


### Features

* bump up the contracts version to decouple staking ([94c2703](https://github.com/0xflair/typescript-sdk/commit/94c2703cf0f3b215b2385d2e550c670b23fd5a34))





## 0.77.1 (2022-07-20)


### Bug Fixes

* add normalizers for total durations ([94e3757](https://github.com/0xflair/typescript-sdk/commit/94e375749e0678de9ec8b2753cd5c9b797c16c11))





# 0.77.0 (2022-07-20)


### Features

* bump up the versions ([1c7a15a](https://github.com/0xflair/typescript-sdk/commit/1c7a15a2ec9b89b816846ddec8f08f4610e21cc8))





## 0.76.3 (2022-07-20)


### Bug Fixes

* bump up the contracts registry ([1f45f53](https://github.com/0xflair/typescript-sdk/commit/1f45f5396bc6eb8a59c3c667a83fe922c1d7aa2d))





## 0.76.2 (2022-07-19)


### Bug Fixes

* add unstake normalizers ([07f65a3](https://github.com/0xflair/typescript-sdk/commit/07f65a320700eaf485c9945ccc1ddbb77beb4f3b))





## 0.76.1 (2022-07-19)


### Bug Fixes

* bump up the contracts registry ([67a11ff](https://github.com/0xflair/typescript-sdk/commit/67a11ff0f3eb7e58afb222340e0e58789862a115))





# 0.76.0 (2022-07-19)


### Features

* bump up the versions ([b38b634](https://github.com/0xflair/typescript-sdk/commit/b38b634dca0c02fcc350fefcd64664a174d2aa05))





# 0.75.0 (2022-07-19)


### Features

* bump up the versions ([b4dd0d1](https://github.com/0xflair/typescript-sdk/commit/b4dd0d10da256d70928546b5bb6fcaa68877671b))





## 0.74.2 (2022-07-19)


### Bug Fixes

* only generate contract types for latest version ([eb38590](https://github.com/0xflair/typescript-sdk/commit/eb385903398a319cc380c96b4b26f6139e9fc9cd))





## 0.74.1 (2022-07-18)


### Bug Fixes

* remove unused large type ([21dd149](https://github.com/0xflair/typescript-sdk/commit/21dd14927bf21d0ae2364c9a9a606db28d80f423))





# 0.74.0 (2022-07-17)


### Features

* bump up the contracts version ([f8bd89f](https://github.com/0xflair/typescript-sdk/commit/f8bd89f29db025f845e5494663ca45d1937ad221))





## 0.73.2 (2022-07-17)

**Note:** Version bump only for package @0xflair/typescript-sdk





## 0.73.1 (2022-07-14)


### Bug Fixes

* update to latest contracts ([ea6b70c](https://github.com/0xflair/typescript-sdk/commit/ea6b70cc79608fb846092d8e29ae5cab1d6a8460))





# 0.73.0 (2022-07-13)


### Features

* use correct contract versions ([35474e5](https://github.com/0xflair/typescript-sdk/commit/35474e554934c29fba1f8b581322312253f62354))





## 0.72.6 (2022-07-13)


### Bug Fixes

* bump up the contracts version ([27b33c1](https://github.com/0xflair/typescript-sdk/commit/27b33c1affa9d6e736a2c0e4d108d188f22e0140))





## 0.72.5 (2022-07-13)


### Bug Fixes

* add chains to all connectors and support sold out status ([c623aef](https://github.com/0xflair/typescript-sdk/commit/c623aefbc9fff5d0ba570272f1e3619bad053971))





## 0.72.4 (2022-07-13)


### Bug Fixes

* bump up the contracts version ([786938f](https://github.com/0xflair/typescript-sdk/commit/786938fa3d9320da695455bdf802b8031dbcae3b))





## 0.72.3 (2022-07-12)


### Bug Fixes

* update to latest contracts except mainnet ([d2379fa](https://github.com/0xflair/typescript-sdk/commit/d2379fae30d97f9c786031ee627b92e6cbab06ab))





## 0.72.2 (2022-07-04)


### Bug Fixes

* add missing base uri signature ([46a1b3c](https://github.com/0xflair/typescript-sdk/commit/46a1b3ccd6a05c626a0a70a434d2a3ccd5149659))





## 0.72.1 (2022-07-04)


### Bug Fixes

* use bytes type ([82592ad](https://github.com/0xflair/typescript-sdk/commit/82592ad093391bb1e7f309e1cd4aa4b970b6e0d9))





# 0.72.0 (2022-07-04)


### Features

* add support for token uri suffix ([bac206f](https://github.com/0xflair/typescript-sdk/commit/bac206f89cda1389017a583cdc4e7fcbd71bc837))





# 0.71.0 (2022-07-02)


### Features

* add lock recipient normalizer ([2eebe23](https://github.com/0xflair/typescript-sdk/commit/2eebe2371abc25389bde508e703c4a0a0aac3504))





## 0.70.5 (2022-07-02)


### Bug Fixes

* bump up latest contracts ([3d1aa60](https://github.com/0xflair/typescript-sdk/commit/3d1aa60bbc94cdd26b1e7e1b1a4c42fc310c92e4))





## 0.70.4 (2022-07-01)


### Bug Fixes

* bump up latest contracts ([736bc21](https://github.com/0xflair/typescript-sdk/commit/736bc2104353a2227dcd9c6e7b41b08f6ca833aa))





## 0.70.3 (2022-07-01)


### Bug Fixes

* update azuki version of the collection presets ([df7bf90](https://github.com/0xflair/typescript-sdk/commit/df7bf906caa7677e8a3f1e98862592b37fbf6ca7))





## 0.70.2 (2022-07-01)


### Bug Fixes

* bump up latest contracts ([a9d6270](https://github.com/0xflair/typescript-sdk/commit/a9d6270e8382d7f2d9daeea2e3e60e29e0d040d2))





## 0.70.1 (2022-07-01)


### Bug Fixes

* build contract registry ([7cc7cf5](https://github.com/0xflair/typescript-sdk/commit/7cc7cf500e6f296638575884606546cc739fcb98))





# 0.70.0 (2022-07-01)


### Features

* allow nft collections to deploy via factory ([e1ba538](https://github.com/0xflair/typescript-sdk/commit/e1ba5389864073c2ef096e4404b58a5bc94c6be1))





## 0.69.2 (2022-07-01)


### Bug Fixes

* bump up the contracts version ([fa5fd09](https://github.com/0xflair/typescript-sdk/commit/fa5fd09b6d9113266289b907b039a45e7fcb956a))





## 0.69.1 (2022-07-01)


### Bug Fixes

* use interface instead of type ([7fa4d14](https://github.com/0xflair/typescript-sdk/commit/7fa4d142549a3de1f6e0132520783872bc28de61))





# 0.69.0 (2022-06-30)


### Features

* use factory deployment if support to save gas ([#7](https://github.com/0xflair/typescript-sdk/issues/7)) ([faf4922](https://github.com/0xflair/typescript-sdk/commit/faf492223d2a85b0c6587520a2c50c56e6f9cfce))





## 0.68.6 (2022-06-30)


### Bug Fixes

* refresh package deps ([e66d8bb](https://github.com/0xflair/typescript-sdk/commit/e66d8bbd2e55383aa9244b99fb8e21003a30a1a1))





## 0.68.5 (2022-06-30)


### Bug Fixes

* build latest contracts properly ([06c383e](https://github.com/0xflair/typescript-sdk/commit/06c383eed4bbe84ba745eb90e950500035f9f820))





## 0.68.4 (2022-06-30)


### Bug Fixes

* bump up the contracts version ([2d6ee31](https://github.com/0xflair/typescript-sdk/commit/2d6ee3120a9940d0581a99f94eef338bfd6f1e39))





## 0.68.3 (2022-06-30)


### Bug Fixes

* export missing hooks ([4a2f1cb](https://github.com/0xflair/typescript-sdk/commit/4a2f1cbe879f765f0603c76b4a3207e92455e2b5))





## 0.68.2 (2022-06-30)


### Bug Fixes

* export data query from flair-sdk ([973ff8c](https://github.com/0xflair/typescript-sdk/commit/973ff8cd0dcb7bfb6e9fbf4ba31de5c41ffdf992))





## 0.68.1 (2022-06-30)


### Bug Fixes

* export correct components ([0a5b2a1](https://github.com/0xflair/typescript-sdk/commit/0a5b2a13a5f795cf8f7adaf9b47a2472cdeebbe2))





# 0.68.0 (2022-06-30)


### Features

* add new token stream hooks and components ([#6](https://github.com/0xflair/typescript-sdk/issues/6)) ([175148c](https://github.com/0xflair/typescript-sdk/commit/175148c64a76231361131c5ec8412b306e9a2cb8))





# 0.67.0 (2022-06-29)


### Features

* bump up the contracts version ([48734df](https://github.com/0xflair/typescript-sdk/commit/48734df0f78301b5909f30eb8836741fe2fb908c))





# 0.66.0 (2022-06-29)


### Features

* bump up the contracts version ([97c4868](https://github.com/0xflair/typescript-sdk/commit/97c48685c512b499f1bd4c0d5977c9c7299bf468))





## 0.65.1 (2022-06-28)


### Bug Fixes

* calculate last version correctly ([bddb9a4](https://github.com/0xflair/typescript-sdk/commit/bddb9a4544fab6955ba004351a99f52adc680dcb))





# 0.65.0 (2022-06-28)


### Features

* add new stream contracts ([06e0b1b](https://github.com/0xflair/typescript-sdk/commit/06e0b1bd1530a71bdaf4168f2d8c37345cb0456d))





## 0.64.7 (2022-06-26)


### Bug Fixes

* bump up the contracts version ([48b4632](https://github.com/0xflair/typescript-sdk/commit/48b46320d42b9601229cb23948ecf74eddf7af47))





## 0.64.6 (2022-06-26)


### Bug Fixes

* include all prev contract versions and put v1 as latest ([920a5f2](https://github.com/0xflair/typescript-sdk/commit/920a5f2e60d3a37c43fa2550356d9f730468e62b))





## 0.64.5 (2022-06-25)


### Bug Fixes

* bump up the sdk version ([9227a44](https://github.com/0xflair/typescript-sdk/commit/9227a441edf79ed84e4954f9e8b27fb5f98c5767))





## 0.64.4 (2022-06-23)


### Bug Fixes

* use correct signature for transferFrom method ([2aa4ae5](https://github.com/0xflair/typescript-sdk/commit/2aa4ae5325d0285d69f837790745478fe022b167))





## 0.64.3 (2022-06-23)


### Bug Fixes

* bump up contracts version ([4a276ed](https://github.com/0xflair/typescript-sdk/commit/4a276ed98cc370ba063e565387016b27fda9b6f9))





## 0.64.2 (2022-06-23)


### Bug Fixes

* various warnings and errors ([b224efc](https://github.com/0xflair/typescript-sdk/commit/b224efc5f8c1ce0f3cc2215d8e6711b6740eed0d))





## 0.64.1 (2022-06-22)


### Bug Fixes

* show on-chain metadata first then fallback to backend ([db56df1](https://github.com/0xflair/typescript-sdk/commit/db56df1f77cab4f41c217db28ecbe55adc576cff))





# 0.64.0 (2022-06-22)


### Features

* provide a mint input component ([90ae4a6](https://github.com/0xflair/typescript-sdk/commit/90ae4a6ab7827bb0a129831240a313c1a731cf82))





## 0.63.4 (2022-06-22)


### Bug Fixes

* allow providing contract version and freeform mint input ([47104c6](https://github.com/0xflair/typescript-sdk/commit/47104c6df1cd7b0b34b57e87b55fcf933afa7c84))





## 0.63.3 (2022-06-22)


### Bug Fixes

* allow calculating total claimable amount overally ([61aa782](https://github.com/0xflair/typescript-sdk/commit/61aa7825bc37464409d05a14421b148d9c91c549))





## 0.63.2 (2022-06-22)


### Bug Fixes

* pass correct value to humanize duration ([6f54498](https://github.com/0xflair/typescript-sdk/commit/6f544980cf3b288e93ca0c4659acbf851316cc11))





## 0.63.1 (2022-06-22)


### Bug Fixes

* use correct variable name ([d45f404](https://github.com/0xflair/typescript-sdk/commit/d45f4045d596d52cf25be585b6189a97638274e6))





# 0.63.0 (2022-06-22)


### Features

* allow rendering stream total claimed overally ([6aff799](https://github.com/0xflair/typescript-sdk/commit/6aff7996422e5afaa3ce5de90058a058ce22a160))





## 0.62.1 (2022-06-21)


### Bug Fixes

* export new components for token streams ([2889f94](https://github.com/0xflair/typescript-sdk/commit/2889f94caf4101b6b25cbbf1a7404500ea7fc739))





# 0.62.0 (2022-06-21)


### Features

* provide every info as separate components ([a511c07](https://github.com/0xflair/typescript-sdk/commit/a511c0747d07c79a401b901c7c45bf74d9e85f40))





## 0.61.5 (2022-06-21)


### Bug Fixes

* disable custodial wallet by default ([837ee12](https://github.com/0xflair/typescript-sdk/commit/837ee120d0bc88e0a191350900f0e0f94e78eb1e))





## 0.61.4 (2022-06-21)


### Bug Fixes

* privde sane defaults to avoid warnings ([72db22e](https://github.com/0xflair/typescript-sdk/commit/72db22e486f3312519f358088bd149ba60ee2ff3))





## 0.61.3 (2022-06-21)


### Bug Fixes

* accept strict contract version ([10a592d](https://github.com/0xflair/typescript-sdk/commit/10a592d191e91f7300d46ae8d4fd27cfa2c0ab31))





## 0.61.2 (2022-06-21)


### Bug Fixes

* use new contract name for 1.9 streams ([8825ccf](https://github.com/0xflair/typescript-sdk/commit/8825ccf2132c0c9c0bee92aa251360875573453b))





## 0.61.1 (2022-06-21)


### Bug Fixes

* allow description to be react node ([5ee4a84](https://github.com/0xflair/typescript-sdk/commit/5ee4a84ffcd13b52b6bf084328b2a3d150707509))





# 0.61.0 (2022-06-20)


### Features

* bump up the contracts version ([0752582](https://github.com/0xflair/typescript-sdk/commit/0752582ef8894dacfc72121e94b81efdc0cfaefc))





## 0.60.1 (2022-06-19)


### Bug Fixes

* crupto amount field handling fractions ([9c6ccd2](https://github.com/0xflair/typescript-sdk/commit/9c6ccd2cc5424caf4b793336d38356910ee73f74))





# 0.60.0 (2022-06-18)


### Features

* add wallet dropdown in minting section ([fd09cc1](https://github.com/0xflair/typescript-sdk/commit/fd09cc12ae67a1a5c6c074cb64febfcc258136cd))





## 0.59.4 (2022-06-17)


### Bug Fixes

* show allowlist status only if connected wallet ([a3c05f4](https://github.com/0xflair/typescript-sdk/commit/a3c05f4bd30f3ad6a99a8dab7e4f9bd52922d437))





## 0.59.3 (2022-06-17)


### Bug Fixes

* do not watch on hooks ([b171359](https://github.com/0xflair/typescript-sdk/commit/b171359416000d0c026b4b55a2cf3a7069cbcb78))





## 0.59.2 (2022-06-17)


### Bug Fixes

* update infura project id ([8edc515](https://github.com/0xflair/typescript-sdk/commit/8edc515c8104b4b06b9f0674eba3c0f8c61ef702))





## 0.59.1 (2022-06-17)


### Bug Fixes

* add disconnect button in sales minting section ([f4706ab](https://github.com/0xflair/typescript-sdk/commit/f4706ab3341ee65c9d26d8723a482443a3dc8f32))





# 0.59.0 (2022-06-17)


### Features

* add connect and switch button around claim button ([9ecce19](https://github.com/0xflair/typescript-sdk/commit/9ecce19d3c1eaf572ca2b1af43fcbbd238781595))





## 0.58.3 (2022-06-17)


### Bug Fixes

* memoize client id ([5645bdf](https://github.com/0xflair/typescript-sdk/commit/5645bdf126b782fbf63da199c411c5347da0bb0b))





## 0.58.2 (2022-06-17)


### Bug Fixes

* memoize data for verification hook ([367d749](https://github.com/0xflair/typescript-sdk/commit/367d749bd346a9049a7bfa97ff466274a32d2245))





## 0.58.1 (2022-06-17)


### Bug Fixes

* memoize request args ([bf6ce1b](https://github.com/0xflair/typescript-sdk/commit/bf6ce1b50aaf71b5ec8ab4b9088ee7a5c3d0b874))





# 0.58.0 (2022-06-17)


### Features

* allow passing chain id for read hooks ([#5](https://github.com/0xflair/typescript-sdk/issues/5)) ([286eff4](https://github.com/0xflair/typescript-sdk/commit/286eff43613415067a426502f2e7c354f3c09c01))





# 0.57.0 (2022-06-16)


### Features

* allow showing read-only data even on wrong chain ([8f02be7](https://github.com/0xflair/typescript-sdk/commit/8f02be7906918376786671544fc29600bc2f5f1a))





## 0.56.4 (2022-06-16)


### Bug Fixes

* allow freely type the price input ([0b29b8d](https://github.com/0xflair/typescript-sdk/commit/0b29b8dded16feaf82dd9804c8172ba0a1d08fa8))





## 0.56.3 (2022-06-11)


### Bug Fixes

* use randombytes package for uint256 ([0e1b753](https://github.com/0xflair/typescript-sdk/commit/0e1b753fe1425a54e91dca0b82db7e13f3c777fe))





## 0.56.2 (2022-06-10)


### Bug Fixes

* remove unecessary import ([1dc1461](https://github.com/0xflair/typescript-sdk/commit/1dc1461473f167ffdfee8f3fcf5046a83467e59e))





## 0.56.1 (2022-06-10)


### Bug Fixes

* remove unecessary import ([bf5c349](https://github.com/0xflair/typescript-sdk/commit/bf5c349e6610eba591d94c0cc051b2d59934ab34))





# 0.56.0 (2022-06-10)


### Features

* add minting components to nft-collections package ([68d3d89](https://github.com/0xflair/typescript-sdk/commit/68d3d893c8a103107b182fb99ec7b1ecd163a862))





## 0.55.2 (2022-06-10)


### Bug Fixes

* put overrides on the right key ([efede02](https://github.com/0xflair/typescript-sdk/commit/efede024b71f45e3a2c15ddc6f0e306473384588))





## 0.55.1 (2022-06-10)


### Bug Fixes

* use correct mint count when passing as arg ([e90a5bc](https://github.com/0xflair/typescript-sdk/commit/e90a5bc5df09fb861ba5db84b8164a943267e322))





# 0.55.0 (2022-06-10)


### Features

* allow overriding value on contract writes ([110c176](https://github.com/0xflair/typescript-sdk/commit/110c176043c5af66ca75f86572a67925a02cc780))





# 0.54.0 (2022-06-07)


### Features

* add role revoke hook ([7d8560d](https://github.com/0xflair/typescript-sdk/commit/7d8560d38cfdb85ebccf5185c848708d3190e5c6))





## 0.53.4 (2022-06-07)


### Bug Fixes

* allow watching for role checks ([510f44e](https://github.com/0xflair/typescript-sdk/commit/510f44ed6f2bec073d10516073a707a45dee685d))





## 0.53.3 (2022-06-07)


### Bug Fixes

* add new contracts ([7438ba8](https://github.com/0xflair/typescript-sdk/commit/7438ba85b7cdbd4bfb1d1e12ceebaf0c68457d80))





## 0.53.2 (2022-06-07)


### Bug Fixes

* bump up the contracts version ([021120b](https://github.com/0xflair/typescript-sdk/commit/021120bc39f15618b5da3d8360261c9dc677e672))





## 0.53.1 (2022-06-07)


### Bug Fixes

* show last 4 chars of wallet ([fac2e67](https://github.com/0xflair/typescript-sdk/commit/fac2e67d71b8791b2eed9709b583f7a67982f032))





# 0.53.0 (2022-06-07)


### Features

* add put axios hook ([f8fcb46](https://github.com/0xflair/typescript-sdk/commit/f8fcb46e5e49946e32c3d9850a35f2ca80e1b939))





## 0.52.2 (2022-06-06)


### Bug Fixes

* bump up the contracts version ([74d341b](https://github.com/0xflair/typescript-sdk/commit/74d341b12b998cf3bce08e44003f46c0c90ed2da))





## 0.52.1 (2022-06-05)


### Bug Fixes

* bump up the contracts version ([d870c1e](https://github.com/0xflair/typescript-sdk/commit/d870c1e8a1d88bbc094923ac2040951ff9822c3e))





# 0.52.0 (2022-06-05)


### Features

* separate abi hook from write and wait ([#4](https://github.com/0xflair/typescript-sdk/issues/4)) ([563e5a0](https://github.com/0xflair/typescript-sdk/commit/563e5a0ae0ea284eb215d86efb41bc54e34e80f8))





## 0.51.7 (2022-06-03)


### Bug Fixes

* remove unnecessary types packages ([172abe9](https://github.com/0xflair/typescript-sdk/commit/172abe9341973f9e086962a5e1fa1a1b7cae5add))





## 0.51.6 (2022-06-03)


### Bug Fixes

* remove require chain component from claiming section ([76fef4a](https://github.com/0xflair/typescript-sdk/commit/76fef4a5be021db1e40609e512da06d7109b7d13))





## 0.51.5 (2022-06-03)


### Bug Fixes

* add all flair packages as peer dep ([d15f35a](https://github.com/0xflair/typescript-sdk/commit/d15f35aa98f1b474e727d9c472887c541961bec6))





## 0.51.4 (2022-06-03)

**Note:** Version bump only for package @0xflair/typescript-sdk





## 0.51.3 (2022-06-03)


### Bug Fixes

* update packages ([5c5f63f](https://github.com/0xflair/typescript-sdk/commit/5c5f63f1cf2ba1d2c2c9ad02b793d68d614722e4))





## 0.51.2 (2022-06-03)


### Bug Fixes

* eliminate using node-specific packages in react-wallet package ([d9c39ea](https://github.com/0xflair/typescript-sdk/commit/d9c39eac318f4e0478192b6e8e34fe2a1545e8dd))





## 0.51.1 (2022-06-03)


### Bug Fixes

* eliminate reliance on crypto library ([b62adbe](https://github.com/0xflair/typescript-sdk/commit/b62adbec099acdf08241e193b89eff10a5f33752))





# 0.51.0 (2022-06-03)


### Features

* support both v17 and v18 reacts ([77e2773](https://github.com/0xflair/typescript-sdk/commit/77e27732aa80bb57e9b0783d43d99632384442f3))





## 0.50.4 (2022-06-03)


### Bug Fixes

* avoid error when tickets are not provided ([7b5fdb5](https://github.com/0xflair/typescript-sdk/commit/7b5fdb55cda88f65049dac47634675cdd1ef2ed4))





## 0.50.3 (2022-06-03)


### Bug Fixes

* use more accurate naming ([bcf348b](https://github.com/0xflair/typescript-sdk/commit/bcf348b1b577f76edd6660eee6a7778b839226e1))





## 0.50.2 (2022-06-03)


### Bug Fixes

* add missing exports to token streams ([78d2aed](https://github.com/0xflair/typescript-sdk/commit/78d2aed79a594f164b1659ba0857c23446f4d8de))





## 0.50.1 (2022-06-03)


### Bug Fixes

* add missing package for token streams ([8d5b7d4](https://github.com/0xflair/typescript-sdk/commit/8d5b7d46c232600f9856de99677b312cf29a5b4c))





# 0.50.0 (2022-06-02)


### Features

* port hooks to token streams package ([#3](https://github.com/0xflair/typescript-sdk/issues/3)) ([87323aa](https://github.com/0xflair/typescript-sdk/commit/87323aa9f91f270a83f6cc371a9cc41afac8b5af))





## 0.49.11 (2022-06-01)


### Bug Fixes

* remove white bg on wallet dropdown ([fafa34d](https://github.com/0xflair/typescript-sdk/commit/fafa34d34de61bf6d9fd29cf8f090ac410f8188d))





## 0.49.10 (2022-06-01)


### Bug Fixes

* bump up the contracts version ([d4af4ec](https://github.com/0xflair/typescript-sdk/commit/d4af4ec4021e7cd55e8e83247b4ca424cb472eeb))





## 0.49.9 (2022-06-01)


### Bug Fixes

* bump up the contracts version ([f524413](https://github.com/0xflair/typescript-sdk/commit/f5244135832fa1af0d672be041835ce8a0ed220a))





## 0.49.8 (2022-06-01)


### Bug Fixes

* bump up the contracts version ([ce39493](https://github.com/0xflair/typescript-sdk/commit/ce39493a2becac81ae25a4e81d81149b50b644c4))





## 0.49.7 (2022-05-31)


### Bug Fixes

* use contract name for artifact key ([398b265](https://github.com/0xflair/typescript-sdk/commit/398b2652566753d03c7d7e10d0279f8d1c8593ab))





## 0.49.6 (2022-05-31)


### Bug Fixes

* preserve openzeppelin artifact paths ([f28fe80](https://github.com/0xflair/typescript-sdk/commit/f28fe8011b4020f0c77703810ab09360ba29566b))





## 0.49.5 (2022-05-30)


### Bug Fixes

* bump up the contracts version ([2ea18d6](https://github.com/0xflair/typescript-sdk/commit/2ea18d64f9d68b604430a38161bb5bf378672567))





## 0.49.4 (2022-05-30)


### Bug Fixes

* make config variables publicly readable ([ce09b13](https://github.com/0xflair/typescript-sdk/commit/ce09b1351cb4b6e9b360f11a3ac61937b1db49c5))





## 0.49.3 (2022-05-30)


### Bug Fixes

* bump up the contracts version ([3435fd5](https://github.com/0xflair/typescript-sdk/commit/3435fd5a63efeb4ccd60634725c49ceb27299b8d))





## 0.49.2 (2022-05-29)


### Bug Fixes

* dump up contracts version ([966ee9c](https://github.com/0xflair/typescript-sdk/commit/966ee9c81880816352b4ebd81a16d3435a4794fb))





## 0.49.1 (2022-05-29)


### Bug Fixes

* hook for toggable form ([6d2dfdf](https://github.com/0xflair/typescript-sdk/commit/6d2dfdf0e39ea46dd10d2375f3daa640b897cefe))





# 0.49.0 (2022-05-29)


### Features

* Add v1.8 contracts and add placeholder package for token streams ([#2](https://github.com/0xflair/typescript-sdk/issues/2)) ([27589c7](https://github.com/0xflair/typescript-sdk/commit/27589c77159f6d85bb1d0c446b951b99f076174b))





## 0.48.5 (2022-05-26)


### Bug Fixes

* update package deps ([8449b8f](https://github.com/0xflair/typescript-sdk/commit/8449b8f8fa931b2d06fcd9f477a70ec1d34d4cf2))





## 0.48.4 (2022-05-26)


### Bug Fixes

* wallet dropdown on mobile ([53d9633](https://github.com/0xflair/typescript-sdk/commit/53d9633d0deaff96e27e8b458634e34a8d80eb9b))





## 0.48.3 (2022-05-26)


### Bug Fixes

* properly switch network for magic wallets ([c1eb18b](https://github.com/0xflair/typescript-sdk/commit/c1eb18ba6502562c16af0e7673c1448a6f2d8e9a))





## 0.48.2 (2022-05-26)


### Bug Fixes

* use polygon as default network ([e95eb4b](https://github.com/0xflair/typescript-sdk/commit/e95eb4b4a7aea9548272b8105cf65bd27862cd23))





## 0.48.1 (2022-05-26)


### Bug Fixes

* update package dependencies ([1053e86](https://github.com/0xflair/typescript-sdk/commit/1053e861ac96415c838b0c4451f2a54b4a61a7ee))





# 0.48.0 (2022-05-26)


### Features

* add simple wallet dropdown ([4f09201](https://github.com/0xflair/typescript-sdk/commit/4f09201602bfea6979913d07d0fdcd9f67875d33))





# 0.47.0 (2022-05-26)


### Features

* allow switching chains for magic link wallets ([7b9a525](https://github.com/0xflair/typescript-sdk/commit/7b9a52542a78c742523a148c9a4971f13b7f56ca))





# 0.46.0 (2022-05-25)


### Features

* add magic link integration out-of-box ([52c2c90](https://github.com/0xflair/typescript-sdk/commit/52c2c90fe6d2115ce38d1332e1318a6cf7efacc6))





# 0.45.0 (2022-05-20)


### Features

* allow choosing which access mode for 1-of-1 minter ([594bd16](https://github.com/0xflair/typescript-sdk/commit/594bd1671e88e6c741b8a9a4b95ffd321a001d4f))





## 0.44.1 (2022-05-20)


### Bug Fixes

* bump up evm contracts version ([5e1d41a](https://github.com/0xflair/typescript-sdk/commit/5e1d41a42e266b8c95f151e32a0a13641fc4e0f2))





# 0.44.0 (2022-05-19)


### Features

* use flair ipfs dedicated gateway ([1c1ffe3](https://github.com/0xflair/typescript-sdk/commit/1c1ffe3bd46f5deaa39e8c298675e84fe19fb573))





# 0.43.0 (2022-05-18)


### Features

* export interface ID on the extension checker hook ([1cab376](https://github.com/0xflair/typescript-sdk/commit/1cab37664fabe035c0792e70423e08ae3026263b))





## 0.42.2 (2022-05-18)


### Bug Fixes

* exclude inherited functions when calculating interface id ([6c13127](https://github.com/0xflair/typescript-sdk/commit/6c13127a10d2503bcb6db70014d68d8ccc4c5086))





## 0.42.1 (2022-05-17)

**Note:** Version bump only for package @0xflair/typescript-sdk





# 0.42.0 (2022-05-16)


### Features

* add contract info hooks and bump up the contracts registry ([a718bed](https://github.com/0xflair/typescript-sdk/commit/a718bed460efe531fd6cb12704e17235a3409efb))





# 0.41.0 (2022-05-16)


### Features

* add flair contract deployer hook ([a4a6c21](https://github.com/0xflair/typescript-sdk/commit/a4a6c21d6f5c88c90d0d770a24125234de6f9d47))





# 0.40.0 (2022-05-16)


### Features

* use contract fqn for preset names in the contracts ([e94d85c](https://github.com/0xflair/typescript-sdk/commit/e94d85c0ae23d5a2bce9b6b4b1cede4c67a19e35))





## 0.39.5 (2022-05-16)


### Bug Fixes

* bump up evm contracts ([298497a](https://github.com/0xflair/typescript-sdk/commit/298497a81cd31247a762885ca6d492231d5aba7b))





## 0.39.4 (2022-05-16)


### Bug Fixes

* bump up evm contracts ([4df8186](https://github.com/0xflair/typescript-sdk/commit/4df8186bc72f2d788cbeb9edfde756d2ab757d4d))





## 0.39.3 (2022-05-16)


### Bug Fixes

* bump up evm contracts ([53b9958](https://github.com/0xflair/typescript-sdk/commit/53b99589c26c0dbf762c9fe504caecc99f70c640))





## 0.39.2 (2022-05-15)


### Bug Fixes

* use more verbose name for version ([b021ae8](https://github.com/0xflair/typescript-sdk/commit/b021ae8a29873be1cf77b701e909e1e1139d6221))





## 0.39.1 (2022-05-15)

**Note:** Version bump only for package @0xflair/typescript-sdk





# 0.39.0 (2022-05-15)


### Features

* use better naming and add new contracts ([15fc696](https://github.com/0xflair/typescript-sdk/commit/15fc69623dd4a1f728623d9a46dc15eae61685bd))





## 0.38.3 (2022-05-15)


### Bug Fixes

* bump contracts package to latest ([80d0305](https://github.com/0xflair/typescript-sdk/commit/80d0305e6641fc77bd7923b11d4fbd12181ab70b))





## 0.38.2 (2022-05-15)


### Bug Fixes

* bump up contract addresses ([89c534e](https://github.com/0xflair/typescript-sdk/commit/89c534e71e84e6949af5d3bc37662afb62d86f4b))





## 0.38.1 (2022-05-15)


### Bug Fixes

* when args are not provided as an array ([a7dc80e](https://github.com/0xflair/typescript-sdk/commit/a7dc80eed40a7f665a24dc874bbd40b9e5caf445))





# 0.38.0 (2022-05-15)


### Features

* add oz role renouncer hook ([43b78de](https://github.com/0xflair/typescript-sdk/commit/43b78de07b14a83a5884ce52e7043f8c00c18f2f))





# 0.37.0 (2022-05-15)


### Features

* add OZ role granter hook ([5b68347](https://github.com/0xflair/typescript-sdk/commit/5b68347dc069f159cbe1f3af6b36b91566dd36a1))





## 0.36.1 (2022-05-14)


### Bug Fixes

* use chain id hook in packages ([1132ea4](https://github.com/0xflair/typescript-sdk/commit/1132ea4904252d81eb597d7be25fff2a5b0eebd8))





# 0.36.0 (2022-05-14)


### Features

* add chain id helper hook ([f13acf3](https://github.com/0xflair/typescript-sdk/commit/f13acf34dad194666d8b87c3d535a8a1599317a4))





## 0.35.2 (2022-05-14)


### Bug Fixes

* export react meta-transactions hooks ([7b3e5eb](https://github.com/0xflair/typescript-sdk/commit/7b3e5ebf0426bacca8563ea6fca5f8ac13baeff5))





## 0.35.1 (2022-05-14)


### Bug Fixes

* correct value for addresses and allow no args ([fa6b0f6](https://github.com/0xflair/typescript-sdk/commit/fa6b0f6a6adab5822e69d60862b6d17775e44156))





# 0.35.0 (2022-05-14)


### Features

* add hooks for opensea and forwarder addresses ([65aba1f](https://github.com/0xflair/typescript-sdk/commit/65aba1ff85fc32ab22be06ffe2f41ffb4b9e3bb3))





# 0.34.0 (2022-05-13)


### Features

* re-export ipfs package in flair-sdk ([e43cfff](https://github.com/0xflair/typescript-sdk/commit/e43cfff617398d4348dcb40a3956b224c2cc37c6))





# 0.33.0 (2022-05-13)


### Features

* add ipfs package with basic client ([0bc004d](https://github.com/0xflair/typescript-sdk/commit/0bc004d0fcf19476cdb9373310b7704bdb980b29))





# 0.32.0 (2022-05-13)


### Features

* provide flair contract object and mixin approach for meta transactions ([ac56011](https://github.com/0xflair/typescript-sdk/commit/ac560112f9a5739d1896894422034d5095d7b888))





## 0.31.1 (2022-05-12)

**Note:** Version bump only for package @0xflair/typescript-sdk





# 0.31.0 (2022-05-01)


### Features

* add royalty management hooks ([d852800](https://github.com/0xflair/typescript-sdk/commit/d852800baba489cb36caf3f01ebe1c59e04e30c1))





## 0.30.4 (2022-04-30)


### Bug Fixes

* add missing arguments for full-featured preset ([92a4997](https://github.com/0xflair/typescript-sdk/commit/92a49978255fd70f067c8d34c01583e3c9cc8931))





## 0.30.3 (2022-04-30)


### Bug Fixes

* use array as argument instead of object ([b4c051a](https://github.com/0xflair/typescript-sdk/commit/b4c051a0bfbcef8c119cd27bf5ccf40a76a5bd63))





## 0.30.2 (2022-04-30)


### Bug Fixes

* bump up the contract version ([fe0b0cc](https://github.com/0xflair/typescript-sdk/commit/fe0b0ccf99ff783a3d0fbfaaface8674ac7e65e1))





## 0.30.1 (2022-04-30)


### Bug Fixes

* bump up the contract version ([dade47d](https://github.com/0xflair/typescript-sdk/commit/dade47d0d4204c43882c688055093a290ba32630))





# 0.30.0 (2022-04-30)


### Features

* bump up the contracts version ([7c672af](https://github.com/0xflair/typescript-sdk/commit/7c672aff7370626521f1389f45eba19f5a425f26))





## 0.29.1 (2022-04-30)


### Bug Fixes

* export proceeds hooks ([3237809](https://github.com/0xflair/typescript-sdk/commit/3237809f9ceb6412b4c8419a37a319a1ae869f26))





# 0.29.0 (2022-04-30)


### Features

* add collection proceeds hooks ([a9192ff](https://github.com/0xflair/typescript-sdk/commit/a9192ff916dc7fb0653d3909d6152b497ce4ad7b))





## 0.28.5 (2022-04-29)


### Bug Fixes

* provide chain id to web3 provider instance ([1cd4a89](https://github.com/0xflair/typescript-sdk/commit/1cd4a89639b3cb70859582b0acf64076902ce54b))





## 0.28.4 (2022-04-29)


### Bug Fixes

* allow arbitrary chains ([27891b0](https://github.com/0xflair/typescript-sdk/commit/27891b0d114a5a4dcfe64dd3acfdbee81f17776a))





## 0.28.3 (2022-04-28)


### Bug Fixes

* fallback to metamask default provider ([f9e2a79](https://github.com/0xflair/typescript-sdk/commit/f9e2a790b6c3bcac838de8c860a5fb2b8973c24e))





## 0.28.2 (2022-04-28)


### Bug Fixes

* wrap loading content around fragment ([a60e9da](https://github.com/0xflair/typescript-sdk/commit/a60e9da75891c8005b354cadc161f656b0379453))





## 0.28.1 (2022-04-28)


### Bug Fixes

* update crypto price components with new hooks ([a3a6236](https://github.com/0xflair/typescript-sdk/commit/a3a62364ef1e3e856939f7ed0346632fff458d45))





# 0.28.0 (2022-04-28)


### Features

* add crypto currency hook ([6b0f304](https://github.com/0xflair/typescript-sdk/commit/6b0f3047670e430693e61f1b03b1da6e07e2563b))





## 0.27.23 (2022-04-28)


### Bug Fixes

* fallback to default provider if Infura does not support ([9cc1a7a](https://github.com/0xflair/typescript-sdk/commit/9cc1a7ab778758525d1b521269c2e15fb2b30e26))





## 0.27.22 (2022-04-27)


### Bug Fixes

* disable watch mode for contract reads ([ad9b00c](https://github.com/0xflair/typescript-sdk/commit/ad9b00c276bb34bdae75fe18e45a2d59230c29b8))





## 0.27.21 (2022-04-27)


### Bug Fixes

* enable nft collections list hook ([f096233](https://github.com/0xflair/typescript-sdk/commit/f096233796b6060a5debb4dc010d02db9e471500))





## 0.27.20 (2022-04-27)


### Bug Fixes

* enable the hook for remote json reader ([4c6bc6b](https://github.com/0xflair/typescript-sdk/commit/4c6bc6b707e8c3ff68615e0e24da3346ea3a691d))





## 0.27.19 (2022-04-27)


### Bug Fixes

* cache wallet hooks and proper signer or provider ([7a8fb90](https://github.com/0xflair/typescript-sdk/commit/7a8fb900eda98f758dada7d2dac42c9fe363ac2c))





## 0.27.18 (2022-04-27)


### Bug Fixes

* avoid creating a new object when providing signer or provider ([63faa82](https://github.com/0xflair/typescript-sdk/commit/63faa8295d28bfb79c26db828c9f9f8859a6ccb8))





## 0.27.17 (2022-04-27)

**Note:** Version bump only for package @0xflair/typescript-sdk





## 0.27.16 (2022-04-27)


### Bug Fixes

* use infura rpc for injected providers ([f562ef4](https://github.com/0xflair/typescript-sdk/commit/f562ef47fbf576e2296ea922a31fb1265c29f0fa))





## 0.27.15 (2022-04-27)


### Bug Fixes

* provide wagmi resolved provider or signer by default ([afc3bea](https://github.com/0xflair/typescript-sdk/commit/afc3bea78bc756d73e642367480438c66bb9a8ce))





## 0.27.14 (2022-04-27)


### Bug Fixes

* pass rest of config when calling contract write manually ([c5de1f3](https://github.com/0xflair/typescript-sdk/commit/c5de1f366eab85d29bd83164e79e8129819bbad6))





## 0.27.13 (2022-04-27)


### Bug Fixes

* avoid rendering object in transaction link ([a3f0187](https://github.com/0xflair/typescript-sdk/commit/a3f0187bba6766d505b43eab7fd5f643d442e9b1))





## 0.27.12 (2022-04-27)


### Bug Fixes

* properly handle unmounted login button component ([e0de25a](https://github.com/0xflair/typescript-sdk/commit/e0de25a6ba9803d346e22ff3dba0fcc440bc8ca0))





## 0.27.11 (2022-04-27)


### Bug Fixes

* only set signerOrProvider if any value is given ([f9e808d](https://github.com/0xflair/typescript-sdk/commit/f9e808de254c97275ffeef4ad0397a8b8db4e942))





## 0.27.10 (2022-04-27)


### Bug Fixes

* remove signer from read-only hooks ([32b6571](https://github.com/0xflair/typescript-sdk/commit/32b65712e9435b76c9b7b9c93e0e6893cbf01abf))





## 0.27.9 (2022-04-27)


### Bug Fixes

* set minter hooks as loading while fetching price ([ed0348d](https://github.com/0xflair/typescript-sdk/commit/ed0348deb1db46db23eafcf86650cd3f7f72d80a))





## 0.27.8 (2022-04-27)


### Bug Fixes

* functiona name for setting merkle root ([4185686](https://github.com/0xflair/typescript-sdk/commit/4185686d6308cdece1b44a6751d83e8851cdcbc8))





## 0.27.7 (2022-04-27)


### Bug Fixes

* remove signer object from read-only calls ([28e2d70](https://github.com/0xflair/typescript-sdk/commit/28e2d70fe24d6ef41b920fd3376971c30a3d90b2))





## 0.27.6 (2022-04-27)


### Bug Fixes

* correct explorer url on tx link component ([0bf3ce5](https://github.com/0xflair/typescript-sdk/commit/0bf3ce5998317074b56697bc2670923086e047db))





## 0.27.5 (2022-04-27)


### Bug Fixes

* enable read contract hook by default ([19ebadf](https://github.com/0xflair/typescript-sdk/commit/19ebadf6e99e147e57747135c70e873c6c4a3852))





## 0.27.4 (2022-04-27)

**Note:** Version bump only for package @0xflair/typescript-sdk





## 0.27.3 (2022-04-27)


### Bug Fixes

* consistent return format for the placeholder hook ([5e3334e](https://github.com/0xflair/typescript-sdk/commit/5e3334e3208974b418b609330c202b3ab5607a82))





## 0.27.2 (2022-04-27)

**Note:** Version bump only for package @0xflair/typescript-sdk





## 0.27.1 (2022-04-27)


### Bug Fixes

* packages dependencies ([67054b7](https://github.com/0xflair/typescript-sdk/commit/67054b79270dec9f5e44d32d0adecb23da53b7e7))





# 0.27.0 (2022-04-26)


### Features

* add bulk address deleter hook ([63b5247](https://github.com/0xflair/typescript-sdk/commit/63b52477dce21afd5e077199720e3af060fbded8))





## 0.26.7 (2022-04-25)

**Note:** Version bump only for package @0xflair/typescript-sdk





## 0.26.6 (2022-04-25)


### Bug Fixes

* expose owner and role status on admin minter ([32bdd52](https://github.com/0xflair/typescript-sdk/commit/32bdd521310eadd33c3735517a61904868dc1fbd))





## 0.26.5 (2022-04-25)

**Note:** Version bump only for package @0xflair/typescript-sdk





## 0.26.4 (2022-04-25)

**Note:** Version bump only for package @0xflair/typescript-sdk





## 0.26.3 (2022-04-25)

**Note:** Version bump only for package @0xflair/typescript-sdk





## 0.26.2 (2022-04-25)

**Note:** Version bump only for package @0xflair/typescript-sdk





## 0.26.1 (2022-04-25)


### Bug Fixes

* package deps ([71635ee](https://github.com/0xflair/typescript-sdk/commit/71635eee72447ab494c460f5c91928babf9a65c0))





# 0.26.0 (2022-04-25)


### Features

* move few ui components to SDK ([5bda6bd](https://github.com/0xflair/typescript-sdk/commit/5bda6bda6d9c4ac5a4962900e2a1f24113750d9a))





## 0.25.2 (2022-04-24)


### Bug Fixes

* remove husky auto lint ([86a2e7c](https://github.com/0xflair/typescript-sdk/commit/86a2e7c7fc7b76886685e2d61abefe75b358e710))





## 0.25.1 (2022-04-16)


### Bug Fixes

* check for local storage support before using ([21ea244](https://github.com/0xflair/typescript-sdk/commit/21ea244ab55032e67b12c675e3b1ef8313862c23))





# 0.25.0 (2022-04-16)


### Features

* allow a title for error component ([cec0e7e](https://github.com/0xflair/typescript-sdk/commit/cec0e7e6124d1540762b340891161c8e0dc12a88))





## 0.24.2 (2022-04-16)


### Bug Fixes

* registry mapping export ([45d4513](https://github.com/0xflair/typescript-sdk/commit/45d4513b675e5209f7308f538be0037d4edaedaa))





## 0.24.1 (2022-04-15)


### Bug Fixes

* export supported contract keys as type ([125f2d5](https://github.com/0xflair/typescript-sdk/commit/125f2d5193a8aeb5658f5fbe8560f5961f669050))





# 0.24.0 (2022-04-14)


### Features

* publish web3 react icons package ([a0fbf75](https://github.com/0xflair/typescript-sdk/commit/a0fbf75c466feb80a42fa7dce175452488b4f956))





# 0.23.0 (2022-04-14)


### Features

* bump up the contracts ([08bda8c](https://github.com/0xflair/typescript-sdk/commit/08bda8ca5a2a554be17bf29884dbadcc4d66463a))





## 0.22.2 (2022-04-13)


### Bug Fixes

* allow customizing form section class ([48623eb](https://github.com/0xflair/typescript-sdk/commit/48623eb6eee293e12ced3e5f9201609ee3868f4f))





## 0.22.1 (2022-04-13)


### Bug Fixes

* translate errors based on name ([5323123](https://github.com/0xflair/typescript-sdk/commit/5323123ce6b3f161986eacaccec04dd63397c039))





# 0.22.0 (2022-04-13)


### Features

* throw typed errors while fetching artifacts ([daf9960](https://github.com/0xflair/typescript-sdk/commit/daf996033c6b3172d7e16674cfa1674862593157))





## 0.21.3 (2022-04-12)


### Bug Fixes

* prevent loop on auto-upload for ipfs hooks ([fc37bb4](https://github.com/0xflair/typescript-sdk/commit/fc37bb4c097d7c31744ea5336fbdec6089f2573e))





## 0.21.2 (2022-04-12)


### Bug Fixes

* allow paasing options as args useful when chaining multiple hooks ([19b718e](https://github.com/0xflair/typescript-sdk/commit/19b718e40702aea5f0de33532cf0dc2f439ff18e))





## 0.21.1 (2022-04-12)


### Bug Fixes

* show preview of image field ([9298d59](https://github.com/0xflair/typescript-sdk/commit/9298d59df23e9c83c4c454537669eeddeb9dd2a3))





# 0.21.0 (2022-04-12)


### Features

* allow image filed to be disabled ([bb8fd2d](https://github.com/0xflair/typescript-sdk/commit/bb8fd2d4cafcb547a0e3971ae06e14d32f26edb4))





## 0.20.1 (2022-04-11)


### Bug Fixes

* return of ipfs hash url ([ee5e33a](https://github.com/0xflair/typescript-sdk/commit/ee5e33ac02d740745a8f337bc09d3546146b9ead))





# 0.20.0 (2022-04-11)


### Features

* bump contract versions and add json ipfs uploader ([a575d0f](https://github.com/0xflair/typescript-sdk/commit/a575d0f783d9ba0f804487537e5d09149044949f))





## 0.19.3 (2022-04-10)


### Bug Fixes

* wait for deploy transaction on deployer hook ([4f37407](https://github.com/0xflair/typescript-sdk/commit/4f37407ebef5b4751bdf6e64b416f89dc9b34f63))





## 0.19.2 (2022-04-10)


### Bug Fixes

* packages of react wallet ([1f2f20c](https://github.com/0xflair/typescript-sdk/commit/1f2f20c1ff624fe55d7d1b7d72fcb347f41807aa))





## 0.19.1 (2022-04-09)


### Bug Fixes

* export new components ([e493cd7](https://github.com/0xflair/typescript-sdk/commit/e493cd7d305a1e36bf4eb3ebb8f545b0a35e52eb))





# 0.19.0 (2022-04-09)


### Features

* add a few useful components and fix crypto amount field ([f247795](https://github.com/0xflair/typescript-sdk/commit/f24779552b7c431989441fe712e5afdcf00f075d))





## 0.18.1 (2022-04-09)


### Bug Fixes

* properly handle axios hooks cancelation ([d73105b](https://github.com/0xflair/typescript-sdk/commit/d73105b0bf94ffc057c699b65b21300637eb2413))





# 0.18.0 (2022-04-07)


### Features

* allow tracking of enabled state for a togglable form section ([c86eba8](https://github.com/0xflair/typescript-sdk/commit/c86eba8f340692dc96171391a6401bf18671b549))





## 0.17.1 (2022-04-06)


### Bug Fixes

* export require chain component ([3b44d56](https://github.com/0xflair/typescript-sdk/commit/3b44d56e6ff99f4c160798efa420e0992e628e9f))





# 0.17.0 (2022-04-06)


### Features

* add require chain component ([c17d7f1](https://github.com/0xflair/typescript-sdk/commit/c17d7f18c6abf7076a2f642e7ec19d0846d3f754))





## 0.16.2 (2022-04-06)


### Bug Fixes

* add symbol arg to crypto amount field ([2ae8f97](https://github.com/0xflair/typescript-sdk/commit/2ae8f975ee444ee3e99dc76a74a684b5224ecede))





## 0.16.1 (2022-04-05)


### Bug Fixes

* make source optional on contract definition ([bb60d31](https://github.com/0xflair/typescript-sdk/commit/bb60d312225689ffc0ed71fbc68d5d38213933c1))





# 0.16.0 (2022-04-04)


### Features

* add axios patch hook ([daedf25](https://github.com/0xflair/typescript-sdk/commit/daedf25914c4f5dd95df57ba57a2e96308860877))





# 0.15.0 (2022-04-04)


### Features

* support headers in axios hooks ([dbebb06](https://github.com/0xflair/typescript-sdk/commit/dbebb068defbca19b0e3e901bed90658c2648b0f))





## 0.14.4 (2022-04-04)


### Bug Fixes

* package versions ([21caa6d](https://github.com/0xflair/typescript-sdk/commit/21caa6d5aa0ab419989b9ee9044dc7464e55dba4))





## 0.14.3 (2022-04-04)


### Bug Fixes

* export login button and require login component ([23ce4a7](https://github.com/0xflair/typescript-sdk/commit/23ce4a7946efd3068890660ce75b7b88ff10be9c))





## 0.14.2 (2022-04-04)


### Bug Fixes

* export login provider from barrel ([9c807ce](https://github.com/0xflair/typescript-sdk/commit/9c807ce0c2e31ba9bb1c1e770d91733b4ab4f0ee))





## 0.14.1 (2022-04-04)


### Bug Fixes

* export props with specific name ([b8f3d65](https://github.com/0xflair/typescript-sdk/commit/b8f3d650b9d91342f934162fd980ac180937eab7))





# 0.14.0 (2022-04-03)


### Features

* add wallet login provider and hook ([bd4a9bc](https://github.com/0xflair/typescript-sdk/commit/bd4a9bc3913cfc57cb1661ca576f811c9a40746d))





## 0.13.3 (2022-04-02)


### Bug Fixes

* axios post hook states ([79048b9](https://github.com/0xflair/typescript-sdk/commit/79048b954e4d025e91827d0434e3f5be5564f0f9))





## 0.13.2 (2022-04-02)


### Bug Fixes

* package versions ([4f7936f](https://github.com/0xflair/typescript-sdk/commit/4f7936fe4aac712cd1e7332c21ea970fbb4f20a3))





## 0.13.1 (2022-04-02)


### Bug Fixes

* consistent interface for the hooks ([ce0ec5b](https://github.com/0xflair/typescript-sdk/commit/ce0ec5bdcdff66515c28bdf58debc12883415729))





# 0.13.0 (2022-04-02)


### Features

* add axios post and get hooks ([c472469](https://github.com/0xflair/typescript-sdk/commit/c4724695a96cdcfeb2b7898ca17f04653d251dea))





## 0.12.3 (2022-04-01)


### Bug Fixes

* add more chains for flair supported ones ([305db7c](https://github.com/0xflair/typescript-sdk/commit/305db7c083eda75f606c8fee995ee66df8f1eea8))





## 0.12.2 (2022-04-01)


### Bug Fixes

* use correct contract names ([51f157d](https://github.com/0xflair/typescript-sdk/commit/51f157d30a4ed51412e32a9326734e4ad457ae7e))





## 0.12.1 (2022-04-01)


### Bug Fixes

* use major version locking for peer deps ([efc4547](https://github.com/0xflair/typescript-sdk/commit/efc45475526cb667a28edbd9b676cd37d5a44012))





# 0.12.0 (2022-04-01)


### Features

* add v1.2 contracts to registry ([e306ea4](https://github.com/0xflair/typescript-sdk/commit/e306ea4ff934d6b3c67a88bf08d6786e250f9f50))





## 0.11.14 (2022-04-01)


### Bug Fixes

* add suffix for button classes ([5975e2a](https://github.com/0xflair/typescript-sdk/commit/5975e2acf44d2b4ad555c1d4616256e8d301ff47))





## 0.11.13 (2022-04-01)


### Bug Fixes

* bump up the contracts package ([1c4eaca](https://github.com/0xflair/typescript-sdk/commit/1c4eaca7f9dd91eec5128e268c8f3fe85f38e56a))





## 0.11.12 (2022-04-01)


### Bug Fixes

* use simpler full-featured erc721 contract ([187d686](https://github.com/0xflair/typescript-sdk/commit/187d6862cc2b8c9c3ab7cc62dad8d0182f3742d4))





## 0.11.11 (2022-04-01)


### Bug Fixes

* allow ignoring keys on sticky state ([31d65b7](https://github.com/0xflair/typescript-sdk/commit/31d65b75c447763210130befefb56ad05b1432d8))





## 0.11.10 (2022-03-31)


### Bug Fixes

* accept values for file and preview from parent component ([4961167](https://github.com/0xflair/typescript-sdk/commit/4961167cf58c773b3d7149a78dd55db37e62522d))





## 0.11.9 (2022-03-31)


### Bug Fixes

* correct signature for setting file and preview on image field ([5203faf](https://github.com/0xflair/typescript-sdk/commit/5203faf63f86056a0b7504168a2dae474bc5a47d))





## 0.11.8 (2022-03-30)


### Bug Fixes

* consistent typing for sticky state hook ([599a81e](https://github.com/0xflair/typescript-sdk/commit/599a81e670901f8015853d6f0f64f16f55fd2151))





## 0.11.7 (2022-03-30)


### Bug Fixes

* add generic type to sticky state hook ([7e41444](https://github.com/0xflair/typescript-sdk/commit/7e41444470fa7e5f842c883a1bd1fb274feb90c5))





## 0.11.6 (2022-03-30)


### Bug Fixes

* export stricky state hook ([f8014c0](https://github.com/0xflair/typescript-sdk/commit/f8014c0c853f3faba508e31e583e53251dbcd257))





## 0.11.5 (2022-03-30)


### Bug Fixes

* package versions in flair-sdk ([a84280e](https://github.com/0xflair/typescript-sdk/commit/a84280ed3ffa05fced6ee83a6b15caadd617d017))





## 0.11.4 (2022-03-30)


### Bug Fixes

* package versions in flair-sdk ([6d66c01](https://github.com/0xflair/typescript-sdk/commit/6d66c012711fed5644b3522f56a62ccfbf8767da))





## 0.11.3 (2022-03-30)


### Bug Fixes

* export contracts registry from flair sdk ([5707e04](https://github.com/0xflair/typescript-sdk/commit/5707e041248a02c78ef1ac9145d05f356d66f690))





## 0.11.2 (2022-03-30)


### Bug Fixes

* add Badge and export all ui elements ([1c993a4](https://github.com/0xflair/typescript-sdk/commit/1c993a42aa2f26e62d8299e0d4b5dfcb78213475))





## 0.11.1 (2022-03-30)


### Bug Fixes

* links to packages repo ([ed20d1a](https://github.com/0xflair/typescript-sdk/commit/ed20d1a3ad197fa22d7f3cb6d23c97242708a14a))





# 0.11.0 (2022-03-30)


### Features

* add react-ipfs package ([7013add](https://github.com/0xflair/typescript-sdk/commit/7013addd5c433a0f2175c8dbba582a63438a397a))





## 0.10.2 (2022-03-30)


### Bug Fixes

* package versions ([d57b1ec](https://github.com/0xflair/typescript-sdk/commit/d57b1ec947749b007d5b9353ca22dc7204bb4309))





## 0.10.1 (2022-03-29)


### Bug Fixes

* add machine name mapping for chains ([47f1403](https://github.com/0xflair/typescript-sdk/commit/47f1403d43bfbc92c0a3ce1aacf3c604ef9f400d))





# 0.10.0 (2022-03-29)


### Features

* add ui components and hoverable copy button in code block ([e362c6e](https://github.com/0xflair/typescript-sdk/commit/e362c6e3164adc438ca084948d0bada8c94c2ede))





## 0.9.7 (2022-03-28)


### Bug Fixes

* price currency overlay ([350d285](https://github.com/0xflair/typescript-sdk/commit/350d2857696aa8192a72fb759c3329915d42294f))





## 0.9.6 (2022-03-28)


### Bug Fixes

* export CryptoAmountField ([543cfa2](https://github.com/0xflair/typescript-sdk/commit/543cfa266118833b1ac2b29e44e5ee20cc8efa41))





## 0.9.5 (2022-03-28)


### Bug Fixes

* export crypto amount field ([71a5bc9](https://github.com/0xflair/typescript-sdk/commit/71a5bc9134210d5af74d514755f768d49ac364b6))





## 0.9.4 (2022-03-28)


### Bug Fixes

* use a better name ([debd8b4](https://github.com/0xflair/typescript-sdk/commit/debd8b4d693ad02e890ac8ea16d8046da9c83867))





## 0.9.3 (2022-03-28)


### Bug Fixes

* allow showing prices based on wagmi currency definitions ([031ac3b](https://github.com/0xflair/typescript-sdk/commit/031ac3b878e49106ad36a177db2d8715b5be22e0))





## 0.9.2 (2022-03-28)


### Bug Fixes

* correct deps for flair-sdk ([762bfe0](https://github.com/0xflair/typescript-sdk/commit/762bfe0b6efbf79f88c89cd68d319214f6a5eeef))





## 0.9.1 (2022-03-28)


### Bug Fixes

* add deps on package.json ([6f446e0](https://github.com/0xflair/typescript-sdk/commit/6f446e01e75439e907631a99670b30131b46e2d3))





# 0.9.0 (2022-03-28)


### Features

* add crypto prices package and flair-sdk bundle ([909c5f8](https://github.com/0xflair/typescript-sdk/commit/909c5f8161167d8f8f03733e2860989e4f14ffd5))





## 0.8.2 (2022-03-28)


### Bug Fixes

* more user friendly wallet wall ([5ea0f01](https://github.com/0xflair/typescript-sdk/commit/5ea0f0193e2b82cf9cf12b6e7b8eae72dfa4960a))





## 0.8.1 (2022-03-28)


### Bug Fixes

* export component from barrel ([7001ecb](https://github.com/0xflair/typescript-sdk/commit/7001ecbcf62c32c04fb8ef451030b2e0e4b0d007))





# 0.8.0 (2022-03-28)


### Features

* add require connect component ([828f4be](https://github.com/0xflair/typescript-sdk/commit/828f4be78a6e3aae9c13f1cfc006cda2f1be7838))





## 0.7.4 (2022-03-28)


### Bug Fixes

* spread contract args ([26f3ac8](https://github.com/0xflair/typescript-sdk/commit/26f3ac8e1e9b5a554f8d77e24be318b7c940ed42))





## 0.7.3 (2022-03-28)


### Bug Fixes

* add rest of arguments for erc721 full featured ([5f746f2](https://github.com/0xflair/typescript-sdk/commit/5f746f2807215bfadcebcb9e77186f0318ef60bd))





## 0.7.2 (2022-03-28)


### Bug Fixes

* use node v16 ([744f1b4](https://github.com/0xflair/typescript-sdk/commit/744f1b4b7fff019e6ed7eb516daa0ad88f90b0f0))





## 0.7.1 (2022-03-27)


### Bug Fixes

* copy button position ([07099eb](https://github.com/0xflair/typescript-sdk/commit/07099eb2867da113ed371c070fe4a08e94fd8613))





# 0.7.0 (2022-03-26)


### Features

* add copy feature to code block ([8f9ba2f](https://github.com/0xflair/typescript-sdk/commit/8f9ba2f7a0a12e196b951e67d663117730549240))





# 0.6.0 (2022-03-26)


### Features

* accept language for highlight ([a1abee8](https://github.com/0xflair/typescript-sdk/commit/a1abee8e89593431a420de0bb8af24d23e695a2e))





# 0.5.0 (2022-03-26)


### Features

* add basic code block component ([371c973](https://github.com/0xflair/typescript-sdk/commit/371c973a0b303d00637bd3931e155a31204f40e6))





# 0.4.0 (2022-03-26)


### Features

* add description for image field ([cb246c9](https://github.com/0xflair/typescript-sdk/commit/cb246c93cef6faf5f99fe0fd16bf12b93c990b40))





## 0.3.5 (2022-03-26)


### Bug Fixes

* allow customing class name ([7994cfc](https://github.com/0xflair/typescript-sdk/commit/7994cfcfd954a83cacf72e4c669fe1cf6de8a0b7))





## 0.3.4 (2022-03-26)


### Bug Fixes

* use proper type for children prop ([8c436e8](https://github.com/0xflair/typescript-sdk/commit/8c436e8c88ec65ecb1147bd3c52a29b2a6dff061))





## 0.3.3 (2022-03-26)


### Bug Fixes

* consistent style for image field ([8ee4920](https://github.com/0xflair/typescript-sdk/commit/8ee492043334e2fc15124d8451163be5583f2cc7))





## 0.3.2 (2022-03-26)


### Bug Fixes

* use distiguished names for prop types ([bd96955](https://github.com/0xflair/typescript-sdk/commit/bd96955b9a1904de4eb7c7bf6ae20ffa2038192e))





## 0.3.1 (2022-03-26)


### Bug Fixes

* make image preview setter optional ([1e61626](https://github.com/0xflair/typescript-sdk/commit/1e6162688c60706141eab995f186fea1f7030c12))





# 0.3.0 (2022-03-26)


### Features

* add image field component ([8445b5a](https://github.com/0xflair/typescript-sdk/commit/8445b5ab5c7b67e9408d7f30e540eace64653102))





## 0.2.1 (2022-03-26)


### Bug Fixes

* styling for form header section ([a4d0ae3](https://github.com/0xflair/typescript-sdk/commit/a4d0ae38e46cf16af0e71ff6ef39b0f81b22d390))





# 0.2.0 (2022-03-26)


### Features

* add react-dashboard package for reusable react components for building a web3 dashboard ([d8cd59a](https://github.com/0xflair/typescript-sdk/commit/d8cd59aa104df5d882b106753e514a8e37ea9b89))





## 0.1.9 (2022-03-21)


### Bug Fixes

* correct distribution publishing ([50c0e12](https://github.com/0xflair/typescript-sdk/commit/50c0e12d467f3b09514d0a958ea8a6ab3bada453))





## 0.1.8 (2022-03-21)


### Bug Fixes

* remove access argument ([312d0aa](https://github.com/0xflair/typescript-sdk/commit/312d0aa72b6c0b5a8bf9616f01116a51e5be8f9b))





## 0.1.7 (2022-03-21)


### Bug Fixes

* the latest version ([8cabd68](https://github.com/0xflair/typescript-sdk/commit/8cabd68254bd9a230ff58750eaed6fb056b48319))





## 0.1.5 (2022-03-21)


### Bug Fixes

* publish packages as public ([9c87b47](https://github.com/0xflair/typescript-sdk/commit/9c87b470b9bc32af11e650fc9bddbf7b5c061c38))





## 0.1.4 (2022-03-21)


### Bug Fixes

* ignore verifying access for npm tokens ([06bb728](https://github.com/0xflair/typescript-sdk/commit/06bb7284646eded916aa7278816f0722a31af3c4))





## 0.1.3 (2022-03-21)


### Bug Fixes

* npm creds for publishing ([b31aef9](https://github.com/0xflair/typescript-sdk/commit/b31aef923fe8cb7eee98befd7b846e8259badfc5))





## 0.1.2 (2022-03-21)


### Bug Fixes

* ignore changed files ([aaaec51](https://github.com/0xflair/typescript-sdk/commit/aaaec5188f2bf5400b0aef5aec04140f70071f23))





## 0.1.1 (2022-03-21)


### Bug Fixes

* ignore changed files ([6e5adff](https://github.com/0xflair/typescript-sdk/commit/6e5adffcfc8cbd3532634e7b7900a5a6afe738da))
