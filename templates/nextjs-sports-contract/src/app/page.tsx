'use client';

import { useState } from 'react';
import { BrowserProvider } from 'ethers';
import { FhevmProvider, useFhevmInit } from '@fhevm-sdk/core';
import WalletConnect from '@/components/WalletConnect';
import RegisterTeam from '@/components/RegisterTeam';
import RegisterAthlete from '@/components/RegisterAthlete';

function AppContent() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [userAddress, setUserAddress] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'team' | 'athlete'>('team');

  const { isInitialized, isLoading, error } = useFhevmInit(provider);

  const handleConnect = (newProvider: BrowserProvider, address: string) => {
    setProvider(newProvider);
    setUserAddress(address);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Confidential Sports Contract
          </h1>
          <p className="text-gray-600 mb-6">
            Manage athlete salaries and team payrolls with Fully Homomorphic Encryption (FHE)
          </p>
          <WalletConnect onConnect={handleConnect} />
        </header>

        {/* FHEVM Status */}
        {provider && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            {isLoading && (
              <p className="text-blue-600">Initializing FHEVM...</p>
            )}
            {isInitialized && (
              <p className="text-green-600">✓ FHEVM initialized successfully</p>
            )}
            {error && (
              <p className="text-red-600">Error: {error.message}</p>
            )}
          </div>
        )}

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">🔐 Private Salaries</h3>
            <p className="text-gray-600">
              Athlete salaries are encrypted using FHE, ensuring complete privacy
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">📊 Encrypted Analytics</h3>
            <p className="text-gray-600">
              Perform calculations on encrypted data without exposing values
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">⚖️ Salary Cap Compliance</h3>
            <p className="text-gray-600">
              Check compliance without revealing individual salaries
            </p>
          </div>
        </div>

        {/* Main Content */}
        {isInitialized && (
          <>
            {/* Tabs */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab('team')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'team'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Register Team
              </button>
              <button
                onClick={() => setActiveTab('athlete')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'athlete'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Register Athlete
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'team' && (
              <RegisterTeam provider={provider} userAddress={userAddress} />
            )}
            {activeTab === 'athlete' && (
              <RegisterAthlete provider={provider} userAddress={userAddress} />
            )}
          </>
        )}

        {/* Instructions */}
        {!provider && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Getting Started</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Connect your MetaMask wallet to Sepolia testnet</li>
              <li>Wait for FHEVM to initialize</li>
              <li>Register teams and athletes with encrypted salaries</li>
              <li>Explore encrypted operations like salary cap checks</li>
            </ol>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p>Built with FHEVM SDK - Powered by Zama</p>
        </footer>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <FhevmProvider
      config={{
        network: {
          chainId: 11155111, // Sepolia
        },
      }}
    >
      <AppContent />
    </FhevmProvider>
  );
}
