'use client';

import { useMemo } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletStatus() {
  const { address, isConnected, chain } = useAccount();

  const formattedAddress = useMemo(() => {
    if (!address) return 'Not connected';
    return shortenAddress(address);
  }, [address]);

  return (
    <section className="wallet-card">
      <header className="wallet-card__header">
        <span className="wallet-card__kicker">Wallet Access</span>
        <h2 className="wallet-card__title">Connect and verify your address</h2>
      </header>

      <div className="wallet-card__connect">
        <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
      </div>

      <dl className="wallet-card__stats">
        <div className="wallet-card__stat-item">
          <dt>Status</dt>
          <dd>
            <span className={`status-pill ${isConnected ? 'status-pill--online' : 'status-pill--offline'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </dd>
        </div>

        <div className="wallet-card__stat-item">
          <dt>Wallet</dt>
          <dd className="mono">{formattedAddress}</dd>
        </div>

        <div className="wallet-card__stat-item">
          <dt>Network</dt>
          <dd>{chain?.name || '—'}</dd>
        </div>
      </dl>
    </section>
  );
}
