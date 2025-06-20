/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React from "react";
import Link from "next/link";
import EventLogoImage from "@/components/EventLogoImage";

interface EventCardProps {
  event: {
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
  };
}

// Keeping the original component name and export structure to maintain compatibility
export default function EventCard({ event }: EventCardProps) {
  // Use the primary color from the event or default to purple
  const primaryColor = event.primaryColor || "rgb(139, 92, 246)";

  // Calculate if event is upcoming, ongoing, or past
  const now = new Date();
  const isUpcoming = new Date(event.startTime) > now;
  const isOngoing =
    new Date(event.startTime) <= now && new Date(event.endTime) >= now;
  const isPast = new Date(event.endTime) < now;

  // Format date and time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format address to be shorter
  const formatAddress = (address: string) => {
    if (address.length > 20) {
      return address.substring(0, 18) + "...";
    }
    return address;
  };

  // Generate ticket number based on event ID
  const ticketNumber = `${event.id.substring(0, 3).toUpperCase()}-${Math.floor(
    Math.random() * 10000
  )
    .toString()
    .padStart(4, "0")}`;

  // Get event day, month, and year for display
  const eventDate = new Date(event.startTime);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString("default", { month: "short" });
  const year = eventDate.getFullYear();
  const weekday = eventDate.toLocaleString("default", { weekday: "short" });

  // Calculate event duration in hours and minutes
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor(
    (durationMs % (1000 * 60 * 60)) / (1000 * 60)
  );
  const durationText =
    durationHours > 0
      ? `${durationHours}h${durationMinutes > 0 ? ` ${durationMinutes}m` : ""}`
      : `${durationMinutes}m`;

  return (
    <Link href={`/events/${event.id}`} className="block w-full h-full">
      <div className="group h-full max-w-full mx-auto relative perspective-1000">
        {/* 3D Rotation effect on hover */}
        <div
          className="relative h-full transition-all duration-500 "
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main ticket container with paper texture */}
          <div
            className="bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden h-full flex flex-col relative"
            style={{
              background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${primaryColor
                .replace(/[^\da-f]/gi, "")
                .substring(
                  0,
                  6
                )}' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E"), linear-gradient(to bottom, #ffffff, #fafafa) !important`,
              backgroundBlendMode: "overlay",
              boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.1)`,
            }}
          >
            {/* Ticket header with holographic effect */}
            <div
              className="relative px-4 py-3 border-b border-dashed dark:border-gray-700"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}20 0%, ${primaryColor}40 50%, ${primaryColor}20 100%)`,
                borderBottom: `2px dashed rgba(255,255,255,0.3)`,
                backdropFilter: "blur(4px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Holographic lines effect */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${primaryColor} 10px, ${primaryColor} 11px)`,
                }}
              ></div>

              {/* Holographic shimmer effect */}
              {/* <div 
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-50" 
                style={{
                  backgroundImage: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite',
                }}
              ></div> */}

              {/* Status indicator with improved styling */}
              {isUpcoming && (
                <div className="absolute top-3 right-3 z-10 flex items-center">
                  <span className="relative flex h-3 w-3 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded-sm shadow-sm">
                    Upcoming
                  </span>
                </div>
              )}

              {isOngoing && (
                <div className="absolute top-3 right-3 z-10 flex items-center">
                  <span className="relative flex h-3 w-3 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded-sm shadow-sm">
                    Live Now
                  </span>
                </div>
              )}

              {isPast && (
                <div className="absolute top-3 right-3 z-10 flex items-center">
                  <span className="relative flex h-3 w-3 mr-1.5">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded-sm shadow-sm">
                    Past
                  </span>
                </div>
              )}

              <div className="flex items-center">
                {/* Event logo with enhanced styling */}
                <div className="mr-3 w-12 h-12 rounded-full overflow-hidden bg-white dark:bg-gray-800 p-0.5 shadow-lg ring-4 ring-white/30 dark:ring-gray-700/30 transform group-hover:rotate-3 transition-transform duration-300">
                  <EventLogoImage
                    src={event.logo}
                    alt={event.title}
                    width={48}
                    height={48}
                    fallbackChar={event.title.charAt(0)}
                  />
                </div>
                <div className="flex-1 truncate">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white truncate tracking-tight">
                    {event.title}
                  </h3>
                  <p className="text-[11px] text-gray-700 dark:text-gray-300 flex items-center">
                    <span>by</span>
                    <span
                      className="font-medium ml-1"
                      style={{ color: primaryColor }}
                    >
                      {event.organizer.name || "Unknown"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Ticket body with improved layout */}
            <div className="flex flex-1 items-stretch">
              {/* Left stub with date */}
              <div
                className="flex-shrink-0 w-1/4 py-3 px-1.5 flex flex-col items-center justify-center border-r border-dashed border-gray-300 dark:border-gray-700 relative"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}30 100%)`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Subtle background pattern */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${primaryColor
                      .replace(/[^\da-f]/gi, "")
                      .substring(
                        0,
                        6
                      )}' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: "7px 7px",
                  }}
                ></div>

                {/* Stub Holes with more realistic styling */}
                <div className="absolute left-0 top-0 h-full w-full flex flex-col justify-between items-start pointer-events-none">
                  <div className="w-3 h-6 bg-gray-100 dark:bg-gray-800 rounded-r-full -ml-1.5 mt-3 shadow-inner"></div>
                  <div className="w-3 h-6 bg-gray-100 dark:bg-gray-800 rounded-r-full -ml-1.5 mb-3 shadow-inner"></div>
                </div>

                {/* Date information with calendar-like styling */}
                <div className="text-center bg-white dark:bg-gray-800 rounded-md shadow-md p-1 mt-1.5 transform group-hover:rotate-2 transition-transform duration-500 w-16 relative z-10">
                  {/* Calendar top bar */}
                  <div
                    className="text-[10px] text-white dark:text-gray-100 font-semibold rounded-t-sm px-1 py-0.5 -mt-1 -mx-1 mb-1"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {month}
                  </div>

                  {/* Calendar day */}
                  <div className="text-2xl font-bold text-gray-900 dark:text-white leading-none">
                    {day}
                  </div>

                  {/* Calendar weekday */}
                  <div className="text-[10px] font-medium text-gray-700 dark:text-gray-300 -mb-1">
                    {weekday}
                  </div>

                  {/* Year added as requested */}
                  <div className="text-[9px] font-medium text-gray-500 dark:text-gray-400">
                    {year}
                  </div>
                </div>

                {/* Duration badge */}
                <div className="mt-2 text-[9px] font-medium bg-white/60 dark:bg-gray-800/60 rounded-full px-2 py-0.5 text-gray-700 dark:text-gray-300 shadow-sm backdrop-blur-sm">
                  {durationText}
                </div>
              </div>

              {/* Right main ticket content */}
              <div className="flex-1 p-3 flex flex-col justify-between relative">
                {/* Description with improved styling */}
                <div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-2 mb-2 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Event details with improved icons */}
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center text-[11px]">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center mr-2 bg-gray-100 dark:bg-gray-800 shadow-sm"
                        style={{ color: primaryColor }}
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {formatTime(event.startTime)}
                      </span>
                    </div>

                    <div className="flex items-center text-[11px]">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center mr-2 bg-gray-100 dark:bg-gray-800 shadow-sm"
                        style={{ color: primaryColor }}
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium truncate">
                        {formatAddress(event.address)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ticket footer with realistic barcode */}
                <div className="mt-auto">
                  {/* Security elements */}
                  {/* <div className="flex justify-between items-center mb-1 text-[8px] text-gray-400">
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: primaryColor }}></span>
                      <span>SEC</span>
                    </div>
                    <div className="mr-1">ID: {event.id.substring(0, 6)}</div>
                  </div> */}

                  {/* Enhanced realistic barcode */}
                  <div className="h-8 mt-2 bg-gray-100 dark:bg-gray-800 rounded-sm overflow-hidden relative flex items-center justify-center mt-1 p-1">
                    {/* Barcode lines with varying thickness and natural imperfections */}
                    <div className="absolute inset-0 flex items-center">
                      {[...Array(60)].map((_, i) => {
                        const width = i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1;
                        const height = 100 - Math.random() * 6;
                        const opacity = 0.7 + Math.random() * 0.3;

                        return (
                          <div
                            key={i}
                            className="h-full mx-0.5"
                            style={{
                              width: `${width}px`,
                              height: `${height}%`,
                              backgroundColor: "rgba(0,0,0,0.9)",
                              opacity: opacity,
                              transform: `translateY(${Math.random() * 1}px)`,
                            }}
                          ></div>
                        );
                      })}
                    </div>

                    {/* Ticket number overlay */}
                    <div className="relative z-10 text-[9px] font-mono text-gray-800 dark:text-gray-300 tracking-widest flex justify-between w-full px-3 bg-white/50 dark:bg-gray-900/50 py-1 rounded">
                      <span className="bg-white/80 dark:bg-gray-800/80 px-1 py-0.5 rounded">
                        {event.id.substring(0, 6)}
                      </span>
                      <span className="bg-white/80 dark:bg-gray-800/80 px-1 py-0.5 rounded">
                        {ticketNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom accent with enhanced effect */}
            <div
              className="h-2 w-full relative overflow-hidden"
              style={{
                background: `linear-gradient(90deg, ${primaryColor}70 0%, ${primaryColor} 100%)`,
                position: "relative",
              }}
            >
              {/* Perforation dots more realistic */}
              <div className="absolute inset-x-0 top-0 flex justify-between items-center">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="w-0.5 h-0.5 rounded-full bg-white dark:bg-gray-900"
                    style={{
                      opacity: 0.5 + Math.random() * 0.5,
                      transform: `scale(${0.8 + Math.random() * 0.4})`,
                    }}
                  ></div>
                ))}
              </div>

              {/* Shine effect */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  transform: "translateX(-100%)",
                  animation: "shine 3s infinite",
                }}
              ></div>
            </div>
          </div>

          {/* View Details hover button */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-5">
            <div
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center border-2"
              style={{ borderColor: primaryColor }}
            >
              <div className="relative overflow-hidden rounded-full">
                {/* Background ripple effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{
                    background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
                  }}
                ></div>

                {/* Icon */}
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: primaryColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Tooltip label that slides in */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[9px] font-medium text-white bg-black/70 backdrop-blur-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity delay-100 whitespace-nowrap">
              View Details
            </div>
          </div>

          {/* Enhanced ticket shadow */}
          <div className="absolute -bottom-1 left-2 right-2 h-2 bg-black/30 rounded-full blur-md z-0 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500"></div>
        </div>

        {/* Add a global style for the animations */}
        <style jsx global>{`
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
          @keyframes shine {
            0% {
              transform: translateX(-100%);
            }
            20% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .rotate-y-3 {
            transform: rotateY(3deg);
          }
          .perspective-1000 {
            perspective: 1000px;
          }
        `}</style>
      </div>
    </Link>
  );
}
