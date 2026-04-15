/**
 * WalletButton - Custom Wallet Connection UI
 * Shows Connect Wallet when disconnected, wallet info + balance when connected
 * Integrates with @solana/wallet-adapter-react
 */
import { useState, useEffect, useCallback } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Wallet, ChevronDown, Copy, LogOut, ExternalLink, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  getLobclawBalance,
  getUsdcBalance,
  shortenAddress,
  getExplorerUrl,
} from "@/lib/solana";
import { SOLANA_NETWORK } from "@/lib/contractConfig";

export default function WalletButton() {
  const { publicKey, connected, disconnect, wallet } = useWallet();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lobclawBal, setLobclawBal] = useState<number | null>(null);
  const [usdcBal, setUsdcBal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBalances = useCallback(async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      const [lob, usdc] = await Promise.all([
        getLobclawBalance(publicKey),
        getUsdcBalance(publicKey),
      ]);
      setLobclawBal(lob);
      setUsdcBal(usdc);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalances();
    } else {
      setLobclawBal(null);
      setUsdcBal(null);
    }
  }, [connected, publicKey, fetchBalances]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = () => setDropdownOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [dropdownOpen]);

  const handleConnect = () => {
    setVisible(true);
  };

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      toast.success("Address copied to clipboard");
    }
  };

  const handleDisconnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    disconnect();
    setDropdownOpen(false);
    toast.info("Wallet disconnected");
  };

  const handleViewExplorer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (publicKey) {
      window.open(getExplorerUrl(publicKey.toBase58(), "address", SOLANA_NETWORK), "_blank");
    }
  };

  if (!connected || !publicKey) {
    return (
      <button
        onClick={handleConnect}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber text-black font-semibold text-sm hover:bg-amber-dim transition-all hover:shadow-[0_0_20px_oklch(0.82_0.17_75/30%)] active:scale-95"
      >
        <Wallet size={16} />
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border hover:border-amber/40 transition-all text-sm font-medium text-foreground"
      >
        {wallet?.adapter.icon && (
          <img src={wallet.adapter.icon} alt={wallet.adapter.name} className="w-5 h-5 rounded" />
        )}
        <span className="font-mono text-ice">{shortenAddress(publicKey.toBase58())}</span>
        <ChevronDown size={14} className={`text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 glass-card border border-border/60 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center gap-3 mb-3">
                {wallet?.adapter.icon && (
                  <img src={wallet.adapter.icon} alt={wallet.adapter.name} className="w-8 h-8 rounded-lg" />
                )}
                <div>
                  <p className="text-xs text-muted-foreground">{wallet?.adapter.name}</p>
                  <p className="text-sm font-mono font-bold text-ice">{shortenAddress(publicKey.toBase58(), 6)}</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400">Connected</span>
                </div>
              </div>

              {/* Balances */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] text-muted-foreground mb-0.5">$lobclaw</p>
                  <p className="text-sm font-mono font-bold text-amber">
                    {loading ? (
                      <RefreshCw size={12} className="animate-spin inline" />
                    ) : lobclawBal !== null ? (
                      lobclawBal.toLocaleString(undefined, { maximumFractionDigits: 0 })
                    ) : "—"}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] text-muted-foreground mb-0.5">USDC</p>
                  <p className="text-sm font-mono font-bold text-green-400">
                    {loading ? (
                      <RefreshCw size={12} className="animate-spin inline" />
                    ) : usdcBal !== null ? (
                      `$${usdcBal.toFixed(2)}`
                    ) : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-2">
              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              >
                <Copy size={14} />
                Copy Address
              </button>
              <button
                onClick={handleViewExplorer}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              >
                <ExternalLink size={14} />
                View on Solscan
              </button>
              <button
                onClick={() => { fetchBalances(); toast.info("Balances refreshed"); }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              >
                <RefreshCw size={14} />
                Refresh Balances
              </button>
              <div className="border-t border-border/50 mt-1 pt-1">
                <button
                  onClick={handleDisconnect}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-burn hover:bg-burn/10 transition-colors"
                >
                  <LogOut size={14} />
                  Disconnect
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
