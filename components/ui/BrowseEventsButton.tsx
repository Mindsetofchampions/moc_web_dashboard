
"use client"

import Link from 'next/link';

const BrowseEventsButton = () => {
  return (
    <Link 
      href="/events" 
      className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
    >
      Browse Events
    </Link>
  );
};

export default BrowseEventsButton;