"use client";

import type { AssetId } from "@/lib/coingecko";

const ASSETS: { id: AssetId; label: string; emoji: string }[] = [
  { id: "BTC", label: "BTC", emoji: "₿" },
  { id: "ETH", label: "ETH", emoji: "Ξ" },
  { id: "CELO", label: "CELO", emoji: "🌱" },
  { id: "GOLD", label: "XAUT0", emoji: "✦" },
];

interface AssetTabsProps {
  selected: AssetId;
  onChange: (asset: AssetId) => void;
}

export function AssetTabs({ selected, onChange }: AssetTabsProps) {
  return (
    <div className="flex gap-2 w-full">
      {ASSETS.map(({ id, label, emoji }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            selected === id
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          <span className="block text-base leading-none mb-0.5">{emoji}</span>
          {label}
        </button>
      ))}
    </div>
  );
}
