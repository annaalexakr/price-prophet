export type AssetId = "BTC" | "ETH" | "CELO" | "GOLD";

const COINGECKO_IDS: Record<AssetId, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  CELO: "celo",
  GOLD: "tether-gold",
};

export async function fetchPrices(
  assets: AssetId[]
): Promise<Record<AssetId, number>> {
  const ids = assets.map((a) => COINGECKO_IDS[a]).join(",");
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("CoinGecko fetch failed");
  const data = await res.json();
  return Object.fromEntries(
    assets.map((asset) => [asset, data[COINGECKO_IDS[asset]]?.usd ?? 0])
  ) as Record<AssetId, number>;
}
