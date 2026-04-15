/*
 * telegram.ts — LobClaw Telegram Bot Push Notifications
 * Sends notifications to a Telegram chat via Bot API.
 *
 * Environment variables required (set in Management UI → Settings → Secrets):
 *   VITE_TG_BOT_TOKEN  — Telegram Bot Token from @BotFather
 *   VITE_TG_CHAT_ID    — Target chat/channel ID (e.g. -1001234567890)
 *
 * Note: This is a frontend-only push. For production, move to a backend
 * API route to keep the bot token server-side.
 */

const BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN as string | undefined;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID as string | undefined;

// Escape special MarkdownV2 characters
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}

async function sendTelegramMessage(text: string): Promise<boolean> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("[LobClaw] Telegram not configured. Set VITE_TG_BOT_TOKEN and VITE_TG_CHAT_ID.");
    return false;
  }
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "MarkdownV2",
          disable_web_page_preview: true,
        }),
      }
    );
    const data = await res.json();
    if (!data.ok) {
      console.error("[LobClaw] Telegram API error:", data.description);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[LobClaw] Failed to send Telegram message:", err);
    return false;
  }
}

// ─── Legacy export (backward compat) ─────────────────────────────────────────
export interface EarlyAccessPayload {
  email: string;
  timestamp?: string;
  source?: string;
}

export async function sendEarlyAccessNotification(
  payload: EarlyAccessPayload
): Promise<void> {
  await notifyEarlyAccess(payload.email);
}

// ─── New exports ──────────────────────────────────────────────────────────────

/**
 * Notify admin when a user joins the early access waitlist.
 */
export async function notifyEarlyAccess(email: string): Promise<boolean> {
  const now = new Date().toISOString();
  const text = [
    `🚀 *LobClaw Early Access*`,
    ``,
    `📧 Email: \`${escapeMarkdown(email)}\``,
    `🕐 Time: \`${escapeMarkdown(now)}\``,
    ``,
    `_New waitlist signup — LobClaw_`,
  ].join("\n");

  return sendTelegramMessage(text);
}

/**
 * Notify admin when a user successfully burns $LOBCLAW for Pro access.
 */
export async function notifyBurnSuccess(params: {
  walletAddress: string;
  txSignature: string;
  amount: number;
}): Promise<boolean> {
  const now = new Date().toISOString();
  const solscanUrl = `https://solscan.io/tx/${params.txSignature}`;
  const text = [
    `🔥 *\\$LOBCLAW Burn Confirmed*`,
    ``,
    `👛 Wallet: \`${escapeMarkdown(params.walletAddress)}\``,
    `💎 Amount: \`${escapeMarkdown(params.amount.toLocaleString())} \\$LOBCLAW\``,
    `🔗 Tx: [View on Solscan](${escapeMarkdown(solscanUrl)})`,
    `🕐 Time: \`${escapeMarkdown(now)}\``,
    ``,
    `_Pro access unlocked — LobClaw_`,
  ].join("\n");

  return sendTelegramMessage(text);
}

/**
 * Notify admin when a user's burn transaction fails.
 */
export async function notifyBurnFailed(params: {
  walletAddress: string;
  error: string;
}): Promise<boolean> {
  const now = new Date().toISOString();
  const text = [
    `⚠️ *Burn Transaction Failed*`,
    ``,
    `👛 Wallet: \`${escapeMarkdown(params.walletAddress)}\``,
    `❌ Error: \`${escapeMarkdown(params.error.slice(0, 200))}\``,
    `🕐 Time: \`${escapeMarkdown(now)}\``,
    ``,
    `_LobClaw monitoring_`,
  ].join("\n");

  return sendTelegramMessage(text);
}
