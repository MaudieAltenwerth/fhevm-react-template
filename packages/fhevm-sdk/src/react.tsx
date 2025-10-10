import React, { createContext, useContext, useEffect, useState } from 'react';
import { Contract, BrowserProvider } from 'ethers';
import { FhevmClient, type FhevmClientConfig } from './client';
import type { ContractConfig } from './types';

// Context for FHEVM Client
const FhevmContext = createContext<FhevmClient | null>(null);

export interface FhevmProviderProps {
  config?: FhevmClientConfig;
  children: React.ReactNode;
}

/**
 * FhevmProvider - React Context Provider for FHEVM
 *
 * Wrap your app with this provider to use FHEVM hooks
 */
export function FhevmProvider({ config, children }: FhevmProviderProps) {
  const [client] = useState(() => new FhevmClient(config));

  return <FhevmContext.Provider value={client}>{children}</FhevmContext.Provider>;
}

/**
 * useFhevmClient - Hook to access FHEVM client
 *
 * @returns FhevmClient instance
 */
export function useFhevmClient(): FhevmClient {
  const client = useContext(FhevmContext);
  if (!client) {
    throw new Error('useFhevmClient must be used within FhevmProvider');
  }
  return client;
}

/**
 * useFhevmInit - Hook to initialize FHEVM with a provider
 *
 * @param provider - Ethereum provider
 * @returns Initialization status
 */
export function useFhevmInit(provider: BrowserProvider | null) {
  const client = useFhevmClient();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!provider || client.isInitialized()) return;

    setIsLoading(true);
    setError(null);

    client
      .init(provider)
      .then(() => {
        setIsInitialized(true);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [provider, client]);

  return { isInitialized, isLoading, error };
}

/**
 * useFhevmContract - Hook to create a contract instance with FHEVM support
 *
 * @param config - Contract configuration
 * @returns Contract instance and utilities
 */
export function useFhevmContract<T extends Contract>(config: ContractConfig) {
  const client = useFhevmClient();
  const [contract, setContract] = useState<T | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!config.address || !config.abi || !config.provider) {
      return;
    }

    try {
      const signer = config.signer || config.provider;
      const contractInstance = new Contract(
        config.address,
        config.abi,
        signer
      ) as T;

      setContract(contractInstance);
      setIsReady(true);
    } catch (err) {
      console.error('Failed to create contract instance:', err);
      setIsReady(false);
    }
  }, [config.address, config.abi, config.provider, config.signer]);

  return {
    contract,
    isReady,
    client,
  };
}

/**
 * useEncryptedInput - Hook to create encrypted inputs
 *
 * @param contractAddress - Contract address
 * @param userAddress - User address
 * @returns Encryption utilities
 */
export function useEncryptedInput(
  contractAddress: string,
  userAddress: string
) {
  const client = useFhevmClient();

  const createInput = () => {
    if (!client.isInitialized()) {
      throw new Error('FHEVM client not initialized');
    }

    const instance = client.getInstance();
    return instance.createEncryptedInput(contractAddress, userAddress);
  };

  return { createInput, client };
}
