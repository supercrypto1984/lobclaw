import { http, createConfig } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

// 1. Get projectId at https://cloud.walletconnect.com
// 既然您说之前没问题，我们先用回这个 ID，确保初始化函数被调用
export const projectId = '88888888888888888888888888888888'; 

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
  projectId,
  metadata,
});

// 3. Create modal - 必须无条件调用，否则 useWeb3Modal() 钩子会报错崩溃
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false, 
  enableOnramp: false,
});

// 合约配置
export const LOBCLAW_BSC_ADDRESS = '0x0000000000000000000000000000000000000000'; // LobClaw Token BSC Address
export const USDC_BSC_ADDRESS = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'; // USDC BSC Address
export const TREASURY_BSC_ADDRESS = '0x0000000000000000000000000000000000000000'; // 收款钱包地址

export const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
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
