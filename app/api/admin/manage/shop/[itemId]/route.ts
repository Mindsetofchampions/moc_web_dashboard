// app/api/admin/manage/shop/[itemId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });
    
    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const itemData = await request.json();
    const itemId = (await params).itemId;

    const item = await prisma.shopItem.update({
      where: { id: itemId },
      data: {
        name: itemData.name,
        description: itemData.description,
        icon: itemData.icon,
        type: itemData.type,
        price: itemData.price,
        attributeBoosts: itemData.attributeBoosts,
        coinBonus: itemData.coinBonus,
        xpBonus: itemData.xpBonus,
        isActive: itemData.isActive,
        isLimited: itemData.isLimited,
        stock: itemData.stock
      }
    });

    return NextResponse.json({ item });
  } catch (error) {
    console.error('Error updating shop item:', error);
    return NextResponse.json({ error: 'Failed to update shop item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });
    
    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const itemId = (await params).itemId;

    await prisma.shopItem.delete({
      where: { id: itemId }
    });

    return NextResponse.json({ message: 'Shop item deleted successfully' });
  } catch (error) {
    console.error('Error deleting shop item:', error);
    return NextResponse.json({ error: 'Failed to delete shop item' }, { status: 500 });
  }
}