"use client";

import { useEffect, useState } from "react";
import SecurityCards from "@/components/admin/SecurityCards";
import SecurityFilters from "@/components/admin/SecurityFilters";
import SecurityTable from "@/components/admin/SecurityTable";
import LiveSecurityFeed from "@/components/admin/LiveSecurityFeed";

export default function SecurityPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    action: "",
    email: "",
  });

  const fetchLogs = async () => {
    const params = new URLSearchParams(filters as any);

    const res = await fetch(`/api/admin/audit-logs?${params}`);
    const data = await res.json();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Security Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor login activity, threats, and system security
        </p>
      </div>

      {/* Top Stats */}
      <SecurityCards logs={logs} />

      {/* Filters */}
      <SecurityFilters filters={filters} setFilters={setFilters} />

      {/* Live Feed + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <LiveSecurityFeed />
        </div>

        <div className="lg:col-span-2">
          <SecurityTable logs={logs} />
        </div>
      </div>
    </div>
  );
}