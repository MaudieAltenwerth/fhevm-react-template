'use client';

import { useState } from 'react';
import { useFhevmClient, useEncryptedInput } from '@fhevm-sdk/core';
import { Card } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface EncryptionDemoProps {
  contractAddress: string;
  userAddress: string;
}

export default function EncryptionDemo({ contractAddress, userAddress }: EncryptionDemoProps) {
  const [value, setValue] = useState('');
  const [encryptedData, setEncryptedData] = useState<string>('');
  const [isEncrypting, setIsEncrypting] = useState(false);

  const client = useFhevmClient();
  const { createInput } = useEncryptedInput(contractAddress, userAddress);

  const handleEncrypt = async () => {
    if (!value || !client.isInitialized()) return;

    setIsEncrypting(true);
    try {
      const input = createInput();
      input.add32(parseInt(value));
      const encrypted = await input.encrypt();
      setEncryptedData(JSON.stringify(encrypted, null, 2));
    } catch (error) {
      console.error('Encryption error:', error);
      alert('Encryption failed: ' + (error as Error).message);
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <Card title="Encryption Demo" subtitle="Encrypt values using FHE">
      <div className="space-y-4">
        <Input
          type="number"
          label="Value to Encrypt"
          placeholder="Enter a number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button
          onClick={handleEncrypt}
          isLoading={isEncrypting}
          disabled={!value || !client.isInitialized()}
        >
          Encrypt Value
        </Button>

        {encryptedData && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Encrypted Data:
            </label>
            <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto max-h-60">
              {encryptedData}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
}
