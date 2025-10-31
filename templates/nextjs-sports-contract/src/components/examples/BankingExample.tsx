'use client';

import { useState } from 'react';
import { useFhevmClient, useEncryptedInput } from '@fhevm-sdk/core';
import { Card } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface BankingExampleProps {
  contractAddress: string;
  userAddress: string;
}

export default function BankingExample({ contractAddress, userAddress }: BankingExampleProps) {
  const [balance, setBalance] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const client = useFhevmClient();
  const { createInput } = useEncryptedInput(contractAddress, userAddress);

  const handleEncryptBalance = async () => {
    if (!balance || !client.isInitialized()) return;

    setIsProcessing(true);
    try {
      const input = createInput();
      input.add64(parseInt(balance));
      const encrypted = await input.encrypt();
      alert('Balance encrypted successfully! In a real app, this would be sent to the smart contract.');
      console.log('Encrypted balance:', encrypted);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to encrypt balance');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEncryptTransfer = async () => {
    if (!transferAmount || !recipient || !client.isInitialized()) return;

    setIsProcessing(true);
    try {
      const input = createInput();
      input.add64(parseInt(transferAmount));
      const encrypted = await input.encrypt();
      alert(`Transfer of encrypted amount to ${recipient} prepared! In a real app, this would be sent to the smart contract.`);
      console.log('Encrypted transfer:', encrypted);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to encrypt transfer');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card
      title="Banking Example"
      subtitle="Confidential balance and transfer operations"
    >
      <div className="space-y-6">
        {/* Balance Section */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-3">Set Encrypted Balance</h4>
          <div className="space-y-3">
            <Input
              type="number"
              label="Account Balance"
              placeholder="Enter balance amount"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              helperText="Balance will be encrypted using FHE"
            />
            <Button
              onClick={handleEncryptBalance}
              isLoading={isProcessing}
              disabled={!balance || !client.isInitialized()}
            >
              Encrypt & Set Balance
            </Button>
          </div>
        </div>

        {/* Transfer Section */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-3">Confidential Transfer</h4>
          <div className="space-y-3">
            <Input
              type="text"
              label="Recipient Address"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <Input
              type="number"
              label="Transfer Amount"
              placeholder="Enter amount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              helperText="Amount will be encrypted before transfer"
            />
            <Button
              onClick={handleEncryptTransfer}
              isLoading={isProcessing}
              disabled={!transferAmount || !recipient || !client.isInitialized()}
            >
              Prepare Encrypted Transfer
            </Button>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">How it works</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Balances are encrypted using FHE before storage</li>
            <li>• Transfer amounts are encrypted end-to-end</li>
            <li>• Smart contracts can compute on encrypted values</li>
            <li>• Privacy is maintained throughout the transaction</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
