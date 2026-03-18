# Price Prophet — CLAUDE.md

## What This App Does

Price Prophet is a MiniPay miniapp (mobile-first Web3 prediction game) where users:
1. Pay 0.10 USDT to predict whether BTC, ETH, CELO, or Gold will be **higher or lower** at midnight UTC
2. At midnight, correct predictors share **70% of the daily pot**; the house keeps **30%**
3. Each asset has its own daily pot and prediction round

## Tech Stack

- **Next.js 15** (App Router, TypeScript, Tailwind CSS)
- **Convex** — backend database & serverless functions (to be set up)
- **wagmi + viem** — wallet connection; MiniPay injects a wallet so we read the address via wagmi
- **@tanstack/react-query** — data fetching
- **CoinGecko free API** — live price data (no API key required for basic endpoints)

## MiniPay Integration

MiniPay (by Opera) injects an EIP-1193 provider into `window.ethereum`. We use wagmi's `injected()` connector to pick it up. Users do NOT connect manually — the wallet is always available. We read `address` from `useAccount()`.

## Payment Handling

Payments are **simulated** for now — we just write `{ address, asset, direction, paid: true }` to Convex. Real on-chain USDT transfers on Celo will be added later.

## Screens

### 1. Predict Screen (`/` — home)
- Asset tabs: BTC | ETH | CELO | Gold
- Live price fetched from CoinGecko (updates every 30s)
- Current pot size for today (starts at 0, increments as entries come in)
- Up ↑ and Down ↓ selection buttons
- "Lock in prediction" CTA button at bottom
- Mobile-first, minimal dark UI

### 2. Confirmation Screen (`/confirm`)
- Shows: asset, direction chosen, amount paid (0.10 USDT), number of participants so far
- "You're in!" state after payment confirmed
- Back to Predict link

### 3. Results Screen (`/results`)
- Shows yesterday's results per asset
- Winner payout per correct predictor
- User's own result if they played

## CoinGecko API

Free tier, no key needed:
```
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,celo,gold&vs_currencies=usd
```

Asset ID map:
- BTC → `bitcoin`
- ETH → `ethereum`
- CELO → `celo`
- Gold → `gold` (XAU)

## File Structure

```
src/
  app/
    layout.tsx          — root layout with wagmi providers
    page.tsx            — Predict screen
    confirm/page.tsx    — Confirmation screen
    results/page.tsx    — Results screen
  components/
    AssetTabs.tsx       — tab switcher for BTC/ETH/CELO/Gold
    PriceDisplay.tsx    — live price with auto-refresh
    PotCounter.tsx      — today's pot size
    DirectionButtons.tsx — Up/Down selection
  lib/
    wagmi.ts            — wagmi config (injected connector for MiniPay)
    coingecko.ts        — price fetching helpers
  providers/
    Providers.tsx       — WagmiProvider + QueryClientProvider wrapper
```

## Convex Schema (planned)

```
predictions: {
  address: string,       // wallet address
  asset: "BTC"|"ETH"|"CELO"|"GOLD",
  direction: "UP"|"DOWN",
  roundDate: string,     // YYYY-MM-DD UTC
  paid: boolean,
  createdAt: number,
}

rounds: {
  asset: string,
  date: string,          // YYYY-MM-DD UTC
  openingPrice: number,
  closingPrice: number,
  pot: number,
  settled: boolean,
}
```

## Development

```bash
npm run dev    # starts on http://localhost:3000
```

## Current Status

- [x] Next.js + TypeScript + Tailwind scaffolded
- [x] wagmi + viem + react-query installed
- [x] Predict screen built (live BTC price, asset tabs, Up/Down, pot counter)
- [ ] Convex backend setup
- [ ] Confirmation screen
- [ ] Results screen
- [ ] On-chain USDT payment on Celo
