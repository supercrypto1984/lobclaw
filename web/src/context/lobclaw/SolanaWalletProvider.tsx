/*
 * SolanaWalletProvider — LobClaw Web3 Wallet Context
 * Supports: Phantom, Solflare, Backpack, Coinbase, Torus, Ledger, Slope, etc.
 * Uses @solana/wallet-adapter-react + @solana/wallet-adapter-wallets
 */
import { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CoinbaseWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  NightlyWalletAdapter,
  TrustWalletAdapter,
  Coin98WalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

// Import wallet adapter default styles
import "@solana/wallet-adapter-react-ui/styles.css";

const SOLANA_RPC =
  import.meta.env.VITE_SOLANA_RPC ||
  clusterApiUrl(WalletAdapterNetwork.Mainnet);

interface Props {
  children: React.ReactNode;
}

export function SolanaWalletProvider({ children }: Props) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new NightlyWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new TrustWalletAdapter(),
      new Coin98WalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={SOLANA_RPC}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
