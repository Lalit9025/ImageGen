// src/app/layout.tsx
import React from 'react';
import Link from 'next/link';
import './globals.css'; // Your global CSS imports

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
