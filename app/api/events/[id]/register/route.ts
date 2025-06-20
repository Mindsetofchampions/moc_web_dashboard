// api/events/[id]/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a volunteer
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, name: true, email: true },
    });

    if (user?.role !== "VOLUNTEER") {
      return NextResponse.json(
        { error: "Only volunteers can register for events" },
        { status: 403 }
      );
    }

    // Check if event exists and get current registration count
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            registrations: true
          }
        },
        registrations: {
          where: {
            userId: session.user.id
          }
        }
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if event is in the past
    if (new Date(event.startTime) < new Date()) {
      return NextResponse.json(
        { error: "Cannot register for past events" },
        { status: 400 }
      );
    }

    // Check if user is already registered
    if (event.registrations.length > 0) {
      return NextResponse.json(
        { error: "You are already registered for this event" },
        { status: 400 }
      );
    }

    // Check if event is full
    if (event._count.registrations >= event.maxSpots) {
      return NextResponse.json(
        { error: "Event is full" },
        { status: 400 }
      );
    }

    // Create registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: params.id,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        },
        event: {
          select: {
            title: true,
          }
        }
      }
    });

    return NextResponse.json({ 
      registration,
      message: "Successfully registered for event!"
    });
  } catch (error) {
    console.error("Error registering for event:", error);
    return NextResponse.json(
      { error: "Failed to register for event" },
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

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if event is in the past
    if (new Date(event.startTime) < new Date()) {
      return NextResponse.json(
        { error: "Cannot unregister from past events" },
        { status: 400 }
      );
    }

    // Find and delete registration
    const registration = await prisma.eventRegistration.findFirst({
      where: {
        eventId: params.id,
        userId: session.user.id,
      },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "You are not registered for this event" },
        { status: 400 }
      );
    }

    await prisma.eventRegistration.delete({
      where: {
        id: registration.id,
      },
    });

    return NextResponse.json({ 
      message: "Successfully unregistered from event"
    });
  } catch (error) {
    console.error("Error unregistering from event:", error);
    return NextResponse.json(
      { error: "Failed to unregister from event" },
      { status: 500 }
    );
  }
}