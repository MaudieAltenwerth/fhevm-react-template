'use client';

import { useState } from 'react';
import { Contract, BrowserProvider } from 'ethers';
import { useFhevmClient, useEncryptedInput } from '@fhevm-sdk/core';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';

interface RegisterAthleteProps {
  provider: BrowserProvider | null;
  userAddress: string;
}

export default function RegisterAthlete({ provider, userAddress }: RegisterAthleteProps) {
  const client = useFhevmClient();
  const { createInput } = useEncryptedInput(CONTRACT_ADDRESS, userAddress);

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [teamId, setTeamId] = useState('');
  const [athleteAddress, setAthleteAddress] = useState('');
  const [salary, setSalary] = useState('');
  const [bonus, setBonus] = useState('');
  const [duration, setDuration] = useState('');
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

      // Create encrypted inputs for salary and bonus
      const input = createInput();
      input.add32(parseInt(salary));
      input.add32(parseInt(bonus));
      const encryptedData = await input.encrypt();

      const tx = await contract.registerAthlete(
        name,
        position,
        parseInt(teamId),
        athleteAddress,
        parseInt(salary),
        parseInt(bonus),
        parseInt(duration)
      );

      await tx.wait();

      setSuccess(`Athlete "${name}" registered successfully!`);
      setName('');
      setPosition('');
      setTeamId('');
      setAthleteAddress('');
      setSalary('');
      setBonus('');
      setDuration('');
    } catch (err: any) {
      setError(err.message || 'Failed to register athlete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register Athlete</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Athlete Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter athlete name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Forward, Guard"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Team ID</label>
          <input
            type="number"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter team ID"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Athlete Address</label>
          <input
            type="text"
            value={athleteAddress}
            onChange={(e) => setAthleteAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0x..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Salary (Encrypted)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter salary amount"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bonus (Encrypted)</label>
          <input
            type="number"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter bonus amount"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Contract Duration (Months)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., 12"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register Athlete'}
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
