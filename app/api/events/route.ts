
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const upcoming = url.searchParams.get("upcoming") === "true";

    const where = upcoming 
      ? { startTime: { gte: new Date() } } 
      : {};
    
    const events = await prisma.event.findMany({
      where,
      orderBy: { startTime: "asc" },
      take: limit,
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
            user: {
              select: {
                name: true,
                email: true,
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

    // Add computed fields for available spots and user registration status
    const eventsWithAvailability = events.map(event => ({
      ...event,
      availableSpots: event.maxSpots - event._count.registrations,
      isUserRegistered: event.registrations.some(reg => reg.userId === session.user.id)
    }));

    return NextResponse.json({ events: eventsWithAvailability });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (user?.role !== "ORGANIZATION") {
      return NextResponse.json(
        { error: "Only organizations can create events" },
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
    const maxSpots = parseInt(formData.get("maxSpots") as string); // NEW: Handle maxSpots

    const logoFile = formData.get("logo") as File | null;
    let logoUrl = null;
    
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
    
    const event = await prisma.event.create({
      data: {
        title,
        description,
        startTime,
        endTime,
        address,
        logo: logoUrl,
        primaryColor,
        secondaryColor,
        maxSpots, // NEW: Include maxSpots in creation
        organizerId: session.user.id,
      },
    });

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}