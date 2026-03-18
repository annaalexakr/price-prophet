"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPrices, type AssetId } from "@/lib/coingecko";

const ASSET_NAMES: Record<AssetId, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  CELO: "Celo",
  GOLD: "Gold (XAUT0)",
};

interface PriceDisplayProps {
  asset: AssetId;
}

export function PriceDisplay({ asset }: PriceDisplayProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["price", asset],
    queryFn: () => fetchPrices([asset]),
    refetchInterval: 30_000,
    staleTime: 25_000,
  });

  const price = data?.[asset];

  return (
    <div className="text-center py-6">
      <p className="text-gray-400 text-sm mb-1">{ASSET_NAMES[asset]} · Live price</p>
      {isLoading ? (
        <div className="h-12 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : isError ? (
        <p className="text-red-400 text-sm">Failed to load price</p>
      ) : (
        <p className="text-5xl font-bold tracking-tight text-white">
          $
          {price?.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      )}
      <p className="text-gray-500 text-xs mt-2">Refreshes every 30s · Midnight UTC closes round</p>
    </div>
  );
}
