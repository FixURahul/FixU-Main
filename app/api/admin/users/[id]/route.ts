// import { NextRequest, NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import { verifyToken, getTokenFromRequest } from '@/lib/auth';
// import connectDB from '@/lib/db';
// import User from '@/models/User';

// // Get a specific user
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = getTokenFromRequest(request);
//     if (!token) {
//       return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
//     }

//     const payload = await verifyToken(token);
//     if (!payload || typeof payload === 'string' || !payload.isAdmin) {
//       return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
//     }

//     await connectDB();

//     const user = await User.findById(params.id).select('name email phone isAdmin createdAt') as {
//       _id: mongoose.Types.ObjectId,
//       name: string,
//       email: string,
//       phone?: string,
//       isAdmin?: boolean,
//       createdAt: Date
//     } | null;

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       user: {
//         id: (user._id as mongoose.Types.ObjectId).toString(),
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         isAdmin: user.isAdmin || false,
//         createdAt: user.createdAt
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
//   }
// }

// // Update a user
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = getTokenFromRequest(request);
//     if (!token) {
//       return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
//     }

//     const payload = await verifyToken(token);
//     if (!payload || typeof payload === 'string' || !payload.isAdmin) {
//       return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
//     }

//     const { name, email, password, phone, isAdmin } = await request.json();

//     await connectDB();

//     const user = await User.findById(params.id);
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     user.name = name;
//     user.email = email;
//     if (password) {
//       user.password = password; 
//     }
//     user.phone = phone;
//     user.isAdmin = isAdmin || false;

//     await user.save();

//     return NextResponse.json({
//       success: true,
//       user: {
//         id: (user._id as mongoose.Types.ObjectId).toString(),
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         isAdmin: user.isAdmin
//       }
//     });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
//   }
// }

// // Delete a user
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = getTokenFromRequest(request);
//     if (!token) {
//       return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
//     }

//     const payload = await verifyToken(token);
//     if (!payload || typeof payload === 'string' || !payload.isAdmin) {
//       return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
//     }

//     await connectDB();

//     if (params.id === payload.userId) {
//       return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
//     }

//     const result = await User.findByIdAndDelete(params.id);
//     if (!result) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'User deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'
import connectDB from '@/lib/db'
import User from '@/models/User'

// Helper to extract ID from the URL
function extractIdFromRequest(req: NextRequest): string | null {
  const url = new URL(req.url)
  const segments = url.pathname.split('/')
  return segments[segments.length - 1] || null
}

// GET a specific user
export async function GET(request: NextRequest) {
  const id = extractIdFromRequest(request)
  if (!id) return NextResponse.json({ error: 'Missing user ID' }, { status: 400 })

  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload || typeof payload === 'string' || !payload.isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    await connectDB()

    const user = await User.findById(id).select('name email phone isAdmin createdAt')
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: (user._id as mongoose.Types.ObjectId).toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin || false,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

// PUT (Update) a user
export async function PUT(request: NextRequest) {
  const id = extractIdFromRequest(request)
  if (!id) return NextResponse.json({ error: 'Missing user ID' }, { status: 400 })

  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload || typeof payload === 'string' || !payload.isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { name, email, password, phone, isAdmin } = await request.json()

    await connectDB()

    const user = await User.findById(id)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    user.name = name
    user.email = email
    if (password) {
      user.password = password
    }
    user.phone = phone
    user.isAdmin = isAdmin || false

    await user.save()

    return NextResponse.json({
      success: true,
      user: {
        id: (user._id as mongoose.Types.ObjectId).toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      },
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

// DELETE a user
export async function DELETE(request: NextRequest) {
  const id = extractIdFromRequest(request)
  if (!id) return NextResponse.json({ error: 'Missing user ID' }, { status: 400 })

  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload || typeof payload === 'string' || !payload.isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    await connectDB()

    if (id === payload.userId) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
    }

    const result = await User.findByIdAndDelete(id)
    if (!result) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
