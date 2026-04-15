/*
 * useSolanaWallet — LobClaw $LOBCLAW SPL Token Burn Logic
 * Uses @solana/wallet-adapter-react for multi-wallet support.
 *
 * Exports:
 *   - LOBCLAW_BURN_AMOUNT: number (display units)
 *   - BURN_ADDRESS: string (SPL incinerator)
 *   - MEME_BURN_DISPLAY: string (legacy compat)
 *   - getLobclawBalance(walletAddress): Promise<number>
 *   - burnLobclaw(walletAddress): Promise<txSignature>
 *   - useSolanaWallet(): legacy hook (kept for backward compat)
 */
import { useState, useCallback, useEffect } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

// ─── Config ───────────────────────────────────────────────────────────────────
export const LOBCLAW_BURN_AMOUNT = Number(
  import.meta.env.VITE_LOBCLAW_BURN_AMOUNT ?? import.meta.env.VITE_MEME_BURN_AMOUNT ?? 1_000
);

// SPL Token incinerator address (well-known burn address for SPL tokens)
export const BURN_ADDRESS = "1nc1nerator11111111111111111111111111111111";

// $LOBCLAW token mint address (set via env)
const LOBCLAW_MINT_STR =
  import.meta.env.VITE_LOBCLAW_TOKEN_MINT ??
  import.meta.env.VITE_MEME_TOKEN_MINT ??
  "";

const SOLANA_RPC =
  import.meta.env.VITE_SOLANA_RPC ??
  "https://api.mainnet-beta.solana.com";

// Legacy compat export
export const MEME_BURN_DISPLAY = `${LOBCLAW_BURN_AMOUNT.toLocaleString()} $LOBCLAW`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getConnection(): Connection {
  return new Connection(SOLANA_RPC, "confirmed");
}

/**
 * Get $LOBCLAW SPL token balance for a wallet address.
 * Returns 0 if no token account exists or mint not configured.
 */
export async function getLobclawBalance(walletAddress: string): Promise<number> {
  if (!LOBCLAW_MINT_STR) return 0;
  try {
    const connection = getConnection();
    const walletPubkey = new PublicKey(walletAddress);
    const mintPubkey = new PublicKey(LOBCLAW_MINT_STR);
    const ata = await getAssociatedTokenAddress(mintPubkey, walletPubkey);
    const info = await connection.getTokenAccountBalance(ata);
    return Number(info.value.uiAmount ?? 0);
  } catch {
    return 0;
  }
}

/**
 * Build and send a $LOBCLAW SPL token transfer to the incinerator address.
 * Uses window.solana (Phantom-compatible injected provider) for signing.
 * Returns the transaction signature on success.
 * Throws on user rejection or network error.
 */
export async function burnLobclaw(walletAddress: string): Promise<string> {
  if (!LOBCLAW_MINT_STR) {
    throw new Error(
      "LOBCLAW token mint address not configured. Set VITE_LOBCLAW_TOKEN_MINT in your environment."
    );
  }

  const connection = getConnection();
  const walletPubkey = new PublicKey(walletAddress);
  const mintPubkey = new PublicKey(LOBCLAW_MINT_STR);
  const burnPubkey = new PublicKey(BURN_ADDRESS);

  // Sender's associated token account
  const senderAta = await getAssociatedTokenAddress(mintPubkey, walletPubkey);

  // Incinerator's associated token account (allowOwnerOffCurve = true)
  const receiverAta = await getAssociatedTokenAddress(mintPubkey, burnPubkey, true);

  // Fetch decimals from mint account
  const mintInfo = await connection.getParsedAccountInfo(mintPubkey);
  const decimals =
    (mintInfo.value?.data as { parsed?: { info?: { decimals?: number } } })
      ?.parsed?.info?.decimals ?? 6;

  const rawAmount = BigInt(Math.floor(LOBCLAW_BURN_AMOUNT * Math.pow(10, decimals)));

  const tx = new Transaction().add(
    createTransferInstruction(
      senderAta,
      receiverAta,
      walletPubkey,
      rawAmount,
      [],
      TOKEN_PROGRAM_ID
    )
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = walletPubkey;

  // Use injected wallet provider for signing
  type SolanaProvider = {
    signAndSendTransaction: (tx: Transaction) => Promise<{ signature: string }>;
  };
  const provider = (window as Window & { solana?: SolanaProvider; phantom?: { solana?: SolanaProvider } })
    .phantom?.solana ?? (window as Window & { solana?: SolanaProvider }).solana;

  if (!provider) {
    throw new Error("No Solana wallet found. Please install Phantom or Solflare.");
  }

  const { signature } = await provider.signAndSendTransaction(tx);

  // Wait for on-chain confirmation
  await connection.confirmTransaction(
    { signature, blockhash, lastValidBlockHeight },
    "confirmed"
  );

  return signature;
}

// ─── Legacy hook (backward compat) ────────────────────────────────────────────
export type WalletStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "burning"
  | "confirming"
  | "success"
  | "error";

export interface WalletState {
  status: WalletStatus;
  publicKey: string | null;
  txSignature: string | null;
  error: string | null;
  balance: number | null;
}

export function useSolanaWallet() {
  const [state, setState] = useState<WalletState>({
    status: "disconnected",
    publicKey: null,
    txSignature: null,
    error: null,
    balance: null,
  });

  const setStatus = (status: WalletStatus, extra?: Partial<WalletState>) =>
    setState((s) => ({ ...s, status, error: null, ...extra }));

  useEffect(() => {
    const w = window as Window & { solana?: { isConnected?: boolean; publicKey?: { toString: () => string } } };
    if (w.solana?.isConnected && w.solana.publicKey) {
      setState((s) => ({
        ...s,
        status: "connected",
        publicKey: w.solana!.publicKey!.toString(),
      }));
    }
  }, []);

  const connect = useCallback(async () => {
    const w = window as Window & { solana?: { connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }> } };
    if (!w.solana) {
      window.open("https://phantom.app/", "_blank");
      return;
    }
    try {
      setStatus("connecting");
      const resp = await w.solana.connect();
      setStatus("connected", { publicKey: resp.publicKey.toString() });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to connect wallet";
      setStatus("error", { error: msg });
    }
  }, []);

  const disconnect = useCallback(async () => {
    const w = window as Window & { solana?: { disconnect: () => Promise<void> } };
    if (w.solana) await w.solana.disconnect();
    setState({ status: "disconnected", publicKey: null, txSignature: null, error: null, balance: null });
  }, []);

  const burnMeme = useCallback(async (): Promise<string | null> => {
    if (!state.publicKey) {
      setStatus("error", { error: "Wallet not connected" });
      return null;
    }
    try {
      setStatus("burning");
      const sig = await burnLobclaw(state.publicKey);
      setStatus("success", { txSignature: sig });
      return sig;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Transaction failed";
      setStatus("error", { error: msg });
      return null;
    }
  }, [state.publicKey]);

  return {
    ...state,
    connect,
    disconnect,
    burnMeme,
  };
}
