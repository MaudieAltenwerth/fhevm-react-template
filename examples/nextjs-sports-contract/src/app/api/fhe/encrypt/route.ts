import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { value, type, contractAddress, userAddress } = body;

    if (!value || !type || !contractAddress || !userAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Note: Actual encryption happens on the client side using the SDK
    // This endpoint is for server-side encryption if needed
    return NextResponse.json({
      success: true,
      message: 'Encryption should be performed client-side using encryptInput',
      hint: 'Use encryptInput(instance, contractAddress, userAddress) in your component',
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
    message: 'Encrypt API endpoint',
    usage: 'POST with { value, type, contractAddress, userAddress }',
  });
}
