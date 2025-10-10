# Getting Started with FHEVM SDK

This guide will help you get up and running with the FHEVM SDK in minutes.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MetaMask** browser extension ([Install](https://metamask.io/))
- **Sepolia testnet ETH** ([Faucet](https://sepoliafaucet.com/))

## Quick Start Options

### Option 1: Use the SDK in Your Project

Install the SDK in any JavaScript/TypeScript project:

```bash
npm install @fhevm-sdk/core fhevmjs ethers
```

Then use it:

```typescript
import { FhevmClient, encryptInput } from '@fhevm-sdk/core';

const client = new FhevmClient();
await client.init(provider);
```

### Option 2: Run the Next.js Example

Try the complete example application:

```bash
# Navigate to example
cd examples/nextjs-sports-contract

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Option 3: Clone and Develop

Work on the SDK itself:

```bash
# Install all workspace dependencies
npm install

# Build the SDK
npm run build:sdk

# Run Next.js example
npm run dev:nextjs
```

## Step-by-Step Tutorial

### 1. Install Dependencies

In your project directory:

```bash
npm install @fhevm-sdk/core fhevmjs ethers
```

### 2. Basic Setup (Vanilla JS/TS)

Create a new file `app.ts`:

```typescript
import { BrowserProvider } from 'ethers';
import { FhevmClient, encryptInput } from '@fhevm-sdk/core';

// Initialize client
const client = new FhevmClient({
  network: {
    chainId: 11155111, // Sepolia
  },
});

// Connect to MetaMask
const provider = new BrowserProvider(window.ethereum);
await provider.send('eth_requestAccounts', []);

// Initialize FHEVM
await client.init(provider);

// Create encrypted input
const instance = client.getInstance();
const userAddress = await provider.getSigner().getAddress();
const contractAddress = '0x...'; // Your contract

const input = encryptInput(instance, contractAddress, userAddress);
input.add32(42);
const encrypted = await input.encrypt();

console.log('Encrypted:', encrypted);
```

### 3. React Setup

Create a React app with the SDK:

```tsx
// App.tsx
import { FhevmProvider } from '@fhevm-sdk/core';
import { MainComponent } from './MainComponent';

function App() {
  return (
    <FhevmProvider config={{ network: { chainId: 11155111 } }}>
      <MainComponent />
    </FhevmProvider>
  );
}

// MainComponent.tsx
import { useState } from 'react';
import { BrowserProvider } from 'ethers';
import { useFhevmClient, useFhevmInit } from '@fhevm-sdk/core';

function MainComponent() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const client = useFhevmClient();
  const { isInitialized, isLoading, error } = useFhevmInit(provider);

  const connectWallet = async () => {
    const newProvider = new BrowserProvider(window.ethereum);
    await newProvider.send('eth_requestAccounts', []);
    setProvider(newProvider);
  };

  if (!provider) {
    return <button onClick={connectWallet}>Connect Wallet</button>;
  }

  if (isLoading) {
    return <div>Initializing FHEVM...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isInitialized) {
    return <div>Ready to use FHEVM!</div>;
  }

  return null;
}
```

### 4. Next.js Setup

In a Next.js project:

```tsx
// app/layout.tsx
import { FhevmProvider } from '@fhevm-sdk/core';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FhevmProvider config={{ network: { chainId: 11155111 } }}>
          {children}
        </FhevmProvider>
      </body>
    </html>
  );
}

// app/page.tsx
'use client';

import { useFhevmClient, useEncryptedInput } from '@fhevm-sdk/core';

export default function Home() {
  const client = useFhevmClient();
  const { createInput } = useEncryptedInput(
    '0x...', // contract address
    '0x...'  // user address
  );

  const encryptValue = async () => {
    const input = createInput();
    input.add32(100);
    const encrypted = await input.encrypt();
    console.log('Encrypted:', encrypted);
  };

  return (
    <button onClick={encryptValue}>
      Encrypt Value
    </button>
  );
}
```

## Common Patterns

### Pattern 1: Encrypt and Send to Contract

```typescript
import { Contract } from 'ethers';
import { encryptInput } from '@fhevm-sdk/core';

// Create encrypted input
const input = encryptInput(instance, contractAddress, userAddress);
input.add32(salary);
input.add32(bonus);
const encrypted = await input.encrypt();

// Send to contract
const contract = new Contract(contractAddress, abi, signer);
await contract.registerAthlete(
  name,
  position,
  encrypted.handles[0],
  encrypted.handles[1],
  encrypted.inputProof
);
```

### Pattern 2: Decrypt Values

```typescript
import { userDecrypt } from '@fhevm-sdk/core';

// Get encrypted handle from contract
const encryptedSalary = await contract.getEncryptedSalary(athleteId);

// Decrypt (requires EIP-712 signature)
const decrypted = await userDecrypt(
  instance,
  encryptedSalary,
  signer,
  {
    contractAddress,
    userAddress,
  }
);

console.log('Salary:', decrypted.toString());
```

### Pattern 3: Batch Decrypt

```typescript
import { batchUserDecrypt } from '@fhevm-sdk/core';

// Get multiple encrypted values
const handles = [handle1, handle2, handle3];

// Decrypt all at once
const decrypted = await batchUserDecrypt(
  instance,
  handles,
  signer,
  { contractAddress, userAddress }
);

console.log('Values:', decrypted.map(v => v.toString()));
```

### Pattern 4: React Hook for Encryption

```typescript
import { useEncryptedInput } from '@fhevm-sdk/core';

function MyComponent() {
  const { createInput } = useEncryptedInput(contractAddress, userAddress);

  const handleSubmit = async (value: number) => {
    const input = createInput();
    input.add32(value);
    const encrypted = await input.encrypt();

    // Use encrypted data
    await contract.submitValue(encrypted);
  };

  return (
    <button onClick={() => handleSubmit(42)}>
      Submit Encrypted Value
    </button>
  );
}
```

## MetaMask Configuration

### Add Sepolia Network

1. Open MetaMask
2. Click network dropdown
3. Click "Add Network"
4. Select "Sepolia" or add manually:
   - **Network Name**: Sepolia
   - **RPC URL**: https://sepolia.infura.io/v3/YOUR_KEY
   - **Chain ID**: 11155111
   - **Currency**: SepoliaETH
   - **Block Explorer**: https://sepolia.etherscan.io

### Get Test ETH

1. Visit [Sepolia Faucet](https://sepoliafaucet.com/)
2. Enter your wallet address
3. Request test ETH
4. Wait for confirmation

## Troubleshooting

### Issue: "Cannot find module '@fhevm-sdk/core'"

**Solution**: Install the dependency:
```bash
npm install @fhevm-sdk/core fhevmjs ethers
```

### Issue: "FhevmClient not initialized"

**Solution**: Ensure you call `init()` before using the client:
```typescript
await client.init(provider);
```

### Issue: "Please install MetaMask"

**Solution**: Install MetaMask browser extension and reload the page.

### Issue: "Wrong network"

**Solution**: Switch MetaMask to Sepolia testnet.

### Issue: Next.js build errors

**Solution**: Add webpack config to `next.config.js`:
```javascript
module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};
```

### Issue: TypeScript errors

**Solution**: Ensure TypeScript 5.0+ and proper tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "esModuleInterop": true
  }
}
```

## Next Steps

After getting started:

1. **Read the Documentation**: Check [README.md](./README.md) for full API reference
2. **Explore Examples**: See [examples/nextjs-sports-contract](./examples/nextjs-sports-contract)
3. **Study the Contract**: Review [ConfidentialSportsContract.sol](./examples/sports-contract/contracts/ConfidentialSportsContract.sol)
4. **Watch the Demo**: See [DEMO_INSTRUCTIONS.md](./DEMO_INSTRUCTIONS.md) for video guide

## Resources

- **FHEVM Docs**: https://docs.zama.ai/fhevm
- **fhevmjs**: https://github.com/zama-ai/fhevmjs
- **Ethers.js**: https://docs.ethers.org/v6/
- **Zama**: https://www.zama.ai/

## Support

Need help?

- Check [README.md](./README.md) for detailed documentation
- Review [example code](./examples/nextjs-sports-contract)
- Open an issue on GitHub

## Quick Reference

### Essential Imports

```typescript
// Core
import { FhevmClient } from '@fhevm-sdk/core';
import { encryptInput } from '@fhevm-sdk/core';
import { userDecrypt, batchUserDecrypt } from '@fhevm-sdk/core';

// React
import { FhevmProvider } from '@fhevm-sdk/core';
import { useFhevmClient, useFhevmInit } from '@fhevm-sdk/core';
import { useEncryptedInput, useFhevmContract } from '@fhevm-sdk/core';

// Types
import type { FhevmClientConfig, EncryptedInput } from '@fhevm-sdk/core';
```

### Key Methods

```typescript
// Client
const client = new FhevmClient(config);
await client.init(provider);
const instance = client.getInstance();

// Encryption
const input = encryptInput(instance, contractAddress, userAddress);
input.add32(value);
const encrypted = await input.encrypt();

// Decryption
const decrypted = await userDecrypt(instance, handle, signer, options);
```

---

**You're ready to build confidential dApps with FHEVM!** 🚀

For more information, see the [main README](./README.md) or explore the [examples](./examples/).
