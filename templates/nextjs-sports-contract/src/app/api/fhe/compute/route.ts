import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, operands } = body;

    if (!operation || !operands) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Note: Homomorphic computations happen on-chain in smart contracts
    return NextResponse.json({
      success: true,
      message: 'Homomorphic computations are performed on-chain',
      hint: 'Use FHE.add(), FHE.mul(), FHE.lt(), etc. in your Solidity contracts',
      supportedOperations: [
        'add', 'sub', 'mul', 'div',
        'lt', 'lte', 'gt', 'gte', 'eq', 'ne',
        'and', 'or', 'xor', 'not',
        'min', 'max', 'select',
      ],
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
    message: 'Compute API endpoint',
    usage: 'Homomorphic operations are performed on-chain',
  });
}
