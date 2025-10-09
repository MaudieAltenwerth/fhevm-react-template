/**
 * @fhevm-sdk/core
 * Universal FHEVM SDK for building confidential dApps
 *
 * Framework-agnostic SDK that works with React, Next.js, Vue, Node.js, or any frontend setup
 */

export { FhevmClient, type FhevmClientConfig } from './client';
export { encryptInput, type EncryptedInput } from './encrypt';
export { userDecrypt, publicDecrypt, batchUserDecrypt, type DecryptOptions } from './decrypt';
export { FhevmProvider, useFhevmClient, useFhevmContract, useFhevmInit, useEncryptedInput } from './react';
export type {
  ContractConfig,
  FhevmContract,
  NetworkConfig,
  GatewayConfig,
  EncryptedValue,
  EncryptedType,
  PermissionSignature,
  ReencryptionRequest,
  FhevmInstanceProvider
} from './types';
export {
  createFhevmInstance,
  getPublicKey,
  toEncryptedType,
  isValidAddress,
  formatHandle,
  parseEncryptedValue,
  isBrowser,
  waitFor
} from './utils';
