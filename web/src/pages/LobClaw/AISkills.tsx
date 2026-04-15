/**
 * AI Skills & API Page - Cyberpunk Noir Theme
 * Real wallet integration: holding detection + dual payment (USDT / $LOBCLAW)
 */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Lock,
  Unlock,
  ExternalLink,
  MessageSquare,
  ImageIcon,
  Code,
  Shield,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useTranslation } from "react-i18next";
import PaymentModal from "../../components/lobclaw/PaymentModal";
import { LOBCLAW_BSC_ADDRESS, ERC20_ABI } from "../../lib/lobclaw/web3-config";

const AI_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663283838978/4CgAMC3pPERR2az5YX7DmV/ai-skills-bg-Mz7XkU3NniK73rh8Z4mPYM.webp";

interface Skill {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  usdcMonthly: number;
  lobclawMonthly: number;
  apiCallsMonthly: number;
  models: string[];
  status: "live" | "beta" | "soon";
  stakingMin: number;
}

export default function AISkills() {
  const { t } = useTranslation();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const [lobclawBal, setLobclawBal] = useState<number>(0);
  const [paymentModal, setPaymentModal] = useState<{
    open: boolean;
    skill: Skill | null;
  }>({ open: false, skill: null });
  const [subscribedSkills, setSubscribedSkills] = useState<Set<string>>(new Set());

  // 读取 LOBCLAW 余额
  const { data: balance } = useReadContract({
    address: (LOBCLAW_BSC_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address && !!LOBCLAW_BSC_ADDRESS,
    }
  });

  useEffect(() => {
    if (balance) {
      setLobclawBal(Number(balance) / 1e18);
    }
  }, [balance]);

  const STAKING_MIN_BASIC = 1000000; // 1M
  const STAKING_MIN_PREMIUM = 5000000; // 5M

  const isStaked = lobclawBal >= STAKING_MIN_BASIC;
  const isPremium = lobclawBal >= STAKING_MIN_PREMIUM;

  const skills: Skill[] = [
    {
      id: "lobchat",
      name: "LobChat AI",
      description: t("多模型对话 AI，整合了 GPT-4, Claude, Gemini。具备 Web3 知识库的上下文感知响应。"),
      icon: <MessageSquare size={24} />,
      usdcMonthly: 9.99,
      lobclawMonthly: 1900000,
      apiCallsMonthly: 10000,
      models: ["GPT-4o", "Claude 3.5", "Gemini Pro"],
      status: "live",
      stakingMin: 1000000,
    },
    {
      id: "lobvision",
      name: "LobVision AI",
      description: t("AI 驱动的图像生成与分析。创作 NFT 艺术，分析图表，并生成营销视觉效果。"),
      icon: <ImageIcon size={24} />,
      usdcMonthly: 14.99,
      lobclawMonthly: 2800000,
      apiCallsMonthly: 5000,
      models: ["DALL-E 3", "Stable Diffusion XL", "Midjourney API"],
      status: "live",
      stakingMin: 1000000,
    },
    {
      id: "lobcode",
      name: "LobCode AI",
      description: t("智能合约审计、代码生成和 DeFi 策略构建器。由专业编码模型驱动。"),
      icon: <Code size={24} />,
      usdcMonthly: 19.99,
      lobclawMonthly: 3800000,
      apiCallsMonthly: 8000,
      models: ["DeepSeek Coder", "GPT-4o", "Claude 3.5"],
      status: "live",
      stakingMin: 1000000,
    },
  ];

  const handleSubscribe = (skill: Skill) => {
    if (!isConnected) {
      open();
      return;
    }
    setPaymentModal({ open: true, skill });
  };

  const handlePaymentSuccess = (hash: string) => {
    if (paymentModal.skill) {
      setSubscribedSkills((prev) => {
        const next = new Set(prev);
        next.add(paymentModal.skill!.id);
        return next;
      });
    }
    setPaymentModal({ open: false, skill: null });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Brain size={24} className="text-amber" />
          {t("AI 技能与 API")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("访问强大的 AI 功能。支持 USDC 或 $LOBCLAW 支付（20% 优惠）。持有代币可解锁免费额度。")}
        </p>
      </motion.div>

      {/* Wallet status banner */}
      {isConnected && address ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border flex items-center gap-4 ${
            isPremium
              ? "bg-ice/10 border-ice/30"
              : isStaked
              ? "bg-amber/10 border-amber/30"
              : "bg-muted/30 border-border/50"
          }`}
        >
          <div className={`p-2 rounded-lg ${isPremium ? "bg-ice/20" : isStaked ? "bg-amber/20" : "bg-muted/40"}`}>
            {isStaked ? <Unlock size={18} className={isPremium ? "text-ice" : "text-amber"} /> : <Lock size={18} className="text-muted-foreground" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              {isPremium ? t("高级会员 — 已解锁所有技能") : isStaked ? t("普通会员 — 已解锁基础技能") : t("未检测到持有")}
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              {t("持有：")}{(Number(lobclawBal) / 1e18).toLocaleString()} $LOBCLAW · {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </div>
          {isStaked && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-400">
              <CheckCircle2 size={14} />
              {t("免费 API 权限")}
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border border-border/50 bg-muted/20 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Wallet size={18} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{t("连接钱包以检查持有状态并获取免费额度")}</p>
          </div>
          <button
            onClick={() => open()}
            className="px-4 py-2 rounded-lg bg-amber text-black text-xs font-semibold hover:bg-amber-dim transition-colors"
          >
            {t("连接钱包")}
          </button>
        </motion.div>
      )}

      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-2xl overflow-hidden h-36"
        style={{ backgroundImage: `url(${AI_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative h-full flex items-center px-6">
          <div>
            <p className="text-xs text-amber font-bold uppercase tracking-widest mb-1">{t("多模型 AI 聚合")}</p>
            <h2 className="text-xl font-bold text-white">{t("3 个已上线的 AI 技能")}</h2>
            <p className="text-sm text-white/70 mt-1">{t("持有 100 万 $LOBCLAW 即可解锁每日免费 API 调用")}</p>
          </div>
        </div>
      </motion.div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {skills.map((skill, i) => {
          const isSubscribed = subscribedSkills.has(skill.id);
          const hasFreeAccess = isStaked;

          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card p-5 flex flex-col"
            >
              {/* Skill header */}
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${hasFreeAccess || isSubscribed ? "bg-amber/20 text-amber" : "bg-muted/40 text-muted-foreground"}`}>
                  {skill.icon}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${skill.status === "live" ? "bg-green-400/15 text-green-400" : "bg-muted/40 text-muted-foreground"}`}>
                    {skill.status.toUpperCase()}
                  </span>
                  {(hasFreeAccess || isSubscribed) && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber/15 text-amber">
                      {isSubscribed ? t("已订阅") : t("免费")}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-base font-bold text-foreground mb-1">{skill.name}</h3>
              <p className="text-xs text-muted-foreground mb-3 flex-1">{skill.description}</p>

              {/* Models */}
              <div className="flex flex-wrap gap-1 mb-3">
                {skill.models.map((m) => (
                  <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/40 border border-border/50 text-muted-foreground">
                    {m}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] text-muted-foreground">{t("USDC 价格")}</p>
                  <p className="text-sm font-bold font-mono text-green-400">${skill.usdcMonthly}/mo</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">$LOBCLAW <span className="text-amber">-20%</span></p>
                  <p className="text-xs font-bold font-mono text-amber">{(skill.lobclawMonthly / 1_000_000).toFixed(1)}M/mo</p>
                </div>
              </div>

              <div className="mb-4 p-2 rounded-lg bg-muted/20 border border-border/50 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{t("每月 API 调用")}</span>
                <span className="text-xs font-mono font-bold text-ice">{skill.apiCallsMonthly.toLocaleString()}</span>
              </div>

              {/* Staking unlock info */}
              {!hasFreeAccess && (
                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield size={12} className="text-amber shrink-0" />
                  {t("持有")} {(skill.stakingMin / 1_000_000).toFixed(0)}M $LOBCLAW {t("即可免费使用")}
                </div>
              )}

              {/* Action button */}
              {hasFreeAccess || isSubscribed ? (
                <button className="w-full py-2.5 rounded-xl bg-green-500/20 border border-green-400/30 text-green-400 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-green-500/30 transition-colors">
                  <CheckCircle2 size={14} />
                  {isSubscribed ? t("进入技能") : t("免费使用 — 立即开始")}
                </button>
              ) : (
                <button
                  onClick={() => handleSubscribe(skill)}
                  className="w-full py-2.5 rounded-xl bg-amber text-black text-sm font-semibold hover:bg-amber-dim transition-all hover:shadow-[0_0_16px_oklch(0.82_0.17_75/25%)] flex items-center justify-center gap-2"
                >
                  <Zap size={14} />
                  {isConnected ? t("立即订阅") : t("连接并订阅")}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* API access info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap size={16} className="text-amber" />
          {t("支付与访问模式")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: t("使用 USDC 支付"),
              desc: t("标准定价，即时访问。确认后 USDC 将转入国库。"),
              color: "text-green-400",
              bg: "bg-green-400/10",
              border: "border-green-400/20",
            },
            {
              title: t("使用 $LOBCLAW 支付"),
              desc: t("享受 20% 预言机折扣。系统仅自动出售 API 成本部分；利润进入国库/销毁。"),
              color: "text-amber",
              bg: "bg-amber/10",
              border: "border-amber/20",
            },
            {
              title: t("持有代币免费使用"),
              desc: t("持有 100万+ $LOBCLAW 可解锁每日 100 次免费 API 调用。500万+ 尊享每日 1,000 次调用。"),
              color: "text-ice",
              bg: "bg-ice/10",
              border: "border-ice/20",
            },
          ].map((item) => (
            <div key={item.title} className={`p-4 rounded-xl border ${item.bg} ${item.border}`}>
              <p className={`text-sm font-bold ${item.color} mb-1`}>{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Payment Modal */}
      {paymentModal.skill && (
        <PaymentModal
          open={paymentModal.open}
          onClose={() => setPaymentModal({ open: false, skill: null })}
          title={`${t("订阅")} ${paymentModal.skill.name}`}
          description={`${t("月度订阅")} — ${t("包含")} ${paymentModal.skill.apiCallsMonthly.toLocaleString()} ${t("次 API 调用")}`}
          usdcAmount={paymentModal.skill.usdcMonthly}
          lobclawAmount={paymentModal.skill.lobclawMonthly}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
