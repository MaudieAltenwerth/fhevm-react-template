'use client';

import React from 'react';
import { FhevmProvider as CoreFhevmProvider } from '@fhevm-sdk/core';

interface FHEProviderProps {
  children: React.ReactNode;
  chainId?: number;
}

export default function FHEProvider({ children, chainId = 11155111 }: FHEProviderProps) {
  return (
    <CoreFhevmProvider
      config={{
        network: {
          chainId,
        },
      }}
    >
      {children}
    </CoreFhevmProvider>
  );
}
