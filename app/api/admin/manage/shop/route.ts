// app/api/admin/manage/shop/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
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

    const shopItems = await prisma.shopItem.findMany({
      include: {
        _count: {
          select: {
            purchases: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ items: shopItems });
  } catch (error) {
    console.error('Error fetching shop items:', error);
    return NextResponse.json({ error: 'Failed to fetch shop items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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

    const shopItem = await prisma.shopItem.create({
      data: {
        name: itemData.name,
        description: itemData.description,
        icon: itemData.icon,
        type: itemData.type,
        price: itemData.price,
        attributeBoosts: itemData.attributeBoosts,
        coinBonus: itemData.coinBonus,
        xpBonus: itemData.xpBonus,
        isActive: itemData.isActive !== false,
        isLimited: itemData.isLimited || false,
        stock: itemData.stock
      }
    });

    return NextResponse.json({ item: shopItem }, { status: 201 });
  } catch (error) {
    console.error('Error creating shop item:', error);
    return NextResponse.json({ error: 'Failed to create shop item' }, { status: 500 });
  }
}