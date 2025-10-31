/**
 * Validation utilities
 */

/**
 * Validate contract address
 */
export function validateContractAddress(address: string): { valid: boolean; error?: string } {
  if (!address) {
    return { valid: false, error: 'Address is required' };
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return { valid: false, error: 'Invalid Ethereum address format' };
  }

  return { valid: true };
}

/**
 * Validate encrypted input
 */
export function validateEncryptedInput(data: any): { valid: boolean; error?: string } {
  if (!data) {
    return { valid: false, error: 'Encrypted data is required' };
  }

  if (typeof data !== 'object') {
    return { valid: false, error: 'Encrypted data must be an object' };
  }

  if (!('handles' in data) || !Array.isArray(data.handles)) {
    return { valid: false, error: 'Missing or invalid handles array' };
  }

  if (!('inputProof' in data) || typeof data.inputProof !== 'string') {
    return { valid: false, error: 'Missing or invalid inputProof' };
  }

  return { valid: true };
}

/**
 * Validate numeric range
 */
export function validateRange(
  value: number,
  min: number,
  max: number,
  fieldName: string = 'Value'
): { valid: boolean; error?: string } {
  if (isNaN(value)) {
    return { valid: false, error: `${fieldName} must be a number` };
  }

  if (value < min) {
    return { valid: false, error: `${fieldName} must be at least ${min}` };
  }

  if (value > max) {
    return { valid: false, error: `${fieldName} must not exceed ${max}` };
  }

  return { valid: true };
}

/**
 * Validate form data
 */
export function validateForm(fields: Record<string, any>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  Object.entries(fields).forEach(([key, value]) => {
    if (value === '' || value === null || value === undefined) {
      errors[key] = `${key} is required`;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
