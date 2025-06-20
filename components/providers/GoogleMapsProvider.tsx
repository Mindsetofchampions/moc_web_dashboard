/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ReactNode } from 'react';
import { LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

export default function GoogleMapsProvider({ children }: { children: ReactNode }) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      libraries={libraries as any}
    >
      {children}
    </LoadScript>
  );
}