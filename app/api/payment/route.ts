import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { getCashfreePaymentLink, verifyCashfreePayment } from '@/lib/cashfree';

// Get Cashfree payment link
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded || typeof decoded === 'string' || !('userId' in decoded)) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get order data from the request
    const { amount, orderId, customerName, customerEmail, customerPhone } = await request.json();
    
    // Get the hosted payment link
    const paymentLink = getCashfreePaymentLink(
      amount, 
      orderId,
      customerName,
      customerEmail,
      customerPhone
    );

    return NextResponse.json({
      success: true,
      paymentLink
    });
  } catch (error) {
    console.error('Error creating payment link:', error);
    return NextResponse.json({ error: 'Failed to create payment link' }, { status: 500 });
  }
}

// Verify payment
export async function PUT(request: NextRequest) {
  try {
    const { referenceId, orderId } = await request.json();

    // Simplified verification since we're using hosted page
    const isAuthentic = await verifyCashfreePayment(referenceId);

    if (isAuthentic) {
      return NextResponse.json({
        success: true,
        message: 'Payment recorded successfully',
        orderId
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid payment reference'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: 'Error verifying payment' }, { status: 500 });
  }
}
