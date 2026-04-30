// "use client";

// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function ResetPasswordPage() {
//   const params = useSearchParams();
//   const email = params.get("email") || "";

//   const router = useRouter();

//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleReset = async () => {
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/reset-password", {
//         method: "POST",
//         body: JSON.stringify({
//           email,
//           otp,
//           newPassword: password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to reset password");
//         return;
//       }

//       setSuccess("Password reset successful!");

//       setTimeout(() => {
//         router.push("/admin/login");
//       }, 1500);
//     } catch {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!email) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Invalid request
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-card p-6 rounded-lg shadow">

//         <h1 className="text-xl font-bold mb-4">Reset Password</h1>

//         <input
//           placeholder="Enter OTP"
//           className="w-full border p-2 rounded mb-3"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="New Password"
//           className="w-full border p-2 rounded mb-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && (
//           <div className="text-red-500 text-sm mb-2">{error}</div>
//         )}

//         {success && (
//           <div className="text-green-500 text-sm mb-2">{success}</div>
//         )}

//         <button
//           onClick={handleReset}
//           disabled={loading}
//           className="w-full bg-primary text-white py-2 rounded"
//         >
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>

//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const email = params.get("email") || "";

  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [countdown, setCountdown] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================
     Countdown Timer
  ========================= */
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  /* =========================
     Resend OTP
  ========================= */
  const resendOtp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          type: "RESET",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to resend OTP");
        return;
      }

      setSuccess("OTP sent again");
      setCountdown(30);

    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Reset Password
  ========================= */
  const handleReset = async () => {
    setError("");
    setSuccess("");

    if (!otp) return setError("Enter OTP");
    if (password.length < 6) return setError("Password too short");
    if (password !== confirmPassword)
      return setError("Passwords do not match");

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password");
        return;
      }

      setSuccess("Password reset successful!");

      setTimeout(() => {
        router.push("/admin/login");
      }, 1500);

    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid request
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card p-6 rounded-lg shadow">

        <h1 className="text-xl font-bold mb-4">Reset Password</h1>

        <p className="text-sm text-muted-foreground mb-4">
          OTP sent to <b>{email}</b>
        </p>

        {/* OTP */}
        <input
          placeholder="Enter OTP"
          className="w-full border p-2 rounded mb-3"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 rounded mb-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Resend */}
        <button
          onClick={resendOtp}
          disabled={countdown > 0 || loading}
          className="text-sm text-primary mb-3"
        >
          {countdown > 0
            ? `Resend OTP in ${countdown}s`
            : "Resend OTP"}
        </button>

        {/* Messages */}
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}

        {success && (
          <div className="text-green-500 text-sm mb-2">{success}</div>
        )}

        {/* Submit */}
        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

      </div>
    </div>
  );
}