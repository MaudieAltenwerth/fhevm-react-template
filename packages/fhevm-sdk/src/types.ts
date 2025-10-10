import type { Contract, BrowserProvider, JsonRpcProvider, Signer } from 'ethers';
import type { FhevmInstance } from 'fhevmjs';

/**
 * Contract configuration for FHEVM contracts
 */
export interface ContractConfig {
  address: string;
  abi: any[];
  provider?: BrowserProvider | JsonRpcProvider;
  signer?: Signer;
}

/**
 * FHEVM Contract interface
 */
export interface FhevmContract extends Contract {
  address: string;
}

/**
 * Network configuration
 */
export interface NetworkConfig {
  chainId: number;
  rpcUrl?: string;
  name?: string;
}

/**
 * Gateway configuration for decryption
 */
export interface GatewayConfig {
  url?: string;
  aclAddress?: string;
}

/**
 * Encrypted value types
 */
export type EncryptedValue = bigint | string;

/**
 * Supported encrypted types
 */
export enum EncryptedType {
  EUINT8 = 'euint8',
  EUINT16 = 'euint16',
  EUINT32 = 'euint32',
  EUINT64 = 'euint64',
  EUINT128 = 'euint128',
  EUINT256 = 'euint256',
  EBOOL = 'ebool',
  EADDRESS = 'eaddress',
  EBYTES256 = 'ebytes256',
}

/**
 * Permission signature for decryption
 */
export interface PermissionSignature {
  signature: string;
  publicKey: string;
}

/**
 * Reencryption request
 */
export interface ReencryptionRequest {
  handle: bigint | string;
  contractAddress: string;
  userAddress: string;
}

/**
 * FHEVM instance provider
 */
export interface FhevmInstanceProvider {
  getInstance(): FhevmInstance;
  isInitialized(): boolean;
}
