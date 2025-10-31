/**
 * API-related type definitions
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EncryptApiRequest {
  value: number | boolean | string;
  type: string;
  contractAddress: string;
  userAddress: string;
}

export interface DecryptApiRequest {
  handle: string;
  contractAddress: string;
  userAddress: string;
}

export interface ComputeApiRequest {
  operation: string;
  operands: string[];
}

export interface KeyStatusResponse {
  hasPublicKey: boolean;
  isInitialized: boolean;
}

export interface FheOperationRequest {
  operation: 'initialize' | 'encrypt' | 'decrypt' | 'compute' | 'status';
  params?: Record<string, any>;
}

export interface FheOperationResponse {
  success: boolean;
  result?: any;
  error?: string;
}
