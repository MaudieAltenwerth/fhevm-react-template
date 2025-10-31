# React Basic FHEVM Example

A minimal React application demonstrating the FHEVM SDK with basic encryption operations.

## Overview

This example provides a simple, clean demonstration of:
- MetaMask wallet connection
- FHEVM client initialization
- Number encryption using FHE
- React hooks integration

## Features

- **Simple UI**: Clean, user-friendly interface
- **Wallet Integration**: MetaMask connection with address display
- **FHEVM Initialization**: Automatic initialization with loading states
- **Encryption Demo**: Encrypt numbers using euint32 type
- **Result Display**: Show encrypted handles and input proofs
- **Error Handling**: Comprehensive error messages

## Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **FHEVM SDK**: Framework-agnostic encryption SDK
- **Ethers.js v6**: Ethereum wallet interaction
- **CSS**: Custom styling with gradients

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- Sepolia testnet ETH

### Installation

```bash
# From the react-basic directory
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will open in your browser at the local development server.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage Guide

### Step 1: Connect Wallet

1. Click "Connect MetaMask" button
2. Approve the connection in MetaMask
3. Ensure you're on Sepolia testnet

### Step 2: FHEVM Initialization

The SDK automatically initializes FHEVM after wallet connection:
- Wait for the "FHEVM Initialized Successfully" message
- This may take a few seconds

### Step 3: Encrypt a Number

1. Enter any number between 0 and 4,294,967,295
2. Click "Encrypt Number"
3. View the encrypted result:
   - Original value
   - Encrypted handle(s)
   - Input proof for contract verification

## Code Structure

```
react-basic/
├── src/
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   └── index.css         # Styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies
└── README.md            # This file
```

## Key Components

### App.jsx

Main component structure:

```jsx
function App() {
  return (
    <FhevmProvider config={{ network: { chainId: 11155111 } }}>
      <FhevmDemo />
    </FhevmProvider>
  );
}
```

### FhevmDemo Component

Demonstrates core SDK features:

```jsx
function FhevmDemo() {
  // Hooks
  const client = useFhevmClient();
  const { isInitialized, isLoading, error } = useFhevmInit(provider);
  const { createInput } = useEncryptedInput(contractAddress, userAddress);

  // Wallet connection
  const connectWallet = async () => {
    const provider = new BrowserProvider(window.ethereum);
    // ... connection logic
  };

  // Encryption
  const encryptNumber = async () => {
    const input = createInput();
    input.add32(numberValue);
    const encrypted = await input.encrypt();
    // ... handle result
  };
}
```

## FHEVM SDK Integration

### Provider Setup

Wrap your app with `FhevmProvider`:

```jsx
<FhevmProvider config={{ network: { chainId: 11155111 } }}>
  <YourApp />
</FhevmProvider>
```

### Initialization Hook

Monitor FHEVM initialization status:

```jsx
const { isInitialized, isLoading, error } = useFhevmInit(provider);
```

### Encrypted Input Hook

Create encrypted inputs easily:

```jsx
const { createInput } = useEncryptedInput(contractAddress, userAddress);

const input = createInput();
input.add32(42);        // Add encrypted uint32
input.addBool(true);    // Add encrypted boolean
const result = await input.encrypt();
```

## Supported Encryption Types

- `add8(value)` - euint8 (0-255)
- `add16(value)` - euint16 (0-65535)
- `add32(value)` - euint32 (0-4294967295)
- `add64(value)` - euint64
- `add128(value)` - euint128
- `add256(value)` - euint256
- `addBool(value)` - ebool
- `addAddress(value)` - eaddress

## Customization

### Change Network

Edit the chainId in `App.jsx`:

```jsx
<FhevmProvider
  config={{
    network: {
      chainId: YOUR_CHAIN_ID,
    },
  }}
>
```

### Add More Encryption Types

Modify the `encryptNumber` function:

```jsx
const input = createInput();
input.add32(number);
input.addBool(true);
input.add64(largeNumber);
const encrypted = await input.encrypt();
```

### Styling

All styles are in `src/index.css`. Customize colors, spacing, and layout as needed.

## Common Issues

### MetaMask Not Detected

**Error**: "Please install MetaMask"

**Solution**: Install MetaMask browser extension and reload the page

### FHEVM Initialization Fails

**Error**: "Initialization Error"

**Solutions**:
- Check network connection
- Ensure correct network in MetaMask
- Try refreshing the page

### Encryption Fails

**Error**: "Encryption failed"

**Solutions**:
- Ensure FHEVM is initialized
- Check input value is valid
- Verify contract address is set

## Performance

- **Initial Load**: ~2-3 seconds for FHEVM initialization
- **Encryption**: ~100-500ms per operation
- **Wallet Connection**: Instant (requires user approval)

## Browser Support

- ✅ Chrome/Brave (recommended)
- ✅ Firefox
- ✅ Edge
- ⚠️ Safari (limited Web3 support)

## Next Steps

After trying this basic example:

1. **Explore Next.js Example**: See `examples/nextjs-sports-contract` for a complete application
2. **Read SDK Docs**: Check main README for full API reference
3. **Smart Contracts**: Review `examples/sports-contract` for FHE contract patterns
4. **Build Your App**: Use this as a starting template for your own project

## Learn More

- [FHEVM SDK Documentation](../../README.md)
- [Zama FHEVM Docs](https://docs.zama.ai/fhevm)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## License

MIT
