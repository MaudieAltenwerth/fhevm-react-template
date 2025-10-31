import { FhevmClient, encryptInput } from '@fhevm-sdk/core';
import { BrowserProvider } from 'ethers';
import type { FhevmInstance } from '@fhevm-sdk/core';

/**
 * Initialize FHE client with provider
 */
export async function initializeFheClient(
  provider: BrowserProvider,
  chainId: number = 11155111
): Promise<FhevmClient> {
  const client = new FhevmClient({
    network: {
      chainId,
    },
  });

  await client.init(provider);
  return client;
}

/**
 * Create encrypted input for contract
 */
export function createEncryptedInput(
  instance: FhevmInstance,
  contractAddress: string,
  userAddress: string
) {
  return encryptInput(instance, contractAddress, userAddress);
}

/**
 * Check if FHE client is ready
 */
export function isFheReady(client: FhevmClient): boolean {
  return client.isInitialized();
}
