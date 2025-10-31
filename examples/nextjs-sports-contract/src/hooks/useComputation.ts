import { useState, useCallback } from 'react';
import { Contract } from 'ethers';

interface UseComputationOptions {
  contract: Contract | null;
}

/**
 * Hook for performing homomorphic computations
 * Note: Actual computations happen on-chain in smart contracts
 */
export function useComputation({ contract }: UseComputationOptions) {
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const compute = useCallback(
    async (method: string, ...args: any[]) => {
      if (!contract) {
        throw new Error('Contract not provided');
      }

      setIsComputing(true);
      setError(null);

      try {
        const tx = await contract[method](...args);
        const receipt = await tx.wait();
        return receipt;
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsComputing(false);
      }
    },
    [contract]
  );

  return {
    compute,
    isComputing,
    error,
  };
}

/**
 * Hook for reading encrypted values from contracts
 */
export function useEncryptedRead() {
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const readEncrypted = useCallback(async (contract: Contract, method: string, ...args: any[]) => {
    setIsReading(true);
    setError(null);

    try {
      const result = await contract[method](...args);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsReading(false);
    }
  }, []);

  return {
    readEncrypted,
    isReading,
    error,
  };
}
