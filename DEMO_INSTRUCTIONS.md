# Demo Video Instructions

## Creating demo.mp4

To create the demonstration video for this FHEVM SDK submission, record the following workflow:

### Video Structure (3-5 minutes)

#### 1. Introduction (30 seconds)
- Show the project structure in file explorer
- Highlight the SDK package and examples folder
- Briefly explain the universal FHEVM SDK concept

#### 2. SDK Overview (1 minute)
- Open `packages/fhevm-sdk/src/index.ts`
- Show the main exports: FhevmClient, encryption/decryption utilities, React hooks
- Highlight the framework-agnostic design
- Show the `client.ts`, `encrypt.ts`, `decrypt.ts` files

#### 3. Next.js Example Demo (2-3 minutes)
- Navigate to `examples/nextjs-sports-contract`
- Run `npm run dev` in terminal
- Open browser to `http://localhost:3000`
- Show the application interface

**Demonstrate these features:**

a. **Wallet Connection**
   - Click "Connect Wallet"
   - Show MetaMask popup
   - Approve connection
   - Show FHEVM initialization message

b. **Register Team**
   - Navigate to "Register Team" tab
   - Fill in form:
     - Team Name: "Phoenix Suns"
     - League: "NBA"
     - Manager Address: (your test address)
     - Salary Cap: 150000000
   - Submit transaction
   - Show success message

c. **Register Athlete**
   - Navigate to "Register Athlete" tab
   - Fill in form:
     - Name: "Kevin Durant"
     - Position: "Forward"
     - Team ID: 1
     - Athlete Address: (test address)
     - Salary: 50000000 (encrypted)
     - Bonus: 5000000 (encrypted)
     - Duration: 12 months
   - Submit transaction
   - Show success message

d. **Code Integration**
   - Open `src/app/page.tsx` in editor
   - Show FhevmProvider wrapper
   - Show useFhevmInit hook
   - Open `src/components/RegisterAthlete.tsx`
   - Show useEncryptedInput hook usage
   - Highlight the encrypted input creation

#### 4. SDK Features Highlight (30 seconds)
- Show terminal with `packages/fhevm-sdk/src/` structure
- List key features:
  - Framework-agnostic core
  - React hooks for easy integration
  - Wagmi-like API design
  - Type-safe TypeScript
  - Encryption/decryption utilities

#### 5. Contract Integration (30 seconds)
- Show `examples/sports-contract/contracts/ConfidentialSportsContract.sol`
- Highlight FHE types: euint32, ebool
- Show encrypted salary and bonus fields
- Mention privacy-preserving computations

#### 6. Conclusion (30 seconds)
- Summarize the SDK benefits:
  - Easy integration with any framework
  - Complete encryption/decryption workflow
  - React hooks for common patterns
  - Real-world sports contract example
- Show project README

### Recording Tips

1. **Screen Resolution**: Use 1920x1080 for clarity
2. **Audio**: Use a good microphone, speak clearly
3. **Cursor**: Enable cursor highlighting
4. **Pace**: Speak slowly and pause between sections
5. **Editing**: Cut out errors and long waits
6. **Background**: Close unnecessary applications
7. **Browser**: Use Chrome/Brave for best Web3 support

### Required Software

- **Screen Recorder**: OBS Studio, Camtasia, or similar
- **Video Editor**: DaVinci Resolve, Adobe Premiere, or similar
- **Audio**: Audacity for audio editing if needed

### File Specifications

- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 minimum
- **Frame Rate**: 30fps minimum
- **Audio**: AAC codec, 128kbps minimum
- **File Size**: Keep under 100MB if possible (use compression)
- **Duration**: 3-5 minutes

### Export Settings

For OBS Studio:
```
Encoder: x264
Rate Control: CBR
Bitrate: 5000 Kbps
Keyframe Interval: 2
Preset: veryfast
Profile: high
```

For FFmpeg compression:
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k demo.mp4
```

### Voiceover Script Template

```
"Welcome to the FHEVM SDK demonstration. This is a universal, framework-agnostic SDK for building confidential dApps with Fully Homomorphic Encryption.

The SDK provides a simple, wagmi-like API that works with React, Next.js, Vue, or any JavaScript framework.

Let me show you the core SDK structure. Here we have the FhevmClient for managing FHEVM instances, encryption utilities for creating encrypted inputs, and decryption utilities for retrieving values.

For React developers, we provide hooks like useFhevmInit, useFhevmClient, and useEncryptedInput for seamless integration.

Now let's see a real-world example. This Next.js application demonstrates a confidential sports contract where athlete salaries are encrypted using FHE.

First, I'll connect my wallet... and wait for FHEVM to initialize.

Now I can register a team with an encrypted salary cap. I'll fill in the team details and submit the transaction.

Next, let's register an athlete with encrypted salary and bonus. Notice how the SDK's useEncryptedInput hook makes it easy to create encrypted inputs.

Looking at the code, you can see how simple the integration is. We wrap the app with FhevmProvider, use the initialization hook, and create encrypted inputs with just a few lines.

The smart contract uses FHE types like euint32 for encrypted values, enabling privacy-preserving computations on sensitive salary data.

This FHEVM SDK makes it easy to build confidential dApps with just a few hooks and utilities. Thank you for watching!"
```

## After Recording

1. Save the video as `demo.mp4`
2. Place it in the root of `fhevm-react-template/` directory
3. Verify the file size and quality
4. Test playback on different devices
5. Upload to GitHub with the submission

## Alternative: Video Placeholder

If you cannot record a video immediately, include a `demo.mp4` placeholder file with instructions to create the actual video before final submission.
