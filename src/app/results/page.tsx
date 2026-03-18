"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResultsPage() {
  const router = useRouter();
  const [claimed, setClaimed] = useState(false);

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center">
      <div className="w-full max-w-md px-4 pt-12 pb-6 flex flex-col gap-5">

        {/* Hero */}
        <div className="text-center py-4">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-white tracking-tight">You won!</h1>
          <p className="text-indigo-400 text-sm mt-2 font-medium">Your prediction was correct</p>
        </div>

        {/* Winnings */}
        <div className="bg-gradient-to-br from-indigo-600/30 to-indigo-900/30 border border-indigo-500/40 rounded-2xl p-6 text-center">
          <p className="text-indigo-300 text-xs font-medium uppercase tracking-wider mb-2">Your winnings</p>
          <p className="text-5xl font-bold text-white">4.20</p>
          <p className="text-indigo-300 text-lg font-semibold mt-1">USDT</p>
        </div>

        {/* Prediction result */}
        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">Winning prediction</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white">BTC</span>
            <span className="text-2xl font-bold text-emerald-400">↑ Higher</span>
            <span className="ml-auto bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full">Correct ✓</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Bitcoin closed higher at midnight UTC</p>
        </div>

        {/* Cost vs winnings breakdown */}
        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Entry cost</p>
            <p className="text-white text-xl font-bold mt-0.5">
              0.10 <span className="text-gray-400 text-sm font-normal">USDT</span>
            </p>
          </div>
          <div className="text-gray-600 text-2xl">→</div>
          <div className="text-right">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Winnings</p>
            <p className="text-emerald-400 text-xl font-bold mt-0.5">
              4.20 <span className="text-gray-400 text-sm font-normal">USDT</span>
            </p>
          </div>
        </div>

        {/* Return multiple */}
        <p className="text-center text-gray-500 text-xs">
          42× return · You shared the pot with{" "}
          <span className="text-gray-300 font-semibold">5 other correct predictors</span>
        </p>

        {/* Claim button */}
        <button
          onClick={() => setClaimed(true)}
          disabled={claimed}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
            claimed
              ? "bg-emerald-700/40 text-emerald-400 cursor-default"
              : "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 active:scale-[0.98]"
          }`}
        >
          {claimed ? "Winnings claimed ✓" : "Claim winnings · 4.20 USDT"}
        </button>

        {/* Play again */}
        <button
          onClick={() => router.push("/")}
          className="w-full py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-base transition-all"
        >
          Play again
        </button>

      </div>
    </main>
  );
}
