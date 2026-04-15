import { http, createConfig } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

// 1. Get projectId at https://cloud.walletconnect.com
export const projectId = '88888888888888888888888888888888'; 

// 检查是否为有效的 Project ID 以及运行环境
const isProduction = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
const isInvalidId = !projectId || projectId.includes('8888888');

// 2. Create wagmiConfig
const metadata = {
  name: 'LobClaw',
  description: 'The First MEME Coin for AI Power',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [bsc, bscTestnet] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId: isInvalidId ? '3fbb6bba663103ca781f1ad93322123c' : projectId, 
  metadata,
});

// 3. Create modal - 仅在非生产环境或 ID 有效时启用真实初始化
// 在 GitHub Pages 且 ID 无效时，跳过初始化以避免 CSP 403 报错
if (typeof window !== 'undefined') {
  if (!isProduction || !isInvalidId) {
    try {
      createWeb3Modal({
        wagmiConfig: config,
        projectId: isInvalidId ? '3fbb6bba663103ca781f1ad93322123c' : projectId,
        enableAnalytics: false,
        enableOnramp: false,
      });
    } catch (e) {
      console.warn('Web3Modal init skipped:', e);
    }
  }
}

export const LOBCLAW_BSC_ADDRESS = '0x0000000000000000000000000000000000000000';
export const USDC_BSC_ADDRESS = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
export const TREASURY_BSC_ADDRESS = '0x0000000000000000000000000000000000000000';

export const ERC20_ABI = [
  {
    constant: false,
    inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
] as const;
