export default function SecurityFilters({ filters, setFilters }: any) {
  return (
    <div className="flex gap-3">
      <input
        placeholder="Filter by email"
        className="border p-2 rounded w-full"
        onChange={(e) =>
          setFilters({ ...filters, email: e.target.value })
        }
      />

      <select
        className="border p-2 rounded"
        onChange={(e) =>
          setFilters({ ...filters, action: e.target.value })
        }
      >
        <option value="">All Actions</option>
        <option value="LOGIN_SUCCESS">Login Success</option>
        <option value="LOGIN_BLOCKED">Blocked</option>
        <option value="OTP_LOGIN_SUCCESS">OTP Login</option>
      </select>
    </div>
  );
}