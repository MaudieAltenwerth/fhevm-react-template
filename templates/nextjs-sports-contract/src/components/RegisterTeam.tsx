'use client';

import { useState } from 'react';
import { Contract, BrowserProvider } from 'ethers';
import { useFhevmClient } from '@fhevm-sdk/core';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

interface RegisterTeamProps {
  provider: BrowserProvider | null;
  userAddress: string;
}

export default function RegisterTeam({ provider, userAddress }: RegisterTeamProps) {
  const client = useFhevmClient();
  const [teamName, setTeamName] = useState('');
  const [league, setLeague] = useState('');
  const [managerAddress, setManagerAddress] = useState('');
  const [salaryCap, setSalaryCap] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!provider || !client.isInitialized()) {
      setError('Please connect wallet and initialize FHEVM');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.registerTeam(
        teamName,
        league,
        managerAddress,
        parseInt(salaryCap)
      );

      await tx.wait();

      setSuccess(`Team "${teamName}" registered successfully!`);
      setTeamName('');
      setLeague('');
      setManagerAddress('');
      setSalaryCap('');
    } catch (err: any) {
      setError(err.message || 'Failed to register team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register Team</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter team name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">League</label>
          <input
            type="text"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter league name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Manager Address</label>
          <input
            type="text"
            value={managerAddress}
            onChange={(e) => setManagerAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0x..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Salary Cap (Encrypted)</label>
          <input
            type="number"
            value={salaryCap}
            onChange={(e) => setSalaryCap(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter salary cap"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register Team'}
        </button>
      </form>

      {success && (
        <div className="mt-4 p-4 bg-green-50 text-green-600 rounded-lg">
          {success}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
