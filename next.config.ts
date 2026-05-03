import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@rainbow-me/rainbowkit'],
  /** Avoid bundling viem into Route Handlers (fixes @noble/hashes / webpack runtime errors). */
  serverExternalPackages: ['viem'],
  webpack: (config) => {
    // Optional deps pulled in by MetaMask SDK / WalletConnect; not used in the browser bundle.
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
    };
    return config;
  },
};

export default nextConfig;
