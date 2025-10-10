# FHEVM SDK - Universal SDK for Confidential dApps

A framework-agnostic SDK for building confidential decentralized applications with Fully Homomorphic Encryption (FHE) using Zama's FHEVM. Inspired by wagmi's developer experience, this SDK provides a simple and intuitive API for encrypted computations on blockchain.

## Features

- **🎯 Framework Agnostic**: Works with React, Next.js, Vue, Node.js, or vanilla JavaScript
- **🔐 End-to-End Encryption**: Create and manage encrypted inputs with type-safe APIs
- **⚡ React Hooks**: Optional React integration with hooks for common patterns
- **🛠️ TypeScript First**: Fully typed for excellent developer experience
- **📦 Modular Design**: Import only what you need
- **🔄 Wagmi-like API**: Familiar patterns for Ethereum developers

## Quick Start

### Installation

```bash
npm install @fhevm-sdk/core fhevmjs ethers
```

### Basic Usage

```typescript
import { FhevmClient, encryptInput } from '@fhevm-sdk/core';
import { BrowserProvider } from 'ethers';

// Initialize the client
const client = new FhevmClient({
  network: {
    chainId: 11155111, // Sepolia
  },
});

// Connect to provider
const provider = new BrowserProvider(window.ethereum);
await client.init(provider);

// Create encrypted input
const instance = client.getInstance();
const input = encryptInput(instance, contractAddress, userAddress);

input.add32(42); // Add encrypted uint32
input.addBool(true); // Add encrypted boolean
const encrypted = await input.encrypt();
```

### React Integration

```tsx
import { FhevmProvider, useFhevmClient, useFhevmInit } from '@fhevm-sdk/core';

function App() {
  return (
    <FhevmProvider config={{ network: { chainId: 11155111 } }}>
      <YourComponents />
    </FhevmProvider>
  );
}

function YourComponent() {
  const client = useFhevmClient();
  const { isInitialized, isLoading } = useFhevmInit(provider);

  if (!isInitialized) return <div>Loading...</div>;

  // Use client for encrypted operations
  const instance = client.getInstance();
}
```

## Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/           # Core SDK package
│       ├── src/
│       │   ├── client.ts    # FHEVM client
│       │   ├── encrypt.ts   # Encryption utilities
│       │   ├── decrypt.ts   # Decryption utilities
│       │   ├── react.tsx    # React hooks
│       │   ├── types.ts     # TypeScript types
│       │   ├── utils.ts     # Utility functions
│       │   └── index.ts     # Main exports
│       └── package.json
│
├── examples/
│   ├── nextjs-sports-contract/  # Next.js example with sports contract
│   │   ├── src/
│   │   │   ├── app/         # Next.js app directory
│   │   │   ├── components/  # React components
│   │   │   └── lib/         # Contract config
│   │   └── package.json
│   │
│   └── sports-contract/     # Smart contract example
│       └── contracts/
│           └── ConfidentialSportsContract.sol
│
├── package.json             # Workspace root
├── README.md               # This file
├── DEMO_INSTRUCTIONS.md    # Video recording guide
└── demo.txt               # Demo video placeholder
```

## SDK API Reference

### Core Client

#### `FhevmClient`

Main client for managing FHEVM instances.

```typescript
const client = new FhevmClient({
  network: {
    chainId: 11155111,
    rpcUrl?: string,
  },
  gatewayUrl?: string,
  aclAddress?: string,
});

await client.init(provider); // Initialize with provider
const instance = client.getInstance(); // Get FHEVM instance
const isReady = client.isInitialized(); // Check status
```

### Encryption

#### `encryptInput()`

Create encrypted inputs for contract calls.

```typescript
import { encryptInput } from '@fhevm-sdk/core';

const input = encryptInput(instance, contractAddress, userAddress);

// Supported types
input.add8(value);      // euint8
input.add16(value);     // euint16
input.add32(value);     // euint32
input.add64(value);     // euint64
input.add128(value);    // euint128
input.add256(value);    // euint256
input.addBool(value);   // ebool
input.addAddress(addr); // eaddress

const { handles, inputProof } = await input.encrypt();
```

### Decryption

#### `userDecrypt()`

Decrypt values using user's private key (requires EIP-712 signature).

```typescript
import { userDecrypt } from '@fhevm-sdk/core';

const decrypted = await userDecrypt(
  instance,
  encryptedValue,
  signer,
  {
    contractAddress,
    userAddress,
  }
);
```

#### `batchUserDecrypt()`

Decrypt multiple values in parallel.

```typescript
import { batchUserDecrypt } from '@fhevm-sdk/core';

const decryptedValues = await batchUserDecrypt(
  instance,
  [handle1, handle2, handle3],
  signer,
  { contractAddress, userAddress }
);
```

### React Hooks

#### `useFhevmClient()`

Access the FHEVM client instance.

```typescript
const client = useFhevmClient();
const instance = client.getInstance();
```

#### `useFhevmInit()`

Initialize FHEVM with a provider.

```typescript
const { isInitialized, isLoading, error } = useFhevmInit(provider);
```

#### `useFhevmContract()`

Create a contract instance with FHEVM support.

```typescript
const { contract, isReady, client } = useFhevmContract({
  address: contractAddress,
  abi: contractAbi,
  provider,
  signer,
});
```

#### `useEncryptedInput()`

Hook for creating encrypted inputs.

```typescript
const { createInput, client } = useEncryptedInput(
  contractAddress,
  userAddress
);

const input = createInput();
input.add32(100);
const encrypted = await input.encrypt();
```

## Examples

### Example 1: Next.js Sports Contract

A complete Next.js application demonstrating encrypted athlete salaries and team payrolls.

**Location**: `examples/nextjs-sports-contract/`

**Features**:
- Register teams with encrypted salary caps
- Register athletes with encrypted salaries and bonuses
- Propose and approve contracts with encrypted terms
- Check salary cap compliance without revealing individual salaries

**Run the example**:

```bash
cd examples/nextjs-sports-contract
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Key Files**:
- `src/app/page.tsx` - Main application with FhevmProvider
- `src/components/RegisterTeam.tsx` - Team registration with SDK
- `src/components/RegisterAthlete.tsx` - Athlete registration using useEncryptedInput hook

### Example 2: Sports Contract (Solidity)

Confidential sports contract with encrypted athlete data.

**Location**: `examples/sports-contract/contracts/ConfidentialSportsContract.sol`

**Features**:
- Encrypted salaries (euint32)
- Encrypted bonuses (euint32)
- Encrypted salary caps (euint32)
- Privacy-preserving payroll calculations
- Encrypted salary cap compliance checks

## Use Cases

### 1. Private Financial Data
```typescript
// Encrypt salary data
const input = encryptInput(instance, contractAddress, userAddress);
input.add32(50000); // Salary
input.add32(5000);  // Bonus
const encrypted = await input.encrypt();

// Send encrypted data to contract
await contract.registerAthlete(name, position, encrypted);
```

### 2. Confidential Voting
```typescript
// Encrypt vote
const input = encryptInput(instance, contractAddress, voterAddress);
input.addBool(true); // Vote yes/no
const encrypted = await input.encrypt();

await votingContract.castVote(proposalId, encrypted);
```

### 3. Private Auctions
```typescript
// Encrypt bid amount
const input = encryptInput(instance, contractAddress, bidderAddress);
input.add64(bidAmount);
const encrypted = await input.encrypt();

await auctionContract.placeBid(auctionId, encrypted);
```

### 4. Confidential Gaming
```typescript
// Encrypt player stats
const input = encryptInput(instance, contractAddress, playerAddress);
input.add16(health);
input.add16(mana);
input.add32(experience);
const encrypted = await input.encrypt();

await gameContract.updateStats(playerId, encrypted);
```

## Development

### Workspace Setup

This project uses npm workspaces for monorepo management.

```bash
# Install all dependencies
npm install

# Build SDK package
npm run build:sdk

# Run Next.js example
npm run dev:nextjs
```

### Building the SDK

```bash
cd packages/fhevm-sdk
npm run build
```

### Running Tests

```bash
cd packages/fhevm-sdk
npm test
```

## Architecture

### Design Principles

1. **Framework Agnostic Core**: The core SDK (`client.ts`, `encrypt.ts`, `decrypt.ts`) has no framework dependencies
2. **Optional Framework Integrations**: React hooks are separate and optional
3. **Type Safety**: Full TypeScript support with exported types
4. **Modular Exports**: Import only what you need
5. **Developer Experience**: Wagmi-like API patterns

### Key Components

```
┌─────────────────────────────────────────┐
│           Application Layer             │
│  (React, Next.js, Vue, Node.js, etc.)   │
└─────────────────┬───────────────────────┘
                  │
         ┌────────▼────────┐
         │  FHEVM SDK      │
         │  - FhevmClient  │
         │  - Encryption   │
         │  - Decryption   │
         │  - React Hooks  │
         └────────┬────────┘
                  │
         ┌────────▼────────┐
         │    fhevmjs      │
         │  (Zama Library) │
         └────────┬────────┘
                  │
         ┌────────▼────────┐
         │  FHEVM Network  │
         │   (Blockchain)  │
         └─────────────────┘
```

## Smart Contract Integration

### Solidity Example

```solidity
pragma solidity ^0.8.24;

import { FHE, euint32, ebool } from "@fhevm/solidity/lib/FHE.sol";

contract MyContract {
    euint32 private encryptedValue;

    function setEncryptedValue(uint32 value) public {
        encryptedValue = FHE.asEuint32(value);
        FHE.allowThis(encryptedValue);
        FHE.allow(encryptedValue, msg.sender);
    }

    function addToValue(uint32 amount) public {
        euint32 encryptedAmount = FHE.asEuint32(amount);
        encryptedValue = FHE.add(encryptedValue, encryptedAmount);
    }
}
```

### Frontend Integration

```typescript
import { FhevmClient, encryptInput } from '@fhevm-sdk/core';
import { Contract } from 'ethers';

// Initialize SDK
const client = new FhevmClient();
await client.init(provider);

// Create contract instance
const contract = new Contract(address, abi, signer);

// Create encrypted input
const instance = client.getInstance();
const input = encryptInput(instance, address, userAddress);
input.add32(100);
const encrypted = await input.encrypt();

// Call contract
await contract.setEncryptedValue(100);
```

## Supported Networks

- **Sepolia Testnet**: ChainID 11155111
- **Local FHEVM**: For development and testing
- **Zama Devnet**: For FHEVM-specific testing

## Browser Support

- Chrome/Brave (recommended)
- Firefox
- Safari (with limited Web3 support)
- Edge

## Requirements

- Node.js 18+
- MetaMask or compatible Web3 wallet
- TypeScript 5.0+ (for TypeScript projects)

## Troubleshorations

### FHEVM Not Initializing

```typescript
// Ensure provider is connected
if (typeof window.ethereum === 'undefined') {
  console.error('Please install MetaMask');
}

// Wait for network
const provider = new BrowserProvider(window.ethereum);
await provider.send('eth_requestAccounts', []);
```

### Encryption Failing

```typescript
// Verify client is initialized
if (!client.isInitialized()) {
  await client.init(provider);
}

// Check contract address format
if (!isValidAddress(contractAddress)) {
  console.error('Invalid contract address');
}
```

### React Hooks Error

```typescript
// Ensure FhevmProvider wraps your app
<FhevmProvider config={config}>
  <App />
</FhevmProvider>
```

## Performance Tips

1. **Batch Decryption**: Use `batchUserDecrypt()` for multiple values
2. **Reuse Client**: Initialize FhevmClient once and reuse
3. **Cache Instance**: Store FHEVM instance in context/state
4. **Lazy Loading**: Import React hooks only when needed

## Security Considerations

1. **Private Keys**: Never expose private keys in client code
2. **Encrypted Values**: Handles are safe to expose, actual values are not
3. **Permissions**: Set proper FHE.allow() permissions in contracts
4. **Validation**: Validate inputs before encryption
5. **Signatures**: EIP-712 signatures protect decryption requests

## Contributing

We welcome contributions! Please see our contributing guidelines.

### Development Setup

```bash
# Clone repository
git clone <repository-url>
cd fhevm-react-template

# Install dependencies
npm install

# Build SDK
npm run build:sdk

# Run tests
npm test
```

## Resources

- **Zama FHEVM**: https://docs.zama.ai/fhevm
- **fhevmjs**: https://github.com/zama-ai/fhevmjs
- **Zama**: https://www.zama.ai/
- **FHEVM Solidity**: https://github.com/zama-ai/fhevm-solidity

## License

MIT License - see LICENSE file for details

## Demo Video

See `DEMO_INSTRUCTIONS.md` for guidance on creating the demonstration video.

The demo video showcases:
- SDK architecture and features
- Next.js example application
- Real-time encrypted operations
- Code walkthrough
- Smart contract integration

## Acknowledgments

- Built with [fhevmjs](https://github.com/zama-ai/fhevmjs) by Zama
- Inspired by [wagmi](https://wagmi.sh/) developer experience
- Powered by Fully Homomorphic Encryption (FHE)

---

**Built with ❤️ for the FHEVM community**

For questions and support, please open an issue on GitHub.
