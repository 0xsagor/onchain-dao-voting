# On-Chain DAO Voting System

A flat-structure starter kit for building a Governance DApp. This repository implements a "One Token, One Vote" system where users must hold the specific Governance Token (GT) to participate in decision-making.

## Features
- **Governance Token:** ERC-20 standard token used for voting power.
- **Proposal Lifecycle:** Create, Vote, and Execute proposals.
- **Vote Tracking:** Prevents double-voting and tracks results in real-time.
- **Frontend Dashboard:** View active proposals and cast votes via MetaMask.

## How to Run
1. **Install:** `npm install`
2. **Deploy:** `npx hardhat run deploy.js --network goerli`
3. **Setup:** Copy the deployed addresses (Token & DAO) into `app.js`.
4. **Interact:** Serve `index.html` locally.

## Logic
1. A user acquires `GovToken`.
2. Any holder can create a `Proposal`.
3. Holders vote (For/Against).
4. If `For` votes > `Against`, the proposal is considered passed (logic customizable).

## Tech Stack
- Solidity ^0.8.17
- Ethers.js v5
- Hardhat
