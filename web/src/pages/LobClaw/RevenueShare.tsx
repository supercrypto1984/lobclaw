/**
 * Revenue Share Page - Cyberpunk Noir Theme
 * Holder list + weighted scores + loyalty multiplier + distribution preview
 */
import React from "react";
import { motion } from "framer-motion";
import {
  Coins,
  ExternalLink,
  TrendingUp,
  Shield,
  Clock,
  AlertTriangle,
  Award,
  ChevronDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Progress } from "../../components/lobclaw/ui/progress";

const holders = [
  { wallet: "0x8f3a...b2c1", balance: "12,500,000", days: 142, score: 9850, loyalty: "Diamond", usdc: "$412.50", token: "125,000", penalized: false },
  { wallet: "0x4e1d...9f3a", balance: "8,200,000", days: 98, score: 7200, loyalty: "Gold", usdc: "$280.00", token: "82,000", penalized: false },
  { wallet: "0xa7c2...3e8b", balance: "5,100,000", days: 67, score: 4100, loyalty: "Silver", usdc: "$165.00", token: "51,000", penalized: false },
  { wallet: "0x2b9f...c4d7", balance: "3,800,000", days: 45, score: 2800, loyalty: "Bronze", usdc: "$98.00", token: "38,000", penalized: false },
  { wallet: "0x6d4e...a1f2", balance: "2,200,000", days: 12, score: 440, loyalty: "Penalized", usdc: "$18.50", token: "8,800", penalized: true },
  { wallet: "0x1c8b...d5e9", balance: "1,500,000", days: 30, score: 1200, loyalty: "Bronze", usdc: "$52.00", token: "15,000", penalized: false },
  { wallet: "0x9a2f...7b4c", balance: "950,000", days: 88, score: 800, loyalty: "Silver", usdc: "$32.00", token: "9,500", penalized: false },
];

const loyaltyColors: Record<string, string> = {
  Diamond: "text-ice bg-ice/15",
  Gold: "text-amber bg-amber/15",
  Silver: "text-gray-300 bg-gray-300/15",
  Bronze: "text-orange-400 bg-orange-400/15",
  Penalized: "text-burn bg-burn/15",
};

export default function RevenueShare() {
  const { t } = useTranslation();

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Coins size={24} className="text-amber" />
          {t("收入分红")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("基于加权持有评分的实时持有者奖励分配")}
        </p>
      </motion.div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t("总分配池"), value: "$12,450", sub: t("本周"), icon: <Coins size={18} />, color: "text-amber" },
          { label: t("合规持有者"), value: "2,412", sub: t("活跃钱包"), icon: <Shield size={18} />, color: "text-ice" },
          { label: t("平均忠诚度评分"), value: "6,240", sub: t("加权平均"), icon: <Award size={18} />, color: "text-amber" },
          { label: t("下次分配"), value: "4d 12h", sub: t("倒计时"), icon: <Clock size={18} />, color: "text-ice" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="glass-card p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
              <span className={stat.color}>{stat.icon}</span>
            </div>
            <p className="text-xl font-bold font-mono text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Scoring formula explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-amber" />
          {t("加权评分公式")}
        </h3>
        <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm">
          <p className="text-amber mb-2">P = Balance × Time_Weight × Loyalty_Multiplier</p>
          <div className="text-xs text-muted-foreground space-y-1 mt-3">
            <p><span className="text-ice">Time_Weight</span> = log2(holding_days + 1)</p>
            <p><span className="text-ice">Loyalty_Multiplier</span> = 1.0 ({t("30天内无卖出")}) | 0.5 ({t("30天内有卖出")}) | <span className="text-burn">0.2 ({t("7天内有卖出")})</span></p>
          </div>
        </div>
        <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-burn/10 border border-burn/20">
          <AlertTriangle size={14} className="text-burn mt-0.5 shrink-0" />
          <p className="text-xs text-burn/80">
            {t("在 7 天内检测到卖出行为的钱包，其忠诚度乘数将降至 20%。持有 30 天后该惩罚将重置。")}
          </p>
        </div>
      </motion.div>

      {/* Holders table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">{t("持有者分配列表")}</h3>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            {t("按评分排序")} <ChevronDown size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("钱包")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("余额")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("持有天数")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("评分 (P)")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("忠诚度")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("USDC 奖励")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("Token 奖励")}</th>
                <th className="text-right py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("浏览器")}</th>
              </tr>
            </thead>
            <tbody>
              {holders.map((h, i) => (
                <tr
                  key={i}
                  className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${h.penalized ? "opacity-70" : ""}`}
                >
                  <td className="py-2.5 px-3 font-mono text-xs text-ice">{h.wallet}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-foreground">{h.balance}</td>
                  <td className="py-2.5 px-3 text-xs text-muted-foreground">{h.days}d</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-foreground">{h.score.toLocaleString()}</span>
                      <Progress value={(h.score / 10000) * 100} className="w-16 h-1.5" />
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${loyaltyColors[h.loyalty]}`}>
                      {t(h.loyalty)}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-xs text-amber">{h.usdc}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-foreground">{h.token}</td>
                  <td className="py-2.5 px-3 text-right">
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-amber hover:text-amber-dim">
                      <ExternalLink size={13} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
