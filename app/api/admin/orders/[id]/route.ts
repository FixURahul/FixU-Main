import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'
import connectDB from '@/lib/db'
import User from '@/models/User'

// Updated PUT function with correct type signature
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload || typeof payload === 'string' || !('userId' in payload)) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { status, scheduledDate, serviceProvider, price } = await request.json()

    await connectDB()

    // Get the order ID from the URL params instead of parsing the URL
    const orderId = params.id

    const user = await User.findOne({ 'orders._id': orderId })
    if (!user) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const orderIndex = user.orders.findIndex(
      (order: any) => order._id.toString() === orderId
    )

    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (status) user.orders[orderIndex].status = status
    if (scheduledDate) user.orders[orderIndex].scheduledDate = new Date(scheduledDate)
    if (serviceProvider) user.orders[orderIndex].serviceProvider = serviceProvider
    if (price) user.orders[orderIndex].price = price

    await user.save()

    const updatedOrder = user.orders[orderIndex] as {
      _id: { toString(): string };
      status: string;
      scheduledDate: Date;
      serviceProvider: string;
      price: number;
    }

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      order: {
        id: updatedOrder._id.toString(),
        status: updatedOrder.status,
        scheduledDate: updatedOrder.scheduledDate,
        serviceProvider: updatedOrder.serviceProvider,
        price: updatedOrder.price
      }
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

// Add GET and DELETE handlers with correct type signatures if needed
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authentication and fetching logic
    // ...
    return NextResponse.json({ /* order data */ })
  } catch (error) {
    console.error('Error getting order:', error)
    return NextResponse.json({ error: 'Failed to get order' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authentication and deletion logic
    // ...
    return NextResponse.json({ /* response data */ })
  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}
