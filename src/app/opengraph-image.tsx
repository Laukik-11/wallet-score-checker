import { ImageResponse } from 'next/og';

export const alt = 'Wallet Score Checker — on-chain trust signal';
/** 16:9 — matches recommended cover aspect ratio (e.g. 640×360). */
export const size = { width: 1200, height: 675 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 64px',
          backgroundColor: '#070c18',
          backgroundImage:
            'radial-gradient(ellipse 90% 70% at 70% 10%, rgb(92 62 158 / 35%), transparent 52%), radial-gradient(ellipse 70% 55% at 15% 90%, rgb(58 92 168 / 30%), transparent 48%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: '2px solid rgb(99 164 255 / 45%)',
              background: 'rgb(99 164 255 / 12%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              color: '#63a4ff',
              letterSpacing: '-0.06em',
            }}
          >
            WS
          </div>
          <span style={{ fontSize: 28, fontWeight: 600, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            Wallet Score Checker
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 980 }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            On-chain trust signals for Web3 counterparties
          </div>
          <div style={{ fontSize: 22, color: 'rgb(168 182 212)', lineHeight: 1.45 }}>
            CIBIL-inspired lens—explainable wallet scores from verifiable behaviour.
          </div>
        </div>
        <div style={{ fontSize: 18, color: 'rgb(99 164 255)', fontWeight: 600 }}>Ethereum · EVM</div>
      </div>
    ),
    { ...size },
  );
}
