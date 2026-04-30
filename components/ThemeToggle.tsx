// "use client";

// import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";

// export function ThemeToggle() {
//   const { theme, setTheme, resolvedTheme } = useTheme();

//   const currentTheme = theme === "system" ? resolvedTheme : theme;

//   const isDark = currentTheme === "dark";

//   return (
//     <button
//       onClick={() => setTheme(isDark ? "light" : "dark")}
//       className="
//         relative w-11 h-6
//         flex items-center
//         rounded-full
//         border border-border
//         bg-card
//         p-0.5
//         transition-colors duration-300
//         hover:scale-105
//       "
//     >
//       {/* Knob */}
//       <div
//         className={`
//           h-5 w-5
//           rounded-full
//           bg-primary
//           flex items-center justify-center
//           transition-transform duration-300 ease-in-out
//           ${isDark ? "translate-x-5" : "translate-x-0"}
//         `}
//       >
//         {isDark ? (
//           <Moon className="h-3 w-3 text-primary-foreground" />
//         ) : (
//           <Sun className="h-3 w-3 text-primary-foreground" />
//         )}
//       </div>
//     </button>
//   );
// }

// // "use client";

// // import { useTheme } from "next-themes";
// // import { Sun, Moon } from "lucide-react";

// // export function ThemeToggle() {
// //   const { theme, setTheme, resolvedTheme } = useTheme();

// //   const currentTheme = theme === "system" ? resolvedTheme : theme;

// //   return (
// //     <button
// //   onClick={() =>
// //     setTheme(currentTheme === "dark" ? "light" : "dark")
// //   }
// //   className="relative w-14 h-8 flex items-center rounded-full border border-border bg-card p-1 transition"
// // >
// //   <div
// //     className={`h-6 w-6 rounded-full bg-primary transition-transform duration-300 ${
// //       currentTheme === "dark" ? "translate-x-6" : "translate-x-0"
// //     }`}
// //   />
// // </button>
    
// //   );
// // }
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔥 Prevent hydration mismatch
  if (!mounted) {
    return <div className="w-11 h-6" />; // placeholder
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative w-11 h-6
        flex items-center
        rounded-full
        border border-border
        bg-card
        p-0.5
        transition-colors duration-300
        hover:scale-105
      "
    >
      {/* Knob */}
      <div
        className={`
          h-5 w-5
          rounded-full
          bg-primary
          flex items-center justify-center
          transition-transform duration-300 ease-in-out
          ${isDark ? "translate-x-5" : "translate-x-0"}
        `}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-primary-foreground" />
        ) : (
          <Sun className="h-3 w-3 text-primary-foreground" />
        )}
      </div>
    </button>
  );
}