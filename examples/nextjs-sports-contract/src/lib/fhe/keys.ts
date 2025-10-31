/**
 * Key management utilities for FHEVM
 * Keys are managed automatically by the SDK
 */

export interface KeyInfo {
  hasPublicKey: boolean;
  isInitialized: boolean;
}

/**
 * Get key status from client
 */
export function getKeyStatus(isInitialized: boolean): KeyInfo {
  return {
    hasPublicKey: isInitialized,
    isInitialized,
  };
}

/**
 * Format key for display (never show actual keys)
 */
export function formatKeyDisplay(key: string): string {
  if (!key || key.length < 10) return '***';
  return `${key.substring(0, 6)}...${key.substring(key.length - 4)}`;
}

/**
 * Validate key format
 */
export function isValidKeyFormat(key: string): boolean {
  // Basic validation - actual keys are managed by SDK
  return typeof key === 'string' && key.length > 0;
}
