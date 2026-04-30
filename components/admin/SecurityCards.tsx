export default function SecurityCards({ logs }: any) {
  const failed = logs.filter((l: any) => l.status === "FAILED").length;
  const success = logs.filter((l: any) => l.status === "SUCCESS").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Total Logs" value={logs.length} />
      <Card title="Failed Logins" value={failed} />
      <Card title="Successful Logins" value={success} />
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}