/**
 * Burn Tracker Page - Cyberpunk Noir Theme
 * Real-time burn dashboard + tax system + extreme market defense
 */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  ExternalLink,
  TrendingDown,
  Shield,
  AlertTriangle,
  Clock,
  Zap,
  BarChart3,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

const burnHistory = [
  { date: "Jan", burned: 1200000, cumulative: 1200000 },
  { date: "Feb", burned: 1800000, cumulative: 3000000 },
  { date: "Mar", burned: 2400000, cumulative: 5400000 },
  { date: "Apr", burned: 3100000, cumulative: 8500000 },
  { date: "May", burned: 2800000, cumulative: 11300000 },
  { date: "Jun", burned: 3500000, cumulative: 14800000 },
  { date: "Jul", burned: 4200000, cumulative: 19000000 },
  { date: "Aug", burned: 5800000, cumulative: 24800000 },
];

const recentBurns = [
  { hash: "0x4e1d...9f3a", amount: "500,000", value: "$210", time: "15 min ago", source: "Auto-Burn" },
  { hash: "0x8f3a...b2c1", amount: "320,000", value: "$134", time: "1 hr ago", source: "Tax Burn" },
  { hash: "0xa7c2...3e8b", amount: "1,200,000", value: "$504", time: "3 hr ago", source: "Auto-Burn" },
  { hash: "0x2b9f...c4d7", amount: "180,000", value: "$76", time: "6 hr ago", source: "Tax Burn" },
  { hash: "0x6d4e...a1f2", amount: "2,500,000", value: "$1,050", time: "12 hr ago", source: "Manual Burn" },
];

function LiveCounter({ base }: { base: number }) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 500 + 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return <span>{count.toLocaleString()}</span>;
}

export default function BurnTracker() {
  const { t } = useTranslation();

  const taxRules = [
    { period: t("买入税"), rate: "3%", description: t("适用于所有购买行为") },
    { period: t("卖出 (0-7 天)"), rate: "15%", description: t("早期退出惩罚") },
    { period: t("卖出 (7-14 天)"), rate: "8%", description: t("中期退出") },
    { period: t("卖出 (14-30 天)"), rate: "3%", description: t("标准退出") },
    { period: t("卖出 (30+ 天)"), rate: "1%", description: t("长期持有者费率") },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Flame size={24} className="text-burn" />
          {t("销毁追踪")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("实时自动化通缩看板，支持链上验证")}
        </p>
      </motion.div>

      {/* Burn stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t("累计销毁"), value: "24.8M", sub: "2.1% of supply", icon: <Flame size={18} />, color: "text-burn" },
          { label: t("销毁速率"), value: "~180K/day", sub: "Auto + Tax", icon: <Zap size={18} />, color: "text-amber" },
          { label: t("下次自动销毁"), value: "12:34", sub: "Minutes", icon: <Clock size={18} />, color: "text-ice" },
          { label: t("销毁价值"), value: "$10.4K", sub: "At current price", icon: <TrendingDown size={18} />, color: "text-burn" },
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
            <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Live burn counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-5 text-center border border-burn/20"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Activity size={16} className="text-burn animate-pulse" />
          <span className="text-xs text-burn font-medium uppercase tracking-wider">{t("实时销毁计数器")}</span>
        </div>
        <p className="text-3xl lg:text-4xl font-bold font-mono text-foreground">
          <LiveCounter base={24800000} />
        </p>
        <p className="text-xs text-muted-foreground mt-1">{t("$LOBCLAW 代币已永久销毁")}</p>
        <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1 text-xs text-amber hover:underline mt-2">
          {t("在浏览器查看销毁地址")} <ExternalLink size={10} />
        </a>
      </motion.div>

      {/* Burn chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t("累计销毁历史")}</h3>
            <p className="text-xs text-muted-foreground">{t("月度销毁进度")}</p>
          </div>
          <BarChart3 size={18} className="text-muted-foreground" />
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={burnHistory}>
            <defs>
              <linearGradient id="burnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
            <Tooltip
              contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
              formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M tokens`, ""]}
            />
            <Area type="monotone" dataKey="cumulative" stroke="#dc2626" strokeWidth={2} fill="url(#burnGrad)" name={t("累计销毁")} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tax system */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield size={16} className="text-amber" />
            {t("税务与销毁系统")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t("持有周期")}</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t("费率")}</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{t("描述")}</th>
                </tr>
              </thead>
              <tbody>
                {taxRules.map((rule, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 px-3 text-xs font-medium text-foreground">{rule.period}</td>
                    <td className="py-2 px-3 font-mono text-xs font-bold text-burn">{rule.rate}</td>
                    <td className="py-2 px-3 text-xs text-muted-foreground">{rule.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Extreme market defense */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-burn" />
            {t("极端市场防御机制")}
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-burn/10 border border-burn/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown size={14} className="text-burn" />
                <span className="text-xs font-bold text-burn">{t("价格下跌 > 50%")}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("系统停止自动抛售。API 成本由金库 USDT 储备支付。在极端波动期间保护代币价格。")}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">
                  {t("状态：正常")}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-amber/10 border border-amber/20">
              <div className="flex items-center gap-2 mb-1">
                <Activity size={14} className="text-amber" />
                <span className="text-xs font-bold text-amber">{t("低流动性警报")}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("当流动性池低于阈值时，50% 的利润自动注入 LP。确保交易环境健康。")}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">
                  {t("LP 健康：良好")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent burns table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">{t("最近销毁")}</h3>
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1 text-xs text-amber hover:underline">
            {t("查看全部")} <ExternalLink size={10} />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("交易哈希")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("数量")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("价值")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("来源")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("时间")}</th>
                <th className="text-right py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("浏览器")}</th>
              </tr>
            </thead>
            <tbody>
              {recentBurns.map((b, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-xs text-ice">{b.hash}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-foreground">{b.amount}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-amber">{b.value}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      b.source === "Auto-Burn" ? "bg-burn/15 text-burn" :
                      b.source === "Tax Burn" ? "bg-amber/15 text-amber" :
                      "bg-ice/15 text-ice"
                    }`}>
                      {t(b.source)}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-xs text-muted-foreground">{b.time}</td>
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
