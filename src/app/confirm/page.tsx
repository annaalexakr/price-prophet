"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import type { AssetId } from "@/lib/coingecko";

const BUY_URLS: Record<AssetId, string> = {
  BTC:  "https://btc.minipay.squidrouter.com/",
  ETH:  "https://eth.minipay.squidrouter.com/",
  CELO: "https://minipay.to",
  GOLD: "https://xaut.minipay.squidrouter.com",
};

const ASSET_NAMES: Record<AssetId, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  CELO: "Celo",
  GOLD: "Gold (XAUT0)",
};

function msToMidnightUTC(): number {
  const now = new Date();
  const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return midnight.getTime() - now.getTime();
}

function formatCountdown(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function ConfirmContent() {
  const params = useSearchParams();
  const router = useRouter();

  const asset = (params.get("asset") ?? "BTC") as AssetId;
  const direction = params.get("direction") as "UP" | "DOWN" | null;

  const [timeLeft, setTimeLeft] = useState(msToMidnightUTC());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(msToMidnightUTC()), 1000);
    return () => clearInterval(id);
  }, []);

  const directionLabel = direction === "UP" ? "↑ Higher" : "↓ Lower";
  const directionColor = direction === "UP" ? "text-emerald-400" : "text-rose-400";
  const sentimentPct = direction === "UP" ? 61 : 39;
  const sentimentLabel = direction === "UP" ? "higher" : "lower";

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center">
      <div className="w-full max-w-md px-4 pt-8 pb-6 flex flex-col gap-5">

        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">You're locked in</h1>
          <p className="text-gray-400 text-xs mt-0.5">Predict · Pay · Win</p>
        </div>

        {/* Prediction card */}
        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">Your prediction</p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">{asset}</span>
            <span className={`text-2xl font-bold ${directionColor}`}>{directionLabel}</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">{ASSET_NAMES[asset]} · at midnight UTC</p>
        </div>

        {/* Entry cost */}
        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Entry cost</p>
            <p className="text-white text-2xl font-bold mt-0.5">0.10 <span className="text-gray-400 text-sm font-normal">USDT</span></p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Round closes in</p>
            <p className="text-white text-2xl font-bold mt-0.5 font-mono">{formatCountdown(timeLeft)}</p>
          </div>
        </div>

        {/* Sentiment */}
        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">Player sentiment</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: "61%" }}
              />
            </div>
            <span className="text-white text-sm font-semibold whitespace-nowrap">
              {sentimentPct}% saying {sentimentLabel}
            </span>
          </div>
        </div>

        {/* CTA */}
        <a
          href={BUY_URLS[asset]}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base text-center transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
        >
          Back your prediction → Buy {ASSET_NAMES[asset]}
        </a>

        {/* Change prediction */}
        <button
          onClick={() => router.back()}
          className="text-center text-gray-400 hover:text-white text-sm transition-colors"
        >
          ← Change prediction
        </button>

      </div>
    </main>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense>
      <ConfirmContent />
    </Suspense>
  );
}
