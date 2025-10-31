import { useState } from 'react';
import { BrowserProvider } from 'ethers';
import { FhevmProvider, useFhevmClient, useFhevmInit, useEncryptedInput } from '@fhevm-sdk/core';

// Demo contract address (replace with your deployed contract)
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000';

function FhevmDemo() {
  const [provider, setProvider] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [encryptedValue, setEncryptedValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const client = useFhevmClient();
  const { isInitialized, isLoading, error } = useFhevmInit(provider);
  const { createInput } = useEncryptedInput(CONTRACT_ADDRESS, userAddress);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to use this application');
        return;
      }

      const web3Provider = new BrowserProvider(window.ethereum);
      await web3Provider.send('eth_requestAccounts', []);
      const signer = await web3Provider.getSigner();
      const address = await signer.getAddress();

      setProvider(web3Provider);
      setUserAddress(address);
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      alert('Failed to connect wallet: ' + err.message);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setUserAddress('');
    setEncryptedValue(null);
  };

  const encryptNumber = async () => {
    if (!inputValue || !isInitialized) {
      alert('Please enter a value and ensure FHEVM is initialized');
      return;
    }

    try {
      const input = createInput();
      const numValue = parseInt(inputValue);

      if (isNaN(numValue)) {
        alert('Please enter a valid number');
        return;
      }

      // Add the value as encrypted uint32
      input.add32(numValue);

      // Encrypt the input
      const encrypted = await input.encrypt();

      setEncryptedValue({
        original: numValue,
        encrypted: encrypted,
        handles: encrypted.handles,
        proof: encrypted.inputProof,
      });
    } catch (err) {
      console.error('Encryption failed:', err);
      alert('Encryption failed: ' + err.message);
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🔐 FHEVM SDK Basic Example</h1>
        <p>
          A minimal React application demonstrating the FHEVM SDK for encrypted computations.
          This example shows wallet connection, FHEVM initialization, and basic encryption operations.
        </p>
      </div>

      <div className="card">
        <h2>Step 1: Connect Wallet</h2>
        {!provider ? (
          <>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Connect your MetaMask wallet to get started with encrypted operations.
            </p>
            <button className="button" onClick={connectWallet}>
              Connect MetaMask
            </button>
          </>
        ) : (
          <>
            <div className="status success">
              ✓ Wallet Connected: {formatAddress(userAddress)}
            </div>
            <div className="address">
              <strong>Full Address:</strong><br />
              {userAddress}
            </div>
            <button className="button secondary" onClick={disconnectWallet}>
              Disconnect Wallet
            </button>
          </>
        )}
      </div>

      {provider && (
        <div className="card">
          <h2>Step 2: Initialize FHEVM</h2>
          {isLoading && (
            <div className="status loading">
              ⏳ Initializing FHEVM... This may take a few seconds.
            </div>
          )}
          {error && (
            <div className="status error">
              ✗ Initialization Error: {error.message}
            </div>
          )}
          {isInitialized && (
            <div className="status success">
              ✓ FHEVM Initialized Successfully
            </div>
          )}
        </div>
      )}

      {isInitialized && (
        <div className="card">
          <h2>Step 3: Encrypt a Number</h2>
          <p style={{ marginBottom: '15px', color: '#666' }}>
            Enter a number to encrypt using Fully Homomorphic Encryption (FHE).
            The encrypted value can be used in smart contract computations without revealing the original number.
          </p>

          <div className="input-group">
            <label htmlFor="numberInput">Enter a Number (0-4294967295):</label>
            <input
              id="numberInput"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g., 42"
              min="0"
              max="4294967295"
            />
          </div>

          <button
            className="button"
            onClick={encryptNumber}
            disabled={!inputValue}
          >
            Encrypt Number
          </button>

          {encryptedValue && (
            <div className="result">
              <h3>Encryption Result:</h3>
              <p><strong>Original Value:</strong> {encryptedValue.original}</p>
              <p><strong>Encrypted Handles:</strong></p>
              <div className="address">
                {encryptedValue.handles.map((handle, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>
                    Handle {index}: {handle.toString()}
                  </div>
                ))}
              </div>
              <p><strong>Input Proof (for contract verification):</strong></p>
              <div className="address" style={{ fontSize: '12px' }}>
                {encryptedValue.proof}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card">
        <h2>About This Example</h2>
        <ul className="feature-list">
          <li>Framework-agnostic FHEVM SDK</li>
          <li>React hooks for easy integration</li>
          <li>MetaMask wallet connection</li>
          <li>Automatic FHEVM initialization</li>
          <li>Type-safe encryption operations</li>
          <li>Support for euint8, euint16, euint32, euint64, and more</li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <FhevmProvider
      config={{
        network: {
          chainId: 11155111, // Sepolia testnet
        },
      }}
    >
      <FhevmDemo />
    </FhevmProvider>
  );
}

export default App;
