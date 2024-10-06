import { cookieStorage, createStorage } from 'wagmi'
import {
  getDefaultConfig,
  Chain,
} from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
  goerli,
} from 'wagmi/chains';

export const projectId = "57c06bfa9b58dd0b15fa4379a997014f";


// Create wagmiConfig
export const config = getDefaultConfig({
  appName: "Decentralized voting system",
  chains: [mainnet, goerli, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
  projectId,
})