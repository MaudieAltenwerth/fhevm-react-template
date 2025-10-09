import type { FhevmInstance } from 'fhevmjs';
import type { Signer } from 'ethers';

export interface DecryptOptions {
  contractAddress: string;
  userAddress?: string;
}

/**
 * Decrypt a value using user's private key (EIP-712 signature)
 *
 * @param instance - FHEVM instance
 * @param encryptedValue - Encrypted value handle
 * @param signer - Ethereum signer
 * @param options - Decryption options
 * @returns Decrypted value
 */
export async function userDecrypt(
  instance: FhevmInstance,
  encryptedValue: bigint | string,
  signer: Signer,
  options: DecryptOptions
): Promise<bigint> {
  const { contractAddress, userAddress } = options;
  const address = userAddress || (await signer.getAddress());

  // Request decryption using EIP-712 signature
  const decrypted = await instance.decrypt(
    encryptedValue,
    contractAddress,
    address,
    signer
  );

  return BigInt(decrypted);
}

/**
 * Decrypt a value publicly (if allowed by contract)
 *
 * @param instance - FHEVM instance
 * @param encryptedValue - Encrypted value handle
 * @param contractAddress - Contract address
 * @returns Decrypted value
 */
export async function publicDecrypt(
  instance: FhevmInstance,
  encryptedValue: bigint | string,
  contractAddress: string
): Promise<bigint> {
  const decrypted = await instance.decrypt(encryptedValue, contractAddress);
  return BigInt(decrypted);
}

/**
 * Batch decrypt multiple values
 *
 * @param instance - FHEVM instance
 * @param encryptedValues - Array of encrypted value handles
 * @param signer - Ethereum signer
 * @param options - Decryption options
 * @returns Array of decrypted values
 */
export async function batchUserDecrypt(
  instance: FhevmInstance,
  encryptedValues: (bigint | string)[],
  signer: Signer,
  options: DecryptOptions
): Promise<bigint[]> {
  const decrypted = await Promise.all(
    encryptedValues.map((value) => userDecrypt(instance, value, signer, options))
  );
  return decrypted;
}
