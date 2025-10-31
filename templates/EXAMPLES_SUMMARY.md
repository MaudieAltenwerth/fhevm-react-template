# Examples Directory Summary

This document describes the example applications included in the FHEVM SDK repository.

## Overview

The `examples/` directory contains three complete examples demonstrating different aspects of the FHEVM SDK:

1. **react-basic** - Minimal React application with basic encryption
2. **nextjs-sports-contract** - Complete Next.js application with sports contract
3. **sports-contract** - Solidity smart contract with FHE operations

---

## 1. React Basic Example

**Path**: `examples/react-basic/`

### Description
A minimal React application demonstrating the core FHEVM SDK features with a clean, simple interface.

### Features
- MetaMask wallet connection
- FHEVM client initialization
- Number encryption using euint32
- Display encrypted handles and proofs
- Error handling and loading states

### Technology Stack
- React 18 with hooks
- Vite for fast development
- FHEVM SDK with React hooks
- Ethers.js v6
- Custom CSS styling

### Key Files
```
react-basic/
├── src/
│   ├── App.jsx           # Main component with FHEVM integration
│   ├── main.jsx          # React entry point
│   └── index.css         # Styles with gradients
├── index.html            # HTML template
├── vite.config.js        # Vite configuration with polyfills
├── package.json          # Dependencies and scripts
└── README.md            # Detailed documentation
```

### Quick Start
```bash
cd examples/react-basic
npm install
npm run dev
```

### What It Demonstrates
- **FhevmProvider** usage for context
- **useFhevmClient** hook for client access
- **useFhevmInit** hook for initialization
- **useEncryptedInput** hook for creating encrypted inputs
- Basic wallet integration patterns
- Error handling best practices

### Use Case
Perfect starting point for developers new to FHEVM SDK who want to understand the basics before building complex applications.

---

## 2. Next.js Sports Contract Example

**Path**: `examples/nextjs-sports-contract/`

### Description
A complete Next.js 14 application showcasing a real-world use case: confidential sports contract management with encrypted athlete salaries.

### Features
- Full team management system
- Athlete registration with encrypted salaries
- Contract proposal workflow
- Salary cap compliance checking
- Modern UI with Tailwind CSS
- Server and client components

### Technology Stack
- Next.js 14 with App Router
- React 18
- FHEVM SDK with all hooks
- Ethers.js v6
- Tailwind CSS for styling
- TypeScript for type safety

### Key Files
```
nextjs-sports-contract/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with provider
│   │   ├── page.tsx          # Main page with tabs
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── WalletConnect.tsx     # Wallet connection
│   │   ├── RegisterTeam.tsx      # Team registration
│   │   └── RegisterAthlete.tsx   # Athlete registration
│   └── lib/
│       └── contract.ts           # Contract ABI and config
├── package.json              # Dependencies
├── tsconfig.json            # TypeScript config
├── next.config.js           # Next.js config with webpack
├── tailwind.config.ts       # Tailwind configuration
└── README.md               # Complete documentation
```

### Quick Start
```bash
cd examples/nextjs-sports-contract
npm install
npm run dev
```

### What It Demonstrates
- **Complete application architecture** with FHEVM
- **Multiple components** using SDK hooks
- **Real-world workflows** (registration, proposals, approval)
- **Smart contract integration** with encrypted operations
- **Type-safe development** with TypeScript
- **Modern UI/UX** patterns

### Use Case
Production-ready example showing how to build a complete confidential application using FHEVM SDK in a Next.js environment.

---

## 3. Sports Contract (Solidity)

**Path**: `examples/sports-contract/`

### Description
A Solidity smart contract demonstrating advanced FHE operations for managing confidential athlete salaries and team payrolls.

### Features
- Encrypted salary storage (euint32)
- Encrypted bonus amounts
- Encrypted salary caps
- Privacy-preserving payroll calculations
- Encrypted salary cap compliance checks
- Role-based access control
- Contract proposal system

### Technology Stack
- Solidity ^0.8.24
- Hardhat development environment
- FHE library (fhevmjs)
- EIP-712 for signatures

### Key Files
```
sports-contract/
├── contracts/
│   └── ConfidentialSportsContract.sol  # Main contract (382 lines)
├── scripts/
│   └── deploy.js                       # Deployment script
├── hardhat.config.js                   # Hardhat configuration
├── package.json                        # Dependencies
├── .env.example                        # Environment template
└── README.md                          # Contract documentation
```

### Contract Structure

#### Data Structures
- **Athlete**: Name, position, encrypted salary/bonus, contract dates
- **Team**: Name, league, encrypted payroll/cap, athlete roster
- **ContractProposal**: Encrypted salary offers, approval status

#### Key Functions
- `registerTeam()` - Create team with encrypted cap
- `registerAthlete()` - Add athlete with encrypted compensation
- `proposeContract()` - Submit encrypted offer
- `approveContract()` - Athlete approves proposal
- `checkSalaryCap()` - Verify compliance (encrypted comparison)
- `updateAthleteSalary()` - Modify encrypted compensation

#### FHE Operations
```solidity
// Encryption
euint32 encrypted = FHE.asEuint32(value);

// Addition
euint32 total = FHE.add(salary, bonus);

// Comparison
ebool isValid = FHE.le(payroll, cap);

// Permissions
FHE.allowThis(encrypted);
FHE.allow(encrypted, userAddress);
```

### Quick Start
```bash
cd examples/sports-contract
npm install
npm run compile
npm run deploy:sepolia
```

### What It Demonstrates
- **FHE type usage** (euint32, ebool)
- **Encrypted arithmetic** operations
- **Encrypted comparisons** for compliance
- **Permission management** with FHE.allow()
- **Access control** patterns
- **Event emission** for transparency

### Use Case
Reference implementation for developers building FHE-enabled smart contracts, showing best practices for encrypted data management.

---

## Integration Between Examples

### How They Work Together

1. **Contract** (`sports-contract/`)
   - Provides the blockchain backend
   - Handles encrypted data storage
   - Performs privacy-preserving computations

2. **Frontend** (`nextjs-sports-contract/` or `react-basic/`)
   - Uses FHEVM SDK to interact with contract
   - Encrypts data before sending to blockchain
   - Decrypts data for authorized users

3. **SDK** (`packages/fhevm-sdk/`)
   - Bridges frontend and contract
   - Provides encryption/decryption utilities
   - Offers React hooks for easy integration

### Data Flow

```
User Input → Frontend (React/Next.js)
    ↓
SDK Encryption (useEncryptedInput)
    ↓
Encrypted Data → Smart Contract
    ↓
FHE Operations (add, compare, etc.)
    ↓
Encrypted Result ← Smart Contract
    ↓
SDK Decryption (userDecrypt)
    ↓
Plaintext Result → User Display
```

---

## Comparison Matrix

| Feature | react-basic | nextjs-sports | sports-contract |
|---------|-------------|---------------|-----------------|
| **Complexity** | Simple | Advanced | Intermediate |
| **Purpose** | Learning | Production | Smart Contract |
| **Framework** | React + Vite | Next.js 14 | Solidity |
| **UI** | Basic CSS | Tailwind CSS | N/A |
| **Features** | 1 (encrypt) | 5+ | 20+ functions |
| **Lines of Code** | ~300 | ~600 | ~400 |
| **TypeScript** | No | Yes | N/A |
| **Best For** | Beginners | Full apps | Contract devs |

---

## Getting Started with Examples

### For Beginners

1. Start with **react-basic**
   - Understand wallet connection
   - Learn FHEVM initialization
   - Practice encryption operations

2. Move to **sports-contract**
   - Study the Solidity code
   - Understand FHE types
   - Learn permission patterns

3. Explore **nextjs-sports-contract**
   - See complete application
   - Study component architecture
   - Learn production patterns

### For Experienced Developers

1. Review **sports-contract** for contract patterns
2. Check **nextjs-sports-contract** for frontend integration
3. Use **react-basic** as a quick reference

---

## Running All Examples

### Install Dependencies

From repository root:
```bash
npm install
```

This installs SDK and all example dependencies.

### Build SDK

```bash
npm run build:sdk
```

### Run Examples

**React Basic:**
```bash
cd examples/react-basic
npm run dev
```

**Next.js Sports:**
```bash
cd examples/nextjs-sports-contract
npm run dev
```

**Deploy Contract:**
```bash
cd examples/sports-contract
npm run deploy:sepolia
```

---

## Additional Resources

### Documentation
- [Main README](../README.md) - SDK documentation
- [Getting Started Guide](../GETTING_STARTED.md) - Setup instructions
- [Demo Instructions](../DEMO_INSTRUCTIONS.md) - Video recording guide

### External Links
- [Zama FHEVM Docs](https://docs.zama.ai/fhevm)
- [fhevmjs Library](https://github.com/zama-ai/fhevmjs)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Hardhat Documentation](https://hardhat.org/docs)

---

## Contributing

To add a new example:

1. Create new directory in `examples/`
2. Add README.md with clear documentation
3. Include package.json with dependencies
4. Add .gitignore for build artifacts
5. Ensure all code follows existing patterns
6. Update this EXAMPLES_SUMMARY.md

---

## License

All examples are licensed under MIT License.

---

**Last Updated**: 2025-10-29

**Total Examples**: 3 (React Basic, Next.js Sports, Sports Contract)

**Total Lines of Code**: ~1300+ lines across all examples
