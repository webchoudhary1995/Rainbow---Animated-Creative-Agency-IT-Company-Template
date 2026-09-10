"use client";

import dynamic from "next/dynamic";

const CursorSpotlight = dynamic(
  () => import("@/components/canvas/CursorSpotlight"),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorSpotlight />
      {children}
    </>
  );
}
