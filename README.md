# Price Prophet 🔮
**Predict crypto prices. Back your conviction. Win from the pot.**

Price Prophet is a MiniPay miniapp and prediction market where users pay 0.10 USDT to predict whether BTC, ETH, CELO, or Gold (XAUT0) will be higher or lower at midnight UTC. Correct predictors share 70% of the daily pot — the house keeps 30%.

Built at the Celo internal AI hackathon, March 2026.

## How it works
1. **Pick an asset** — BTC, ETH, CELO, or Gold (XAUT0)
2. **Predict** — will the price be higher or lower at midnight UTC?
3. **Pay** — 0.10 USDT entry fee, held in escrow on-chain
4. **Back it** — one tap to buy the asset directly through MiniPay's Buy Gold, Buy BTC, or Buy ETH miniapps
5. **Win** — correct predictors share 70% of the daily pot at resolution

## Revenue model
- 30% house cut on every daily pot across all assets
- Transaction fees — every "Back your prediction" tap drives a real buy or sell through MiniPay's asset miniapps, generating on-chain fees on Celo
- Ecosystem flywheel — the game creates conviction, MiniPay closes the trade

## Tech stack

**Frontend**
- Next.js 15 + TypeScript
- Tailwind CSS
- wagmi + viem (wallet connection and on-chain interactions)
- TanStack Query
- CoinGecko API (live price feeds, refreshing every 30s)

**Smart Contract**
- Solidity
- Foundry (development, testing, deployment)
- Deployed on Celo Sepolia testnet
- USDT as the entry token

**Infrastructure**
- Vercel (hosting)
- GitHub (version control)

## Smart contract

The `PriceProphet.sol` contract handles the full game lifecycle:
- `enter(bool _predictedUp)` — accepts 0.10 USDT from a player and stores their address and prediction (UP or DOWN)
- `resolve(bool _priceWentUp)` — owner-only function that closes the round, distributes 70% of the pot equally among correct predictors, and sends 30% to the house
- If no players win, the full pot goes to the house
- Guards against double-resolution and unauthorized access

**Contract address on Celo Sepolia:** `0xddC27F2D5A2D69F029D91D20F87D5c1EBE7cd978`

## Live deployments

| Version | URL | Description |
|---------|-----|-------------|
| Demo | price-prophet-app.vercel.app | Simulated payments, stable demo |
| On-chain | price-prophet.vercel.app | Real USDT transactions on Celo Sepolia |

## MiniPay integration

Price Prophet is designed to live natively inside MiniPay. The wallet connection uses wagmi's `injected()` connector, which automatically picks up MiniPay's injected wallet provider on Android — no extra setup required for MiniPay users.

Each asset's "Back your prediction" button deep-links directly into the corresponding MiniPay miniapp:
- Gold → xaut.minipay.squidrouter.com
- BTC → btc.minipay.squidrouter.com
- ETH → eth.minipay.squidrouter.com

## Running locally

```bash
git clone https://github.com/annaalexakr/price-prophet
cd price-prophet
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## What's next
- Chainlink price oracle for trustless on-chain resolution
- Daily streak multipliers for retention
- Social prediction pools — invite friends via phone number
- CELO as a playable asset to drive demand for the network
- Leaderboard and accuracy tracking
