"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  console.log("FORGOT PAGE LOADED");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSendOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({
          email,
          type: "RESET",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        return;
      }

      // 👉 Redirect to reset page with email
      router.push(`/admin/reset-password?email=${encodeURIComponent(email)}`);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card p-6 rounded-lg shadow">

        <h1 className="text-xl font-bold mb-4">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

      </div>
    </div>
  );
}
