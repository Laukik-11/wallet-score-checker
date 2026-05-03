import { createConfig, http } from 'wagmi';
import { arbitrum, base, mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import {
  arbitrumHttpRpcUrlForClient,
  baseHttpRpcUrlForClient,
  ethereumHttpRpcUrlForClient,
} from '@/lib/ethereumRpc';

const baseRpc = baseHttpRpcUrlForClient();
const arbRpc = arbitrumHttpRpcUrlForClient();

export const wagmiConfig = createConfig({
  connectors: [injected()],
  chains: [mainnet, base, arbitrum],
  transports: {
    [mainnet.id]: http(ethereumHttpRpcUrlForClient()),
    [base.id]: baseRpc ? http(baseRpc) : http(),
    [arbitrum.id]: arbRpc ? http(arbRpc) : http(),
  },
});
