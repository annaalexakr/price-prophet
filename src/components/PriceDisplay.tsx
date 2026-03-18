"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRef } from "react";
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
  const priceCache = useRef<Partial<Record<AssetId, number>>>({});

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["price", asset],
    queryFn: () => fetchPrices([asset]),
    refetchInterval: 30_000,
    staleTime: 25_000,
    placeholderData: keepPreviousData,
  });

  const freshPrice = data?.[asset];
  if (freshPrice) priceCache.current[asset] = freshPrice;
  const price = freshPrice ?? priceCache.current[asset];

  return (
    <div className="text-center py-6">
      <p className="text-gray-400 text-sm mb-1">{ASSET_NAMES[asset]} · Live price</p>
      {isLoading && !price ? (
        <div className="h-12 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="relative inline-block">
          <p className="text-5xl font-bold tracking-tight text-white">
            ${price?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          {isFetching && !isLoading && (
            <span className="absolute -top-1 -right-3 w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          )}
        </div>
      )}
      <p className="text-gray-500 text-xs mt-2">
        {isError && price
          ? "⚠ Showing cached price · retrying…"
          : "Refreshes every 30s · Midnight UTC closes round"}
      </p>
    </div>
  );
}
