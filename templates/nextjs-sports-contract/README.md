# Next.js Sports Contract Example

A complete Next.js application demonstrating the FHEVM SDK with a confidential sports contract that manages athlete salaries and team payrolls using Fully Homomorphic Encryption.

## Features

- **Private Athlete Salaries**: Salaries and bonuses are encrypted using FHE
- **Team Management**: Register teams with encrypted salary caps
- **Contract Proposals**: Create and approve contract proposals with encrypted terms
- **Salary Cap Compliance**: Check compliance without revealing individual salaries
- **Encrypted Analytics**: Perform calculations on encrypted payroll data

## Tech Stack

- **Next.js 14**: React framework with App Router
- **FHEVM SDK**: Framework-agnostic SDK for encrypted computations
- **Ethers v6**: Ethereum interaction library
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MetaMask wallet
- Sepolia testnet ETH

### Installation

1. Install dependencies:

```bash
npm install
```

2. Update contract address:

Edit `src/lib/contract.ts` and replace `CONTRACT_ADDRESS` with your deployed contract address.

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Connect Wallet

1. Click "Connect Wallet" button
2. Approve MetaMask connection
3. Ensure you're on Sepolia testnet
4. Wait for FHEVM to initialize

### Register a Team

1. Navigate to "Register Team" tab
2. Fill in team details:
   - Team name
   - League
   - Manager address
   - Salary cap (encrypted)
3. Submit the transaction
4. Confirm in MetaMask

### Register an Athlete

1. Navigate to "Register Athlete" tab
2. Fill in athlete details:
   - Name and position
   - Team ID
   - Athlete address
   - Salary and bonus (encrypted)
   - Contract duration
3. Submit the transaction
4. Confirm in MetaMask

## FHEVM SDK Integration

This example demonstrates key FHEVM SDK features:

### Provider Setup

```typescript
import { FhevmProvider } from '@fhevm-sdk/core';

<FhevmProvider config={{ network: { chainId: 11155111 } }}>
  <App />
</FhevmProvider>
```

### Initialization Hook

```typescript
import { useFhevmInit } from '@fhevm-sdk/core';

const { isInitialized, isLoading, error } = useFhevmInit(provider);
```

### Encrypted Input Creation

```typescript
import { useEncryptedInput } from '@fhevm-sdk/core';

const { createInput } = useEncryptedInput(contractAddress, userAddress);
const input = createInput();
input.add32(salary);
const encrypted = await input.encrypt();
```

### Client Access

```typescript
import { useFhevmClient } from '@fhevm-sdk/core';

const client = useFhevmClient();
const instance = client.getInstance();
```

## Project Structure

```
nextjs-sports-contract/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── WalletConnect.tsx   # Wallet connection
│   │   ├── RegisterTeam.tsx    # Team registration
│   │   └── RegisterAthlete.tsx # Athlete registration
│   └── lib/
│       └── contract.ts         # Contract ABI and config
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Smart Contract Functions

### Team Management

- `registerTeam()`: Register a new team with encrypted salary cap
- `getTeamInfo()`: Get public team information
- `deactivateTeam()`: Deactivate a team

### Athlete Management

- `registerAthlete()`: Register athlete with encrypted salary
- `updateAthleteSalary()`: Update encrypted salary and bonus
- `getAthleteInfo()`: Get public athlete information
- `deactivateAthlete()`: Deactivate an athlete

### Contract Proposals

- `proposeContract()`: Create encrypted contract proposal
- `approveContract()`: Approve and activate proposal
- `getProposalInfo()`: Get proposal details

### Analytics

- `checkSalaryCap()`: Check if team is under salary cap (encrypted)
- `getCurrentStats()`: Get contract statistics

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

## Building for Production

```bash
npm run build
npm start
```

## Learn More

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://github.com/zama-ai/fhevm)

## License

MIT
