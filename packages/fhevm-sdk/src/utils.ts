import { createInstance, type FhevmInstance } from 'fhevmjs';
import type { BrowserProvider, JsonRpcProvider } from 'ethers';

/**
 * Create an FHEVM instance with the given configuration
 *
 * @param provider - Ethereum provider
 * @param chainId - Optional chain ID (auto-detected if not provided)
 * @param gatewayUrl - Optional gateway URL
 * @param aclAddress - Optional ACL contract address
 * @returns FHEVM instance
 */
export async function createFhevmInstance(
  provider: BrowserProvider | JsonRpcProvider,
  chainId?: number,
  gatewayUrl?: string,
  aclAddress?: string
): Promise<FhevmInstance> {
  const network = await provider.getNetwork();
  const detectedChainId = Number(network.chainId);

  return createInstance({
    chainId: chainId || detectedChainId,
    networkUrl: provider._getConnection().url,
    gatewayUrl,
    aclAddress,
  });
}

/**
 * Get the public key for encryption from a contract
 *
 * @param instance - FHEVM instance
 * @param contractAddress - Contract address
 * @returns Public key as hex string
 */
export async function getPublicKey(
  instance: FhevmInstance,
  contractAddress: string
): Promise<string> {
  return instance.getPublicKey(contractAddress);
}

/**
 * Convert a value to the appropriate type for encryption
 *
 * @param value - Value to convert
 * @param type - Target type
 * @returns Converted value
 */
export function toEncryptedType(
  value: number | bigint | boolean | string,
  type: 'number' | 'bigint' | 'boolean' | 'address'
): number | bigint | boolean | string {
  switch (type) {
    case 'number':
      return typeof value === 'number' ? value : Number(value);
    case 'bigint':
      return typeof value === 'bigint' ? value : BigInt(value);
    case 'boolean':
      return Boolean(value);
    case 'address':
      return String(value);
    default:
      return value;
  }
}

/**
 * Validate Ethereum address format
 *
 * @param address - Address to validate
 * @returns True if valid
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Format encrypted value handle for display
 *
 * @param handle - Encrypted value handle
 * @returns Formatted string
 */
export function formatHandle(handle: bigint | string): string {
  const handleStr = typeof handle === 'bigint' ? handle.toString(16) : handle;
  return `0x${handleStr.padStart(64, '0')}`;
}

/**
 * Parse encrypted value from contract return
 *
 * @param value - Value from contract
 * @returns Parsed handle
 */
export function parseEncryptedValue(value: any): bigint {
  if (typeof value === 'bigint') {
    return value;
  }
  if (typeof value === 'string') {
    return BigInt(value);
  }
  if (typeof value === 'number') {
    return BigInt(value);
  }
  throw new Error(`Cannot parse encrypted value: ${value}`);
}

/**
 * Check if running in browser environment
 *
 * @returns True if in browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
}

/**
 * Wait for a condition to be true
 *
 * @param condition - Function that returns true when condition is met
 * @param timeout - Maximum time to wait in milliseconds
 * @param interval - Check interval in milliseconds
 * @returns Promise that resolves when condition is met
 */
export async function waitFor(
  condition: () => boolean | Promise<boolean>,
  timeout: number = 30000,
  interval: number = 100
): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const result = await condition();
    if (result) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error(`Timeout waiting for condition after ${timeout}ms`);
}
