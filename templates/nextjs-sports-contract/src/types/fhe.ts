/**
 * FHE-related type definitions
 */

export type FheType =
  | 'euint8'
  | 'euint16'
  | 'euint32'
  | 'euint64'
  | 'euint128'
  | 'euint256'
  | 'ebool'
  | 'eaddress';

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

export interface DecryptionResult {
  value: number | boolean | string;
  type: FheType;
}

export interface FhevmConfig {
  network: {
    chainId: number;
    rpcUrl?: string;
  };
  gatewayUrl?: string;
  aclAddress?: string;
}

export interface FhevmInitStatus {
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
}

export interface EncryptedInput {
  add8: (value: number) => void;
  add16: (value: number) => void;
  add32: (value: number) => void;
  add64: (value: number) => void;
  add128: (value: number | bigint) => void;
  add256: (value: number | bigint) => void;
  addBool: (value: boolean) => void;
  addAddress: (address: string) => void;
  encrypt: () => Promise<EncryptionResult>;
}
