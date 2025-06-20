'use client';
import { useState } from 'react';
import Image from 'next/image';

interface EventLogoImageProps {
  src: string | null | undefined;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackChar?: string;
}

export default function EventLogoImage({
  src,
  alt,
  width,
  height,
  className = "rounded-md",
  fallbackChar = "E"
}: EventLogoImageProps) {
  const [hasError, setHasError] = useState(!src);

  if (hasError || !src) {
    return (
      <div 
        className={`bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-white font-bold" style={{ fontSize: width > 50 ? '1.5rem' : '1rem' }}>
          {fallbackChar}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}