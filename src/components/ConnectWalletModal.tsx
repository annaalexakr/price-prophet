"use client";

import { useConnect } from "wagmi";

interface ConnectWalletModalProps {
  onClose: () => void;
}

export function ConnectWalletModal({ onClose }: ConnectWalletModalProps) {
  const { connect, connectors, isPending } = useConnect();

  function handleConnect() {
    const metamask = connectors.find((c) => c.name === "MetaMask") ?? connectors[0];
    connect({ connector: metamask }, { onSuccess: onClose });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-72 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white font-bold text-lg mb-1">Connect Wallet</h2>
        <p className="text-gray-400 text-sm mb-5">Connect MetaMask to start predicting.</p>
        <button
          onClick={handleConnect}
          disabled={isPending}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold transition-all"
        >
          {isPending ? "Connecting…" : "Connect MetaMask"}
        </button>
        <button
          onClick={onClose}
          className="w-full mt-3 py-2 rounded-xl text-gray-400 hover:text-white text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
