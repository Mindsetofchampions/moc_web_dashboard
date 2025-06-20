import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import EventDetails from "@/components/events/EventDetails";
import { redirect } from "next/navigation";

export default async function EventDetailsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    return redirect("/sign-in");
  }
  
  // Fetch the event
  // const event = await prisma.event.findUnique({
  //   where: { id: params.id },
  //   include: { organizer: { select: { name: true, email: true } } }
  // });

  const event = await prisma.event.findUnique({
  where: { id: params.id },
  include: { 
    organizer: { select: { name: true, email: true } },
    registrations: {
      select: {
        id: true,
        userId: true,
        user: { select: { name: true, email: true, image: true } }
      }
    },
    _count: { select: { registrations: true } }
  }
});
  
  if (!event) {
    notFound();
  }
  
  return <EventDetails event={event} />;
}

