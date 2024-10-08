import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  arbitrumSepolia
} from 'wagmi/chains';

import { http } from 'wagmi'

export const projectId = "Decentralized voting system";

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = getDefaultConfig({
  appName: "Decentralized voting system",
  chains: [arbitrumSepolia],
  ssr: true,
  projectId,
  transports: {
    [arbitrumSepolia.id]: http()
  },
})