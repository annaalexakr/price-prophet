"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { AssetTabs } from "@/components/AssetTabs";
import { PriceDisplay } from "@/components/PriceDisplay";
import { PotCounter } from "@/components/PotCounter";
import { DirectionButtons, type Direction } from "@/components/DirectionButtons";
import { ConnectWalletModal } from "@/components/ConnectWalletModal";
import { useEnter } from "@/hooks/useEnter";
import type { AssetId } from "@/lib/coingecko";

export default function PredictPage() {
  const router = useRouter();
  const [asset, setAsset] = useState<AssetId>("BTC");
  const [direction, setDirection] = useState<Direction>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const { address } = useAccount();

  const SEED_DATA: Record<AssetId, { pot: number; entryCount: number }> = {
    BTC:  { pot: 24.50, entryCount: 245 },
    ETH:  { pot: 12.30, entryCount: 123 },
    CELO: { pot: 8.10,  entryCount: 81  },
    GOLD: { pot: 6.40,  entryCount: 64  },
  };

  const [pots, setPots] = useState(
    Object.fromEntries(
      (Object.keys(SEED_DATA) as AssetId[]).map((a) => [a, SEED_DATA[a].pot])
    ) as Record<AssetId, number>
  );

  useEffect(() => {
    const id = setInterval(() => {
      setPots((prev) => {
        const next = { ...prev };
        (Object.keys(next) as AssetId[]).forEach((a) => {
          next[a] = parseFloat((next[a] + Math.random() * 0.2).toFixed(2));
        });
        return next;
      });
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  const pot = pots[asset];
  const entryCount = SEED_DATA[asset].entryCount;

  const { enter, status: enterStatus, error: enterError } = useEnter();
  const isBusy = ["approving", "approve-pending", "entering", "enter-pending"].includes(enterStatus);

  useEffect(() => {
    if (enterStatus === "success") {
      router.push(`/confirm?asset=${asset}&direction=${direction}`);
    }
  }, [enterStatus]);

  async function handleLockIn() {
    if (!direction || isBusy) return;
    if (!address) { setShowConnectModal(true); return; }
    await enter(direction === "UP");
  }

  const lockInLabel = () => {
    if (!direction) return "Choose ↑ Higher or ↓ Lower";
    switch (enterStatus) {
      case "approving":      return "Approving USDT…";
      case "approve-pending": return "Waiting for approval…";
      case "entering":       return "Confirming entry…";
      case "enter-pending":  return "Waiting for confirmation…";
      case "error":          return enterError ?? "Error — try again";
      default:
        return `Lock in ${asset} ${direction === "UP" ? "↑ Higher" : "↓ Lower"} · 0.10 USDT`;
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-md px-4 pt-8 pb-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Price Prophet</h1>
            <p className="text-gray-400 text-xs mt-0.5">Predict · Pay · Win</p>
          </div>
          <div className="text-right">
            {address ? (
              <p className="text-xs text-gray-400 font-mono">
                {address.slice(0, 6)}…{address.slice(-4)}
              </p>
            ) : (
              <button
                onClick={() => setShowConnectModal(true)}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                No wallet
              </button>
            )}
          </div>
        </div>

        {/* Asset Tabs */}
        <AssetTabs selected={asset} onChange={(a) => { setAsset(a); setDirection(null); }} />

        {/* Live Price */}
        <PriceDisplay asset={asset} />

        {/* Pot Counter */}
        <PotCounter pot={pot} entryCount={entryCount} />

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-800" />
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Your prediction</p>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        {/* Direction Buttons */}
        <DirectionButtons selected={direction} onSelect={setDirection} />

        {/* Entry cost notice */}
        <p className="text-center text-gray-500 text-xs mt-3">
          Entry costs <span className="text-gray-300 font-semibold">0.10 USDT</span> · Correct predictors share 70% of the pot
        </p>
      </div>

      {/* Sticky Lock-in Button */}
      <div className="sticky bottom-0 w-full max-w-md px-4 py-4 bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent">
        <button
          onClick={handleLockIn}
          disabled={!direction || isBusy}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
            direction && !isBusy
              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
              : enterStatus === "error"
              ? "bg-red-900/60 text-red-300 cursor-pointer"
              : "bg-gray-800 text-gray-400 cursor-not-allowed"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {isBusy && (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {lockInLabel()}
          </span>
        </button>
      </div>
      {showConnectModal && (
        <ConnectWalletModal onClose={() => setShowConnectModal(false)} />
      )}
    </main>
  );
}
