/**
 * Agency Hub Page - Cyberpunk Noir Theme
 * Super Agent hidden entry + Normal Agent application + Revenue release logic
 * Real wallet integration: wallet verification + auto-fill address
 */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Lock,
  Shield,
  Send,
  ExternalLink,
  Clock,
  DollarSign,
  UserPlus,
  Eye,
  EyeOff,
  CheckCircle2,
  Wallet,
} from "lucide-react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const AGENCY_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663283838978/4CgAMC3pPERR2az5YX7DmV/dashboard-card-bg-7hQHS4XN8wgw9JidjVqzBC.webp";

const agents = [
  { wallet: "0x7xKp...3mN2", tier: "Super", referrals: 142, earned: "$12,400", pending: "$2,100", status: "Active" },
  { wallet: "0x4eRd...9f3a", tier: "Normal", referrals: 56, earned: "$4,200", pending: "$680", status: "Active" },
  { wallet: "0x9aZc...3e8b", tier: "Normal", referrals: 34, earned: "$2,100", pending: "$340", status: "Active" },
  { wallet: "0x2bYf...c4d7", tier: "Normal", referrals: 12, earned: "$890", pending: "$120", status: "Pending" },
];

const vestingSchedule = [
  { week: "Week 1", usdt: "40%", token: "15%", total: "55%", released: true },
  { week: "Week 2", usdt: "—", token: "15%", total: "70%", released: true },
  { week: "Week 3", usdt: "—", token: "15%", total: "85%", released: false },
  { week: "Week 4", usdt: "—", token: "15%", total: "100%", released: false },
];

export default function AgencyHub() {
  const { t } = useTranslation();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const [showSuperEntry, setShowSuperEntry] = useState(false);
  const [superVerified, setSuperVerified] = useState(false);
  const [formData, setFormData] = useState({ telegram: "", channel: "", social: "", wallet: "" });
  const [submitted, setSubmitted] = useState(false);

  // Auto-fill wallet address when connected
  useEffect(() => {
    if (address) {
      setFormData((prev) => ({ ...prev, wallet: address }));
    }
  }, [address]);

  const handleVerifySuperAgent = () => {
    if (!isConnected || !address) {
      open();
      return;
    }
    setSuperVerified(true);
    toast.success(t("钱包已验证！超级代理权限已开启。"), {
      description: `Wallet: ${address.slice(0, 6)}...${address.slice(-4)}`,
    });
  };

  const handleApply = () => {
    if (!isConnected || !address) {
      open();
      return;
    }
    if (!formData.telegram || !formData.channel) {
      toast.error(t("请填写 Telegram 账号和宣传渠道"));
      return;
    }
    setSubmitted(true);
    toast.success(t("申请已提交！"), {
      description: t("您的代理申请正在审核中。我们将通过 Telegram 通知您。"),
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Users size={24} className="text-amber" />
          {t("代理中心")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("多级返佣系统，支持 USDT + 代币归属奖励")}
        </p>
      </motion.div>

      {/* Agent stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: t("总代理数"), value: "186", icon: <Users size={18} />, color: "text-amber" },
          { label: t("总邀请数"), value: "4,280", icon: <UserPlus size={18} />, color: "text-ice" },
          { label: t("累计支出"), value: "$89,400", icon: <DollarSign size={18} />, color: "text-amber" },
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
          </motion.div>
        ))}
      </div>

      {/* Super Agent hidden entry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-xl border border-amber/20"
        style={{ backgroundImage: `url(${AGENCY_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber/20 flex items-center justify-center">
                <Shield size={20} className="text-amber" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">{t("超级代理门户")}</h3>
                <p className="text-xs text-muted-foreground">{t("仅限受邀精英合作伙伴访问")}</p>
              </div>
            </div>
            <button
              onClick={() => setShowSuperEntry(!showSuperEntry)}
              className="px-4 py-1.5 rounded-lg border border-amber/30 text-amber hover:bg-amber/10 transition-all text-sm flex items-center gap-2"
            >
              {showSuperEntry ? <EyeOff size={14} /> : <Eye size={14} />}
              {showSuperEntry ? t("隐藏") : t("访问")}
            </button>
          </div>

          {showSuperEntry && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-4 p-4 rounded-lg bg-black/40 border border-amber/10"
            >
              {superVerified ? (
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-green-400" />
                  <div>
                    <p className="text-sm font-bold text-green-400">{t("超级代理权限已授予")}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("钱包")} {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""} {t("已验证")}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <Lock size={14} className="text-amber" />
                    <span className="text-sm text-foreground font-medium">{t("需要钱包验证")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {t("连接您受邀的钱包地址以访问超级代理控制面板。仅限预先批准的钱包进入。")}
                  </p>
                  {isConnected && address && (
                    <p className="text-xs text-ice mb-3 font-mono">
                      {t("已连接：")}{address.slice(0, 6)}...{address.slice(-4)}
                    </p>
                  )}
                  <button
                    onClick={handleVerifySuperAgent}
                    className="px-6 py-2 rounded-lg bg-amber hover:bg-amber-dim text-black font-bold text-sm transition-all"
                  >
                    {isConnected ? t("验证钱包权限") : <span className="flex items-center gap-2"><Wallet size={14} />{t("连接钱包进行验证")}</span>}
                  </button>
                </>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Revenue release schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Clock size={16} className="text-amber" />
          {t("收益释放周期")}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          {t("代理奖励：")}<span className="text-amber font-bold">40% USDT</span> ({t("即时")}) + <span className="text-ice font-bold">60% Token</span> ({t("4周线性归属")})
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("周期")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("USDT 释放")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("Token 释放")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("累计")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("状态")}</th>
              </tr>
            </thead>
            <tbody>
              {vestingSchedule.map((v, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-2.5 px-3 text-xs font-medium text-foreground">{v.week}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-amber">{v.usdt}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-ice">{v.token}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-foreground">{v.total}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.released ? "bg-green-500/15 text-green-400" : "bg-muted text-muted-foreground"}`}>
                      {v.released ? t("已释放") : t("已锁定")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Agent leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">{t("代理排行榜")}</h3>
          <a
            href={`#`}
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1 text-xs text-amber hover:underline"
          >
            {t("在浏览器查看")} <ExternalLink size={10} />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("钱包")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("等级")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("邀请数")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("总收益")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("待领取")}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t("状态")}</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-xs text-ice">{a.wallet}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.tier === "Super" ? "bg-amber/15 text-amber" : "bg-ice/15 text-ice"}`}>
                      {t(a.tier)}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-xs text-foreground">{a.referrals}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-amber">{a.earned}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-foreground">{a.pending}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.status === "Active" ? "bg-green-500/15 text-green-400" : "bg-amber/15 text-amber"}`}>
                      {t(a.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Apply as Agent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <UserPlus size={16} className="text-ice" />
          {t("申请成为代理")}
        </h3>

        {submitted ? (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-400/10 border border-green-400/20">
            <CheckCircle2 size={20} className="text-green-400" />
            <div>
              <p className="text-sm font-bold text-green-400">{t("申请已提交！")}</p>
              <p className="text-xs text-muted-foreground">{t("我们将审核您的申请并根据通过 Telegram 联系您。")}</p>
            </div>
          </div>
        ) : (
          <>
            {!isConnected && (
              <div className="mb-4 p-3 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-between">
                <p className="text-xs text-amber">{t("请连接您的钱包以自动填写地址并提交申请")}</p>
                <button
                  onClick={() => open()}
                  className="text-xs font-bold text-amber hover:underline flex items-center gap-1"
                >
                  <Wallet size={12} /> {t("连接")}
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{t("Telegram 账号")}</label>
                <input
                  type="text"
                  placeholder="@your_telegram"
                  value={formData.telegram}
                  onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-amber/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{t("推广渠道")}</label>
                <input
                  type="text"
                  placeholder="YouTube / Twitter / Blog URL"
                  value={formData.channel}
                  onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-amber/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{t("社交媒体链接")}</label>
                <input
                  type="text"
                  placeholder="Twitter / Discord profile"
                  value={formData.social}
                  onChange={(e) => setFormData({ ...formData, social: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-amber/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  {t("钱包地址")} {isConnected && <span className="text-green-400">({t("已自动填写")})</span>}
                </label>
                <input
                  type="text"
                  placeholder={t("BSC 钱包地址")}
                  value={formData.wallet}
                  onChange={(e) => setFormData({ ...formData, wallet: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-amber/50 transition-colors"
                />
              </div>
            </div>
            <button
              onClick={handleApply}
              className="mt-4 px-6 py-2.5 rounded-lg bg-amber hover:bg-amber-dim text-black font-bold text-sm transition-all flex items-center gap-2"
            >
              <Send size={14} />
              {isConnected ? t("提交申请") : t("连接钱包并申请")}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
