'use client';

import { useState } from 'react';
import { Card } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function ComputationDemo() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<string>('');

  const handleCompute = async () => {
    // Note: Actual homomorphic computations happen on-chain
    setResult('Homomorphic computations are performed on-chain in smart contracts using FHE.add(), FHE.mul(), etc.');
  };

  return (
    <Card title="Computation Demo" subtitle="Homomorphic operations on encrypted data">
      <div className="space-y-4">
        <Input
          type="number"
          label="First Value"
          placeholder="Enter first number"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />

        <Input
          type="number"
          label="Second Value"
          placeholder="Enter second number"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="add">Add</option>
            <option value="sub">Subtract</option>
            <option value="mul">Multiply</option>
            <option value="lt">Less Than</option>
            <option value="gt">Greater Than</option>
            <option value="eq">Equal</option>
          </select>
        </div>

        <Button
          onClick={handleCompute}
          disabled={!value1 || !value2}
        >
          Compute (On-Chain)
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">{result}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
