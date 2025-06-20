import React from 'react';
import EventCard from './EventCard';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  address: string;
  logo?: string | null;
  primaryColor?: string | null;
  organizer: {
    name: string | null;
  };
}

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-400">No events found. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}