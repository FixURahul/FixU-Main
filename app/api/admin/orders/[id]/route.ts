// import { NextRequest, NextResponse } from 'next/server'
// import { verifyToken, getTokenFromRequest } from '@/lib/auth'
// import connectDB from '@/lib/db'
// import User from '@/models/User'

// // Update an order
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = getTokenFromRequest(request)
//     if (!token) {
//       return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
//     }

//     const payload = await verifyToken(token)
//     if (!payload || typeof payload === 'string' || !('userId' in payload)) {
//       return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
//     }

//     // Get the updated order data from the request
//     const { status, scheduledDate, serviceProvider, price } = await request.json()

//     await connectDB()

//     // Get the order ID from the URL parameter
//     const orderId = params.id

//     // Find the user with this order
//     const user = await User.findOne({ 'orders._id': orderId })
//     if (!user) {
//       return NextResponse.json({ error: 'Order not found' }, { status: 404 })
//     }

//     // Find the order index
//     const orderIndex = user.orders.findIndex(
//       (order: any) => order._id.toString() === orderId
//     )

//     if (orderIndex === -1) {
//       return NextResponse.json({ error: 'Order not found' }, { status: 404 })
//     }

//     // Update the order fields if provided
//     if (status) user.orders[orderIndex].status = status
//     if (scheduledDate) user.orders[orderIndex].scheduledDate = new Date(scheduledDate)
//     if (serviceProvider) user.orders[orderIndex].serviceProvider = serviceProvider
//     if (price) user.orders[orderIndex].price = price

//     await user.save()

//     // Type assertion for the order object
//     const updatedOrder = user.orders[orderIndex] as unknown as {
//       _id: { toString(): string };
//       status: string;
//       scheduledDate: Date;
//       serviceProvider: string;
//       price: number;
//     };

//     return NextResponse.json({
//       success: true,
//       message: 'Order updated successfully',
//       order: {
//         id: updatedOrder._id.toString(),
//         status: updatedOrder.status,
//         scheduledDate: updatedOrder.scheduledDate,
//         serviceProvider: updatedOrder.serviceProvider,
//         price: updatedOrder.price
//       }
//     })
//   } catch (error) {
//     console.error('Error updating order:', error)
//     return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
//   }
// }

import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'
import connectDB from '@/lib/db'
import User from '@/models/User'

export async function PUT(request: NextRequest) {
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

    // Get the order ID from the request URL
    const orderId = request.nextUrl.pathname.split('/').pop()
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID missing in URL' }, { status: 400 })
    }

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
