
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        organizer: {
          select: {
            name: true,
            email: true,
          },
        },
        registrations: {
          select: {
            id: true,
            userId: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                email: true,
                image: true,
              }
            }
          }
        },
        _count: {
          select: {
            registrations: true
          }
        }
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Add computed fields
    const eventWithAvailability = {
      ...event,
      availableSpots: event.maxSpots - event._count.registrations,
      isUserRegistered: event.registrations.some(reg => reg.userId === session.user.id),
      registeredCount: event._count.registrations
    };

    return NextResponse.json({ event: eventWithAvailability });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: params.id },
      select: { organizerId: true },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (
      existingEvent.organizerId !== session.user.id &&
      user?.role !== "ADMIN"
    ) {
      return NextResponse.json(
        { error: "You don't have permission to update this event" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startTime = new Date(formData.get("startTime") as string);
    const endTime = new Date(formData.get("endTime") as string);
    const address = formData.get("address") as string;
    const primaryColor = formData.get("primaryColor") as string;
    const secondaryColor = formData.get("secondaryColor") as string;
    const maxSpots = parseInt(formData.get("maxSpots") as string || "0"); // NEW: Handle maxSpots
    
    const logoFile = formData.get("logo") as File | null;
    let logoUrl = undefined;
    
    if (logoFile) {
      try {
        const buffer = await logoFile.arrayBuffer();
        
        const s3Client = new S3Client({
          region: process.env.AWS_REGION!,
          credentials: {
            accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
          },
        });
        
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: `event-logos/${session.user.id}/${Date.now()}_${logoFile.name}`,
          Body: Buffer.from(buffer),
          ContentType: logoFile.type,
        };
        
        await s3Client.send(new PutObjectCommand(uploadParams));
        
        logoUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      } catch (error) {
        console.error("Error uploading logo to S3:", error);
        return NextResponse.json(
          { error: "Failed to upload logo image" },
          { status: 500 }
        );
      }
    }

    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        title,
        description,
        startTime,
        endTime,
        address,
        primaryColor,
        secondaryColor,
        maxSpots, // NEW: Include maxSpots in update
        ...(logoUrl && { logo: logoUrl }), 
      },
    });

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: params.id },
      select: { organizerId: true },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (
      existingEvent.organizerId !== session.user.id &&
      user?.role !== "ADMIN"
    ) {
      return NextResponse.json(
        { error: "You don't have permission to delete this event" },
        { status: 403 }
      );
    }

    await prisma.event.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}