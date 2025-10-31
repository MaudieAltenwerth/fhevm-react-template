import { useState, useCallback } from 'react';
import { useFhevmClient, useEncryptedInput } from '@fhevm-sdk/core';

interface UseEncryptionOptions {
  contractAddress: string;
  userAddress: string;
}

export function useEncryption({ contractAddress, userAddress }: UseEncryptionOptions) {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const client = useFhevmClient();
  const { createInput } = useEncryptedInput(contractAddress, userAddress);

  const encrypt32 = useCallback(
    async (value: number) => {
      if (!client.isInitialized()) {
        throw new Error('FHEVM client not initialized');
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const input = createInput();
        input.add32(value);
        const encrypted = await input.encrypt();
        return encrypted;
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client, createInput]
  );

  const encrypt64 = useCallback(
    async (value: number) => {
      if (!client.isInitialized()) {
        throw new Error('FHEVM client not initialized');
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const input = createInput();
        input.add64(value);
        const encrypted = await input.encrypt();
        return encrypted;
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client, createInput]
  );

  const encryptBool = useCallback(
    async (value: boolean) => {
      if (!client.isInitialized()) {
        throw new Error('FHEVM client not initialized');
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const input = createInput();
        input.addBool(value);
        const encrypted = await input.encrypt();
        return encrypted;
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client, createInput]
  );

  return {
    encrypt32,
    encrypt64,
    encryptBool,
    isEncrypting,
    error,
    isReady: client.isInitialized(),
  };
}
