/**
 * Type definitions for FHE operations
 */

export type FheType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128' | 'euint256' | 'ebool' | 'eaddress';

export interface EncryptedValue {
  handle: string;
  type: FheType;
}

export interface EncryptionResult {
  handles: string[];
  inputProof: string;
}

export interface DecryptionRequest {
  handle: string;
  contractAddress: string;
  userAddress: string;
}

export interface FheConfig {
  chainId: number;
  gatewayUrl?: string;
  aclAddress?: string;
  rpcUrl?: string;
}

export interface ContractConfig {
  address: string;
  abi: any[];
}
