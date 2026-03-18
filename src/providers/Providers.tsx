"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function DemoShortcut() {
  const router = useRouter();
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "w" || e.key === "W") router.push("/results");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DemoShortcut />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
