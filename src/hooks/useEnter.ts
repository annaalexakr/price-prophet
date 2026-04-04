"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import {
  PRICE_PROPHET_ADDRESS,
  USDT_ADDRESS,
  ENTRY_FEE,
  PRICE_PROPHET_ABI,
  ERC20_ABI,
} from "@/lib/contracts";

export type EnterStatus =
  | "idle"
  | "approving"
  | "approve-pending"
  | "entering"
  | "enter-pending"
  | "success"
  | "error";

export function useEnter() {
  const { address } = useAccount();
  const [status, setStatus] = useState<EnterStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const { writeContractAsync } = useWriteContract();

  // Check current USDT allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: USDT_ADDRESS,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [address!, PRICE_PROPHET_ADDRESS],
    query: { enabled: !!address },
  });

  // Track the enter tx so we can wait for confirmation
  const [enterTxHash, setEnterTxHash] = useState<`0x${string}` | undefined>();
  const { isSuccess: enterConfirmed } = useWaitForTransactionReceipt({ hash: enterTxHash });

  async function enter(predictedUp: boolean) {
    if (!address) return;
    setError(null);

    try {
      // Step 1 — approve if allowance is insufficient
      const currentAllowance = allowance ?? 0n;
      if (currentAllowance < ENTRY_FEE) {
        setStatus("approving");
        const approveTx = await writeContractAsync({
          address: USDT_ADDRESS,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [PRICE_PROPHET_ADDRESS, ENTRY_FEE],
        });

        setStatus("approve-pending");
        // Wait for approval to be mined before entering
        await waitForReceipt(approveTx);
        await refetchAllowance();
      }

      // Step 2 — call enter()
      setStatus("entering");
      const enterTx = await writeContractAsync({
        address: PRICE_PROPHET_ADDRESS,
        abi: PRICE_PROPHET_ABI,
        functionName: "enter",
        args: [predictedUp],
      });

      setEnterTxHash(enterTx);
      setStatus("enter-pending");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Transaction failed";
      setError(msg.includes("User rejected") ? "Transaction cancelled" : msg);
      setStatus("error");
    }
  }

  // Mark success once the enter tx is confirmed on-chain
  if (enterConfirmed && status === "enter-pending") {
    setStatus("success");
  }

  return { enter, status, error };
}

// Helper: poll for receipt without importing viem directly
async function waitForReceipt(hash: `0x${string}`) {
  const { createPublicClient, http } = await import("viem");
  const { celoSepolia } = await import("wagmi/chains");
  const client = createPublicClient({ chain: celoSepolia, transport: http() });
  await client.waitForTransactionReceipt({ hash });
}
