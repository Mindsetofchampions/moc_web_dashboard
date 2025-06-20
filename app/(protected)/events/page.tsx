import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import EventList from "@/components/events/EventList";
import Link from "next/link";
import { redirect } from 'next/navigation';

export default async function EventsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    return redirect("/sign-in"); 
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  const events = await prisma.event.findMany({
    orderBy: { startTime: 'asc' },
    where: { startTime: { gte: new Date() } }, 
    include: { organizer: { select: { name: true } } }
  });
  
  const isOrganization = user?.role === 'ORGANIZATION';
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white"></h1>
        {isOrganization && (
          <Link 
            href="/events/create" 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
          >
            Create Event
          </Link>
        )}
      </div>
      
      <EventList events={events} />
    </div>
  );
}