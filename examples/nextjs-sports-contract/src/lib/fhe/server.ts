/**
 * Server-side FHE operations
 * Note: Most FHE operations should be done on the client side
 * This file provides utilities for server-side contexts if needed
 */

export interface FheServerConfig {
  gatewayUrl?: string;
  aclAddress?: string;
  chainId: number;
}

/**
 * Get FHE configuration for server
 */
export function getFheServerConfig(): FheServerConfig {
  return {
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
    gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL,
    aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS,
  };
}

/**
 * Validate encrypted data format
 */
export function validateEncryptedData(data: any): boolean {
  if (!data || typeof data !== 'object') return false;
  return 'handles' in data && 'inputProof' in data;
}

/**
 * Sanitize contract address
 */
export function sanitizeAddress(address: string): string {
  return address.toLowerCase().trim();
}
