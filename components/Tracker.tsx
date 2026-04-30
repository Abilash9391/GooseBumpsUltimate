"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Tracker({ userId }: { userId?: string }) {
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      body: JSON.stringify({
        userId,
        path: pathname,
      }),
    });
  }, [pathname, userId]);

  return null;
}