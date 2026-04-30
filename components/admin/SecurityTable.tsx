export default function SecurityTable({ logs }: any) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">Action</th>
            <th>Email/User</th>
            <th>Status</th>
            <th>IP</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log: any) => (
            <tr key={log.id} className="border-t">
              <td className="p-2">{log.action}</td>
              <td>{log.entityId || "-"}</td>
              <td>
                <span
                  className={
                    log.status === "SUCCESS"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {log.status}
                </span>
              </td>
              <td>{log.ip}</td>
              <td>
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}