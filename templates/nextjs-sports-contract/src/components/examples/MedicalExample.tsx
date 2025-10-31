'use client';

import { useState } from 'react';
import { useFhevmClient, useEncryptedInput } from '@fhevm-sdk/core';
import { Card } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface MedicalExampleProps {
  contractAddress: string;
  userAddress: string;
}

export default function MedicalExample({ contractAddress, userAddress }: MedicalExampleProps) {
  const [patientId, setPatientId] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const client = useFhevmClient();
  const { createInput } = useEncryptedInput(contractAddress, userAddress);

  const handleEncryptVitals = async () => {
    if (!bloodPressure || !heartRate || !bloodSugar || !client.isInitialized()) return;

    setIsProcessing(true);
    try {
      const input = createInput();
      input.add16(parseInt(bloodPressure));
      input.add16(parseInt(heartRate));
      input.add16(parseInt(bloodSugar));
      const encrypted = await input.encrypt();

      alert(`Medical vitals encrypted successfully for patient ${patientId || 'Anonymous'}!`);
      console.log('Encrypted vitals:', encrypted);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to encrypt medical data');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card
      title="Medical Records Example"
      subtitle="Confidential health data management"
    >
      <div className="space-y-6">
        {/* Patient Info */}
        <div className="p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-3">Patient Information</h4>
          <Input
            type="text"
            label="Patient ID"
            placeholder="Enter patient identifier"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            helperText="Optional - for demo purposes only"
          />
        </div>

        {/* Vitals Section */}
        <div className="p-4 bg-pink-50 rounded-lg">
          <h4 className="font-semibold text-pink-900 mb-3">Encrypted Vital Signs</h4>
          <div className="space-y-3">
            <Input
              type="number"
              label="Blood Pressure (Systolic)"
              placeholder="e.g., 120"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              helperText="mmHg"
            />
            <Input
              type="number"
              label="Heart Rate"
              placeholder="e.g., 75"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              helperText="beats per minute"
            />
            <Input
              type="number"
              label="Blood Sugar"
              placeholder="e.g., 95"
              value={bloodSugar}
              onChange={(e) => setBloodSugar(e.target.value)}
              helperText="mg/dL"
            />
            <Button
              onClick={handleEncryptVitals}
              isLoading={isProcessing}
              disabled={!bloodPressure || !heartRate || !bloodSugar || !client.isInitialized()}
            >
              Encrypt & Store Vitals
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Privacy Benefits</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Patient data remains encrypted on-chain</li>
            <li>• Doctors can compute statistics without seeing individual records</li>
            <li>• Researchers can analyze trends while preserving privacy</li>
            <li>• Compliance with HIPAA and GDPR regulations</li>
            <li>• Smart contracts can trigger alerts on encrypted thresholds</li>
          </ul>
        </div>

        {/* Use Cases */}
        <div className="p-4 bg-indigo-50 rounded-lg">
          <h4 className="font-semibold text-indigo-900 mb-2">Medical Use Cases</h4>
          <ul className="text-sm text-indigo-700 space-y-1">
            <li>• Confidential health records</li>
            <li>• Privacy-preserving clinical trials</li>
            <li>• Encrypted prescription management</li>
            <li>• Secure medical insurance claims</li>
            <li>• Anonymous epidemic tracking</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
