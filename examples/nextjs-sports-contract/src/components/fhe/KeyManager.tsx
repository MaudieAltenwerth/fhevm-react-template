'use client';

import { useFhevmClient } from '@fhevm-sdk/core';
import { Card } from '../ui/Card';
import Button from '../ui/Button';

export default function KeyManager() {
  const client = useFhevmClient();

  return (
    <Card title="Key Manager" subtitle="FHEVM encryption keys status">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">FHEVM Status</p>
            <p className="text-sm text-gray-600">
              {client.isInitialized() ? 'Initialized' : 'Not Initialized'}
            </p>
          </div>
          <div>
            {client.isInitialized() ? (
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
            ) : (
              <span className="inline-block w-3 h-3 bg-gray-300 rounded-full"></span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900">Public Key</p>
            <p className="text-xs text-blue-700 mt-1">
              Automatically fetched from FHEVM network during initialization
            </p>
          </div>

          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm font-medium text-purple-900">Private Key</p>
            <p className="text-xs text-purple-700 mt-1">
              Managed securely by your wallet for EIP-712 signatures
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            Keys are managed automatically by the FHEVM SDK. No manual intervention required.
          </p>
        </div>
      </div>
    </Card>
  );
}
