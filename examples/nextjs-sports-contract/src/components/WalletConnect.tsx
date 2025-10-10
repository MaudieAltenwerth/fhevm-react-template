'use client';

import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';

interface WalletConnectProps {
  onConnect: (provider: BrowserProvider, address: string) => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        setError('Please install MetaMask to use this app');
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      setAddress(userAddress);
      setIsConnected(true);
      setError('');
      onConnect(provider, userAddress);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress('');
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="flex flex-col gap-4">
      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-gray-100 rounded-lg">
            <span className="text-sm font-mono">{formatAddress(address)}</span>
          </div>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
