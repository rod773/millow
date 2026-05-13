# Millow — Real Estate NFT DApp

## Stack
- React 18 (CRA `react-scripts@5.0.1`), ethers v5, framer-motion
- Hardhat + Solidity `0.8.17`, OpenZeppelin v4
- No router, no TypeScript

## Commands
| command | what |
|---|---|
| `yarn dev` | start CRA dev server on `localhost:3000` |
| `yarn build` | production build (needs `.env` workaround, see below) |
| `yarn test` | CRA test runner (Jest) |
| `yarn hardhat test` | run Solidity tests in `test/` |
| `yarn hardhat node` | start local Hardhat node on `localhost:8545` |
| `yarn hardhat run ./scripts/deploy.js --network localhost` | deploy contracts to localhost |

## Build quirk (react-scripts 5.0.1 bug)
Build hangs at "Creating an optimized production build..." without env vars:
```
DISABLE_ESLINT_PLUGIN=true  # prevents ESLint webpack plugin from hanging
GENERATE_SOURCEMAP=false    # speeds up build
CI=false                    # prevents warnings → errors
```
These are in `.env` at repo root.

## Vercel deploy
`vercel.json` uses `yarn install --production=true` to skip all devDependencies (hardhat, hardhat-toolbox, @openzeppelin/contracts — not needed for frontend). Favicon references `logo.svg`.

## Project map
```
contracts/          Solidity source (RealEstate.sol, Escrow.sol)
scripts/deploy.js   Deploys RealEstate + Escrow, mints 3 NFTs, lists them
test/Escrow.js      Hardhat contract tests
src/
  abis/             Full contract artifacts (imported directly)
  assets/           logo.svg, houses.png banner, close.svg
  components/       React components (no router — single page)
  config.json       Contract addresses keyed by chainId (only 31337 / localhost)
index.css           All styles in one file
```

## Wallet connection
- EIP-6963 multi-wallet detection (MetaMask, Rabby, etc.)
- WalletConnect (prompts user for Project ID from cloud.walletconnect.com)
- Coinbase Wallet SDK (`@coinbase/wallet-sdk`)
- Falls back to legacy `window.ethereum` detection after 500ms
