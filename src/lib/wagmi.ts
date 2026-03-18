import { createConfig, http } from "wagmi";
import { celoSepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [celoSepolia],
  connectors: [injected()],
  transports: {
    [celoSepolia.id]: http(),
  },
});
