export const PRICE_PROPHET_ADDRESS = "0xddC27F2D5A2D69F029D91D20F87D5c1EBE7cd978" as const;
export const USDT_ADDRESS           = "0xd077A400968890Eacc75cdc901F0356c943e4fDb" as const;
export const ENTRY_FEE              = 100_000n; // 0.10 USDT, 6 decimals

export const PRICE_PROPHET_ABI = [
  {
    name: "enter",
    type: "function",
    stateMutability: "nonpayable",
    inputs:  [{ name: "_predictedUp", type: "bool" }],
    outputs: [],
  },
] as const;

export const ERC20_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs:  [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs:  [{ name: "owner", type: "address" }, { name: "spender", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;
