import { BrowserProvider, JsonRpcProvider, Signer } from 'ethers';
import { createInstance, FhevmInstance } from 'fhevmjs';

export interface FhevmClientConfig {
  network?: {
    chainId: number;
    rpcUrl?: string;
  };
  gatewayUrl?: string;
  aclAddress?: string;
}

/**
 * FhevmClient - Core client for interacting with FHEVM
 *
 * Provides a wagmi-like interface for FHEVM operations
 */
export class FhevmClient {
  private instance: FhevmInstance | null = null;
  private provider: BrowserProvider | JsonRpcProvider | null = null;
  private config: FhevmClientConfig;

  constructor(config: FhevmClientConfig = {}) {
    this.config = {
      network: {
        chainId: 11155111, // Sepolia default
        ...config.network,
      },
      gatewayUrl: config.gatewayUrl,
      aclAddress: config.aclAddress,
    };
  }

  /**
   * Initialize the FHEVM instance
   */
  async init(providerOrSigner: BrowserProvider | JsonRpcProvider | Signer): Promise<void> {
    if ('provider' in providerOrSigner) {
      this.provider = providerOrSigner.provider as BrowserProvider;
    } else {
      this.provider = providerOrSigner as BrowserProvider;
    }

    const network = await this.provider.getNetwork();
    const chainId = Number(network.chainId);

    this.instance = await createInstance({
      chainId,
      networkUrl: this.config.network?.rpcUrl || this.provider._getConnection().url,
      gatewayUrl: this.config.gatewayUrl,
      aclAddress: this.config.aclAddress,
    });
  }

  /**
   * Get the FHEVM instance
   */
  getInstance(): FhevmInstance {
    if (!this.instance) {
      throw new Error('FhevmClient not initialized. Call init() first.');
    }
    return this.instance;
  }

  /**
   * Get the public key for encryption
   */
  async getPublicKey(contractAddress: string): Promise<string> {
    const instance = this.getInstance();
    return instance.getPublicKey(contractAddress);
  }

  /**
   * Check if client is initialized
   */
  isInitialized(): boolean {
    return this.instance !== null;
  }

  /**
   * Get current network configuration
   */
  getConfig(): FhevmClientConfig {
    return this.config;
  }
}
