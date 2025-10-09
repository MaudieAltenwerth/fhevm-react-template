import type { FhevmInstance } from 'fhevmjs';

export interface EncryptedInput {
  handles: Uint8Array[];
  inputProof: string;
}

/**
 * Create an encrypted input builder
 *
 * @param instance - FHEVM instance
 * @param contractAddress - Contract address to encrypt for
 * @param userAddress - User address for encryption
 * @returns Encrypted input builder
 */
export function encryptInput(
  instance: FhevmInstance,
  contractAddress: string,
  userAddress: string
) {
  const input = instance.createEncryptedInput(contractAddress, userAddress);

  return {
    /**
     * Add an encrypted 8-bit unsigned integer
     */
    add8(value: number | bigint) {
      input.add8(value);
      return this;
    },

    /**
     * Add an encrypted 16-bit unsigned integer
     */
    add16(value: number | bigint) {
      input.add16(value);
      return this;
    },

    /**
     * Add an encrypted 32-bit unsigned integer
     */
    add32(value: number | bigint) {
      input.add32(value);
      return this;
    },

    /**
     * Add an encrypted 64-bit unsigned integer
     */
    add64(value: number | bigint) {
      input.add64(value);
      return this;
    },

    /**
     * Add an encrypted 128-bit unsigned integer
     */
    add128(value: bigint) {
      input.add128(value);
      return this;
    },

    /**
     * Add an encrypted 256-bit unsigned integer
     */
    add256(value: bigint) {
      input.add256(value);
      return this;
    },

    /**
     * Add an encrypted boolean
     */
    addBool(value: boolean) {
      input.addBool(value);
      return this;
    },

    /**
     * Add an encrypted address
     */
    addAddress(value: string) {
      input.addAddress(value);
      return this;
    },

    /**
     * Add an encrypted bytes256
     */
    addBytes256(value: Uint8Array) {
      input.addBytes256(value);
      return this;
    },

    /**
     * Encrypt the input and return handles + proof
     */
    async encrypt(): Promise<EncryptedInput> {
      return input.encrypt();
    },
  };
}
