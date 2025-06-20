import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import EventForm from "@/components/events/EventForm";

export default async function CreateEventPage() {
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
  
  if (user?.role !== 'ORGANIZATION') {
    redirect('/events');
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Create New Event</h1>
      <EventForm userId={session.user.id} />
    </div>
  );
}