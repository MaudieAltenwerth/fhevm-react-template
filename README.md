# FHEVM SDK - Universal SDK for Confidential dApps

A framework-agnostic SDK for building confidential decentralized applications with Fully Homomorphic Encryption (FHE) using Zama's FHEVM. Inspired by wagmi's developer experience, this SDK provides a simple and intuitive API for encrypted computations on blockchain.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![FHE](https://img.shields.io/badge/FHE-Zama-purple.svg)](https://www.zama.ai/)

**GitHub Repository**: [https://github.com/MaudieAltenwerth/fhevm-react-template](https://github.com/MaudieAltenwerth/fhevm-react-template)

**Live Demo**: [https://confidential-sports.vercel.app/](https://confidential-sports.vercel.app/)

**Demo Video**: The `demo.mp4` file in the repository contains a comprehensive demonstration. Please download the file to view it (the video cannot be streamed online, download is required for viewing).

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
│   └── fhevm-sdk/                # Core SDK package
│       ├── src/
│       │   ├── core/             # Core FHEVM logic
│       │   │   └── fhevm.ts      # Main FHEVM client
│       │   ├── hooks/            # React hooks
│       │   │   └── useFhevm.tsx  # Custom React hooks
│       │   ├── adapters/         # Framework adapters
│       │   ├── utils/            # Utility functions
│       │   │   ├── encryption.ts # Encryption utilities
│       │   │   ├── decryption.ts # Decryption utilities
│       │   │   └── index.ts      # Common utilities
│       │   ├── types/            # TypeScript type definitions
│       │   │   └── index.ts      # Type exports
│       │   ├── client.ts         # FHEVM client (legacy)
│       │   ├── encrypt.ts        # Encryption (legacy)
│       │   ├── decrypt.ts        # Decryption (legacy)
│       │   ├── react.tsx         # React integration
│       │   └── index.ts          # Main exports
│       └── package.json
│
├── examples/                     # Example templates
│   ├── nextjs-sports-contract/   # Next.js example with SDK
│   │   ├── src/
│   │   │   ├── app/              # Next.js App Router
│   │   │   │   ├── layout.tsx    # Root layout
│   │   │   │   ├── page.tsx      # Home page
│   │   │   │   ├── globals.css   # Global styles
│   │   │   │   └── api/          # API routes
│   │   │   │       ├── fhe/      # FHE operations API
│   │   │   │       │   ├── route.ts       # Main FHE endpoint
│   │   │   │       │   ├── encrypt/route.ts
│   │   │   │       │   ├── decrypt/route.ts
│   │   │   │       │   └── compute/route.ts
│   │   │   │       └── keys/route.ts      # Key management API
│   │   │   ├── components/       # React components
│   │   │   │   ├── ui/           # Base UI components
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   └── Card.tsx
│   │   │   │   ├── fhe/          # FHE-specific components
│   │   │   │   │   ├── FHEProvider.tsx
│   │   │   │   │   ├── EncryptionDemo.tsx
│   │   │   │   │   ├── ComputationDemo.tsx
│   │   │   │   │   └── KeyManager.tsx
│   │   │   │   ├── examples/     # Use case examples
│   │   │   │   │   ├── BankingExample.tsx
│   │   │   │   │   └── MedicalExample.tsx
│   │   │   │   ├── RegisterTeam.tsx
│   │   │   │   ├── RegisterAthlete.tsx
│   │   │   │   └── WalletConnect.tsx
│   │   │   ├── lib/              # Libraries
│   │   │   │   ├── fhe/          # FHE integration
│   │   │   │   │   ├── client.ts
│   │   │   │   │   ├── server.ts
│   │   │   │   │   ├── keys.ts
│   │   │   │   │   └── types.ts
│   │   │   │   ├── utils/        # Utilities
│   │   │   │   │   ├── security.ts
│   │   │   │   │   └── validation.ts
│   │   │   │   └── contract.ts
│   │   │   ├── hooks/            # Custom hooks
│   │   │   │   ├── useFHE.ts
│   │   │   │   ├── useEncryption.ts
│   │   │   │   └── useComputation.ts
│   │   │   └── types/            # Type definitions
│   │   │       ├── fhe.ts
│   │   │       └── api.ts
│   │   └── package.json
│   │
│   ├── react-basic/              # Basic React example with SDK
│   │   ├── src/
│   │   │   ├── App.jsx           # Main React app with FHEVM integration
│   │   │   ├── main.jsx          # React entry point
│   │   │   └── index.css         # Styles
│   │   ├── index.html            # HTML template
│   │   ├── vite.config.js        # Vite configuration
│   │   └── package.json
│   │
│   └── sports-contract/          # Sports contract with React frontend
│       ├── src/                  # React source files
│       │   ├── App.jsx           # Main app with SDK integration
│       │   ├── main.jsx          # Entry point
│       │   └── index.css         # Styles
│       ├── contracts/            # Smart contracts
│       │   └── ConfidentialSportsContract.sol
│       ├── public/               # Static files (legacy HTML/JS for reference)
│       ├── index.html            # Vite HTML template
│       ├── vite.config.js        # Vite configuration
│       ├── hardhat.config.js     # Hardhat configuration
│       └── package.json
│
├── templates/                    # Templates directory (alias)
├── package.json                  # Workspace root
├── README.md                     # This file
├── GETTING_STARTED.md           # Quick start guide
├── DEMO_INSTRUCTIONS.md         # Video recording guide
└── demo.txt                     # Demo video placeholder
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

A complete Next.js application demonstrating encrypted athlete salaries and team payrolls with full SDK integration.

**Location**: `examples/nextjs-sports-contract/`

**Features**:
- Register teams with encrypted salary caps
- Register athletes with encrypted salaries and bonuses
- Propose and approve contracts with encrypted terms
- Check salary cap compliance without revealing individual salaries
- API routes for FHE operations
- Complete UI component library
- FHE-specific components for encryption/decryption demos
- Banking and medical use case examples

**Run the example**:

```bash
cd examples/nextjs-sports-contract
npm install
npm run dev
```

Then open your browser and navigate to the local development server that starts.

**Key Files and Structure**:

**App Router & API**:
- `src/app/page.tsx` - Main application with FhevmProvider
- `src/app/api/fhe/route.ts` - FHE operations API endpoint
- `src/app/api/fhe/encrypt/route.ts` - Encryption API
- `src/app/api/fhe/decrypt/route.ts` - Decryption API
- `src/app/api/fhe/compute/route.ts` - Computation API
- `src/app/api/keys/route.ts` - Key management API

**Components**:
- `src/components/ui/` - Base UI components (Button, Input, Card)
- `src/components/fhe/` - FHE-specific components
  - `FHEProvider.tsx` - FHE context provider
  - `EncryptionDemo.tsx` - Interactive encryption demo
  - `ComputationDemo.tsx` - Homomorphic computation demo
  - `KeyManager.tsx` - Key status display
- `src/components/examples/` - Use case examples
  - `BankingExample.tsx` - Financial privacy use case
  - `MedicalExample.tsx` - Healthcare privacy use case
- `src/components/RegisterTeam.tsx` - Team registration with SDK
- `src/components/RegisterAthlete.tsx` - Athlete registration using useEncryptedInput hook

**Libraries & Utilities**:
- `src/lib/fhe/` - FHE integration layer
  - `client.ts` - Client-side FHE operations
  - `server.ts` - Server-side utilities
  - `keys.ts` - Key management
  - `types.ts` - Type definitions
- `src/lib/utils/` - Common utilities
  - `security.ts` - Security helpers
  - `validation.ts` - Input validation
- `src/lib/contract.ts` - Contract configuration

**Hooks**:
- `src/hooks/useFHE.ts` - Re-exports SDK hooks
- `src/hooks/useEncryption.ts` - Custom encryption hooks
- `src/hooks/useComputation.ts` - Computation hooks

**Types**:
- `src/types/fhe.ts` - FHE type definitions
- `src/types/api.ts` - API type definitions

### Example 2: React Basic

A minimal React application demonstrating the FHEVM SDK fundamentals.

**Location**: `examples/react-basic/`

**Features**:
- Simple wallet connection flow
- FHEVM initialization demonstration
- Basic number encryption
- Minimal UI for learning
- Vite-based React setup

**Run the example**:

```bash
cd examples/react-basic
npm install
npm run dev
```

### Example 3: Sports Contract (React + Solidity)

Full-featured React application with confidential sports contract backend.

**Location**: `examples/sports-contract/`

**Features**:
- Complete React frontend with SDK integration
- Team registration with encrypted salary caps
- Athlete management with encrypted salaries and bonuses
- Contract proposal system with encrypted terms
- Query interface for team and athlete information
- Solidity smart contract with FHE types
- Vite + React development setup
- Hardhat for smart contract compilation and deployment

**Run the frontend**:

```bash
cd examples/sports-contract
npm install
npm run dev
```

**Compile contracts**:

```bash
cd examples/sports-contract
npm run compile
```

**Key Files**:
- `src/App.jsx` - Main React app with FHEVM SDK integration
- `contracts/ConfidentialSportsContract.sol` - FHE-enabled smart contract
- `public/` - Legacy static HTML/JS (kept for reference)

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

The `demo.mp4` file in the repository provides a complete demonstration of the FHEVM SDK.

**Important**: The video file must be downloaded to view. It cannot be streamed or played through web links. Please clone the repository or download the file directly to watch the demonstration.

The demo video showcases:
- **SDK Architecture**: Overview of the framework-agnostic design
- **Core Features**: Encryption, decryption, and React hooks
- **Next.js Example**: Live demonstration of the sports contract application
- **Wallet Integration**: MetaMask connection and FHEVM initialization
- **Encrypted Operations**: Real-time encryption of athlete salaries and bonuses
- **Code Walkthrough**: Detailed explanation of SDK integration
- **Smart Contract**: FHE types and privacy-preserving computations

For instructions on creating additional demo videos, see `DEMO_INSTRUCTIONS.md`.

## Live Demo Application

**URL**: [https://confidential-sports.vercel.app/](https://confidential-sports.vercel.app/)

The live demo showcases the FHEVM SDK integrated into a Next.js application for confidential sports contract management.

### Features Available in Live Demo:
- **Wallet Connection**: Connect MetaMask to Sepolia testnet
- **FHEVM Initialization**: Automatic initialization of FHE encryption
- **Team Registration**: Create teams with encrypted salary caps
- **Athlete Management**: Register athletes with confidential salaries and bonuses
- **Contract Proposals**: Submit and approve encrypted contract offers
- **Salary Cap Verification**: Check compliance without revealing individual salaries
- **Real-time Encryption**: See FHE operations in action

### Requirements:
- MetaMask browser extension installed
- Sepolia testnet selected in MetaMask
- Sufficient Sepolia test ETH for transactions (get from faucet)
- Modern web browser (Chrome, Firefox, Brave recommended)

### Try It Out:
1. Visit the live demo URL
2. Click "Connect Wallet" and approve MetaMask connection
3. Wait for FHEVM to initialize (may take a few seconds)
4. Explore the team and athlete registration features
5. Test encrypted salary operations

## GitHub Repository

**Repository URL**: [https://github.com/MaudieAltenwerth/fhevm-react-template](https://github.com/MaudieAltenwerth/fhevm-react-template)

### Repository Structure:
- `packages/fhevm-sdk/` - Core SDK package
- `examples/nextjs-sports-contract/` - Next.js demo application
- `examples/sports-contract/` - Solidity smart contract
- `DEMO_INSTRUCTIONS.md` - Video recording guide
- `demo.mp4` - Demonstration video (download to view)

### Clone and Run Locally:

```bash
# Clone the repository
git clone https://github.com/MaudieAltenwerth/fhevm-react-template.git
cd fhevm-react-template

# Install dependencies
npm install

# Build SDK
npm run build:sdk

# Run Next.js example
cd examples/nextjs-sports-contract
npm install
npm run dev
```

## Acknowledgments

- Built with [fhevmjs](https://github.com/zama-ai/fhevmjs) by Zama
- Inspired by [wagmi](https://wagmi.sh/) developer experience
- Powered by Fully Homomorphic Encryption (FHE)
- Sports contract example demonstrates real-world FHE applications

---

**Built with ❤️ for the FHEVM community**

For questions and support, please open an issue on the [GitHub repository](https://github.com/MaudieAltenwerth/fhevm-react-template).
