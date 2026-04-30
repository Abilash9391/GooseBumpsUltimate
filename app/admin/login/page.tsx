"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, KeyRound } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { status } = useSession();

  /* =========================
     Redirect if logged in
  ========================= */
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin/dashboard");
    }
  }, [status, router]);

  /* =========================
     Countdown Timer (30s)
  ========================= */
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  /* =========================
     Send OTP
  ========================= */
  const sendOtp = async () => {
    setError("");
    setInfo("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          type: "LOGIN",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        return;
      }

      setOtpSent(true);
      setCountdown(30);
      setInfo("OTP sent to your email");

    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     Handle Submit
  ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");

    // STEP 1 → Send OTP
    if (!otpSent) {
      if (!email || !password) {
        setError("Email and password required");
        return;
      }
      return sendOtp();
    }

    // STEP 2 → Verify OTP → Login
    setIsLoading(true);

    try {
      // ✅ STEP 2A: Verify OTP
      const verifyRes = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        setError(verifyData.error || "Invalid OTP");
        return;
      }

      // ✅ STEP 2B: Sign in (session creation)
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        otp: "1", // just a trigger flag
      });

      if (res?.error) {
        setError(res.error.replace("CredentialsSignin: ", ""));
        return;
      }

      router.push("/admin/dashboard");

    } catch {
      setError("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const isBlocked = error.toLowerCase().includes("too many");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-primary to-secondary p-[2px] rounded-lg shadow-xl">
          <div className="bg-card rounded-lg p-8">

            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Admin Login</h1>
              <p className="text-muted-foreground text-sm">
                Secure Admin Panel
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent || isLoading || isBlocked}
                    required
                    className="w-full pl-9 py-2 border rounded-md"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              {!otpSent && (
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading || isBlocked}
                      required
                      className="w-full pl-9 py-2 border rounded-md"
                      placeholder="Enter password"
                    />
                  </div>
                </div>
              )}

              {/* OTP */}
              {otpSent && (
                <>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4" />
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={isLoading}
                      placeholder="Enter OTP"
                      className="w-full pl-9 py-2 border rounded-md"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={countdown > 0 || isLoading}
                    className="w-full text-sm text-primary"
                  >
                    {countdown > 0
                      ? `Resend OTP in ${countdown}s`
                      : "Resend OTP"}
                  </button>
                </>
              )}

              {/* Messages */}
              {error && (
                <div className="p-2 text-sm text-red-500">{error}</div>
              )}
              {info && (
                <div className="p-2 text-sm text-green-500">{info}</div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || isBlocked}
                className="w-full py-2 bg-primary text-white rounded-md"
              >
                {isLoading
                  ? "Processing..."
                  : otpSent
                  ? "Verify OTP"
                  : "Login & Send OTP"}
              </button>
            </form>

            {/* Forgot password */}
            <p className="text-sm text-center mt-3">
              <a href="/admin/forgot-password" className="underline text-primary">
                Forgot Password?
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Lock, User, KeyRound } from "lucide-react";
// import { signIn, useSession } from "next-auth/react";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");

//   const [otpSent, setOtpSent] = useState(false);
//   const [countdown, setCountdown] = useState(0);

//   const [error, setError] = useState("");
//   const [info, setInfo] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const { status } = useSession();

//   /* =========================
//      Redirect if logged in
//   ========================= */
//   useEffect(() => {
//     if (status === "authenticated") {
//       router.replace("/admin/dashboard");
//     }
//   }, [status, router]);

//   /* =========================
//      Countdown Timer (30s)
//   ========================= */
//   useEffect(() => {
//     if (countdown <= 0) return;

//     const timer = setInterval(() => {
//       setCountdown((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [countdown]);

//   /* =========================
//      Send OTP (after password verify)
//   ========================= */
//   const sendOtp = async () => {
//     setError("");
//     setInfo("");
//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/auth/send-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email.trim(),
//           password,
//           type: "LOGIN",
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to send OTP");
//         return;
//       }

//       setOtpSent(true);
//       setCountdown(30); // 🔥 start timer
//       setInfo("OTP sent to your email");

//     } catch {
//       setError("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* =========================
//      Handle Submit
//   ========================= */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setInfo("");

//     // STEP 1 → send OTP
//     if (!otpSent) {
//       if (!email || !password) {
//         setError("Email and password required");
//         return;
//       }
//       return sendOtp();
//     }

//     // STEP 2 → verify OTP
//     setIsLoading(true);

//     try {
//       const res = await signIn("credentials", {
//         redirect: false,
//         email: email.trim(),
//         otp: otp.trim(),
//       });

//       if (res?.error) {
//         setError(res.error.replace("CredentialsSignin: ", ""));
//         return;
//       }

//       router.push("/admin/dashboard");

//     } catch {
//       setError("Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* =========================
//      UI
//   ========================= */
//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   const isBlocked = error.toLowerCase().includes("too many");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-gradient-to-br from-primary to-secondary p-[2px] rounded-lg shadow-xl">
//           <div className="bg-card rounded-lg p-8">

//             {/* Header */}
//             <div className="text-center mb-6">
//               <div className="mx-auto mb-3 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
//                 <Lock className="h-7 w-7 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold">Admin Login</h1>
//               <p className="text-muted-foreground text-sm">
//                 Secure Admin Panel
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-4">

//               {/* Email */}
//               <div>
//                 <label className="text-sm font-medium">Email</label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 h-4 w-4" />
//                   <input
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     disabled={otpSent || isLoading || isBlocked}
//                     required
//                     className="w-full pl-9 py-2 border rounded-md"
//                     placeholder="Enter email"
//                   />
//                 </div>
//               </div>

//               {/* PASSWORD */}
//               {!otpSent && (
//                 <div>
//                   <label className="text-sm font-medium">Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4" />
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       disabled={isLoading || isBlocked}
//                       required
//                       className="w-full pl-9 py-2 border rounded-md"
//                       placeholder="Enter password"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* OTP */}
//               {otpSent && (
//                 <>
//                   <div className="relative">
//                     <KeyRound className="absolute left-3 top-3 h-4 w-4" />
//                     <input
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       disabled={isLoading}
//                       placeholder="Enter OTP"
//                       className="w-full pl-9 py-2 border rounded-md"
//                     />
//                   </div>

//                   {/* Resend */}
//                   <button
//                     type="button"
//                     onClick={sendOtp}
//                     disabled={countdown > 0 || isLoading}
//                     className="w-full text-sm text-primary"
//                   >
//                     {countdown > 0
//                       ? `Resend OTP in ${countdown}s`
//                       : "Resend OTP"}
//                   </button>
//                 </>
//               )}

//               {/* Messages */}
//               {error && (
//                 <div className="p-2 text-sm text-red-500">{error}</div>
//               )}
//               {info && (
//                 <div className="p-2 text-sm text-green-500">{info}</div>
//               )}

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={isLoading || isBlocked}
//                 className="w-full py-2 bg-primary text-white rounded-md"
//               >
//                 {isLoading
//                   ? "Processing..."
//                   : otpSent
//                   ? "Verify OTP"
//                   : "Login & Send OTP"}
//               </button>
//             </form>

//             {/* Forgot password */}
//             <p className="text-sm text-center mt-3">
//               <a href="/admin/forgot-password" className="underline text-primary">
//                 Forgot Password?
//               </a>
//             </p>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }