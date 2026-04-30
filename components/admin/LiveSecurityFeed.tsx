"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function LiveSecurityFeed() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    socket.on("audit-log", (data) => {
      setEvents((prev) => [data, ...prev.slice(0, 9)]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="border rounded-lg p-3 h-[400px] overflow-auto">
      <h2 className="font-bold mb-2">Live Activity</h2>

      {events.map((e, i) => (
        <div key={i} className="text-xs border-b py-2">
          <p className="font-medium">{e.action}</p>
          <p className="text-muted-foreground">{e.entityId}</p>
        </div>
      ))}
    </div>
  );
}