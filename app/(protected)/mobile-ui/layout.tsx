// app/(protected)/mobile-ui/layout.tsx
import React from 'react';

export default function MobileUILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#0D0C1D]">
      {children}
    </div>
  );
}