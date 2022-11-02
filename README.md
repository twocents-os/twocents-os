This is project - [TwoCents](https://beta.twocents.so/).
You can find full documentation here -> [`docs`](https://twocents.gitbook.io/docs/).

## About project

We are building a self sovereign identity and reputation layer for people in the EVM ecosystem.

Two Cents will be open source and enable people wanting to create networks to easily be able do so through open source software that helps people easily understand any web3 reputation score for wallet addresses as well as establish their own self sovereign identity.

## Quick start - Try Twocents in action

- Visit - [TwoCents](https://beta.twocents.so/).
- Connect wallet
- Visit your profile page (from menu)
- Create your Ceramic DID by clicking - "Connect Ceramic" button
- Find other people with eth address or ens by using search bar.
- Wanna give them credentials? Just click - "Give VC" button under profile avatar and fillout the form
- Searching someone with specific skills ? just type skills keyword in searchbard and see list of profiles

## Learn more

Want to learn more?

- [About](https://twocents.gitbook.io/docs/)
- [System Design](https://twocents.gitbook.io/docs/system-design)
- [Project Structure](https://twocents.gitbook.io/docs/project-structure)

## Lib - generate verifiable credentials

We are using Ceramic datamodel/schema to generate VC wich fits [W3C DID Verifiable Credentials standards](https://www.w3.org/TR/vc-data-model/)

You can read more [here](https://github.com/ceramicstudio/datamodels/tree/main/models/verifiable-credentials)

- You can find lib file [here](https://github.com/twocents-os/twocents-os/blob/main/src/libs/issue-vc.js)

## Join

- Join and Text us on [discord](https://discord.com/invite/Sp9qSmhsgJ)

## Setup for contribution

- setup mongodb (local or use service like mongodb atlas)
- rename env.example -> env.development
- update content of env.development

```bash
npm install
npm run dev
```

PRs and issue reports are super welcome
