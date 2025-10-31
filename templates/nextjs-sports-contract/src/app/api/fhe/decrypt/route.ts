import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { handle, contractAddress, userAddress } = body;

    if (!handle || !contractAddress || !userAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Note: Actual decryption happens on the client side using the SDK
    // This requires user's signature (EIP-712)
    return NextResponse.json({
      success: true,
      message: 'Decryption should be performed client-side using userDecrypt',
      hint: 'Use userDecrypt(instance, handle, signer, { contractAddress, userAddress })',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Decrypt API endpoint',
    usage: 'POST with { handle, contractAddress, userAddress }',
  });
}
