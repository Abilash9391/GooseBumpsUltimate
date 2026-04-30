"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Twitter,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

/* ================= DATA ================= */

const footerSections = [
  {
    title: "Club",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Schedule", href: "/schedule" },
      { label: "Achievements", href: "/achievements" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Ultimate",
    links: [
      { label: "What is Ultimate", href: "/about-game" },
      { label: "Basic Rules", href: "/about-game" },
      { label: "Why Play", href: "/about-game" },
      { label: "Spirit of the Game", href: "/about-game" },
    ],
  },
  {
    title: "Events",
    links: [
      { label: "Upcoming Events", href: "/events" },
      { label: "Past Events", href: "/events" },
      { label: "Tournaments", href: "/events" },
      { label: "Practice Sessions", href: "/schedule" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Join the Club", href: "/contact" },
      { label: "Newsletter", href: "#" },
      { label: "Partner With Us", href: "/contact" },
      { label: "Volunteer", href: "/contact" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  {
    label: "Instagram",
    href: "https://www.instagram.com/goosebumps_ultimate/",
    icon: Instagram,
  },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
];

/* ================= COMPONENT ================= */

export function Footer() {
  return (
    <footer className="bg-card border-t">
      {/* Newsletter */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold">
              Join the Goosebumps Family
            </h3>
            <p className="text-muted-foreground mt-2">
              Get updates, event invites, and Ultimate tips.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-3 w-full lg:w-auto"
            aria-label="Newsletter subscription form"
          >
            <Input
              type="email"
              required
              placeholder="Enter your email"
              className="sm:w-64"
              aria-label="Email address"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {/* Brand */}
        <div className="col-span-2">
          <Link
            href="/"
            className="flex items-center gap-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
          >
            <Image
              src="/images/logo.png"
              alt="Goosebumps Ultimate Disc Club logo"
              width={48}
              height={48}
            />
            <div>
              <p className="font-bold">GOOSEBUMPS</p>
              <p className="text-xs text-muted-foreground">
                ULTIMATE DISC CLUB
              </p>
            </div>
          </Link>

          <p className="text-sm text-muted-foreground max-w-xs">
            Building community through Ultimate Frisbee and the Spirit of the Game.
          </p>

          {/* Social */}
          <div className="flex gap-3 mt-6">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group w-10 h-10 flex items-center justify-center rounded-lg bg-secondary 
                hover:bg-primary hover:text-white 
                focus:outline-none focus:ring-2 focus:ring-primary 
                transition-all duration-200 ease-out
                hover:scale-105 active:scale-95"
              >
                <Icon
                  className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Links */}
        {footerSections.map((section) => (
          <nav key={section.title} aria-labelledby={section.title}>
            <h4
              id={section.title}
              className="font-semibold text-sm uppercase mb-4"
            >
              {section.title}
            </h4>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground 
                    hover:text-primary 
                    focus:text-primary 
                    focus:outline-none 
                    transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between text-sm text-muted-foreground gap-4">
          <p>© 2026 Goosebumps Ultimate Disc Club</p>

          <div className="flex gap-6">
            <Link
              href="#"
              className="hover:text-primary focus:text-primary transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-primary focus:text-primary transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// /* ================= ICON COMPONENT ================= */
// const SocialIcon = ({ children }: { children: React.ReactNode }) => (
//   <span className="h-5 w-5 flex items-center justify-center">{children}</span>
// );

// /* ================= DATA ================= */
// const footerSections = [
//   {
//     title: "Club",
//     links: [
//       { label: "About Us", href: "/about" },
//       { label: "Schedule", href: "/schedule" },
//       { label: "Achievements", href: "/achievements" },
//       { label: "Contact", href: "/contact" },
//     ],
//   },
//   {
//     title: "Ultimate",
//     links: [
//       { label: "What is Ultimate", href: "/about-game" },
//       { label: "Basic Rules", href: "/about-game" },
//       { label: "Why Play", href: "/about-game" },
//       { label: "Spirit of the Game", href: "/about-game" },
//     ],
//   },
//   {
//     title: "Events",
//     links: [
//       { label: "Upcoming Events", href: "/events" },
//       { label: "Past Events", href: "/events" },
//       { label: "Tournaments", href: "/events" },
//       { label: "Practice Sessions", href: "/schedule" },
//     ],
//   },
//   {
//     title: "Connect",
//     links: [
//       { label: "Join the Club", href: "/contact" },
//       { label: "Newsletter", href: "#" },
//       { label: "Partner With Us", href: "/contact" },
//       { label: "Volunteer", href: "/contact" },
//     ],
//   },
// ];

// const socialLinks = [
//   {
//     label: "Twitter",
//     href: "https://twitter.com",
//     icon: (
//       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
//     ),
//   },
//   {
//     label: "Instagram",
//     href: "https://www.instagram.com/goosebumps_ultimate/",
//     icon: (
//       <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
//     ),
//   },
//   {
//     label: "Facebook",
//     href: "https://facebook.com",
//     icon: (
//       <path d="M24 12.073c0-6.627-5.373-12-12..." />
//     ),
//   },
//   {
//     label: "YouTube",
//     href: "https://youtube.com",
//     icon: (
//       <path d="M23.498 6.186a3.016 3.016..." />
//     ),
//   },
// ];

// /* ================= COMPONENT ================= */
// export function Footer() {
//   return (
//     <footer className="bg-card border-t">
//       {/* Newsletter */}
//       <div className="border-b">
//         <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row justify-between gap-8">
//           <div>
//             <h3 className="text-2xl font-bold">
//               Join the Goosebumps Family
//             </h3>
//             <p className="text-muted-foreground mt-2">
//               Get updates, event invites, and Ultimate tips.
//             </p>
//           </div>

//           {/* FORM (ready for API integration) */}
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               // TODO: integrate Resend / API
//             }}
//             className="flex gap-3 w-full lg:w-auto"
//           >
//             <Input
//               type="email"
//               required
//               placeholder="Enter your email"
//               className="sm:w-64"
//             />
//             <Button type="submit">Subscribe</Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Footer */}
//       <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
//         {/* Brand */}
//         <div className="col-span-2">
//           <Link href="/" className="flex items-center gap-3 mb-4">
//             <Image
//               src="/images/logo.png"
//               alt="Goosebumps Logo"
//               width={48}
//               height={48}
//             />
//             <div>
//               <p className="font-bold">GOOSEBUMPS</p>
//               <p className="text-xs text-muted-foreground">
//                 ULTIMATE DISC CLUB
//               </p>
//             </div>
//           </Link>

//           <p className="text-sm text-muted-foreground max-w-xs">
//             Building community through Ultimate Frisbee and the Spirit of the Game.
//           </p>

//           {/* Social */}
//           <div className="flex gap-3 mt-6">
//             {socialLinks.map((social) => (
//               <a
//                 key={social.label}
//                 href={social.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={social.label}
//                 className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary hover:bg-primary hover:text-white transition"
//               >
//                 <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
//                   {social.icon}
//                 </svg>
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Links */}
//         {footerSections.map((section) => (
//           <div key={section.title}>
//             <h4 className="font-semibold text-sm uppercase mb-4">
//               {section.title}
//             </h4>
//             <ul className="space-y-3">
//               {section.links.map((link) => (
//                 <li key={link.label}>
//                   <Link
//                     href={link.href}
//                     className="text-sm text-muted-foreground hover:text-primary transition"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* Bottom */}
//       <div className="border-t">
//         <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
//           <p>© 2026 Goosebumps Ultimate Disc Club</p>
//           <div className="flex gap-6">
//             <Link href="#">Privacy Policy</Link>
//             <Link href="#">Terms of Service</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }