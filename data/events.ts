/* ================= TYPES ================= */

export type EventType = "upcoming" | "past" | "participated";

export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO format (YYYY-MM-DD)
  time: string;
  location: string;
  description: string;
  type: EventType;
  status?: string;
  result?: string;
  images?: string[];
  createdAt: string;
}


/* ================= STATIC DATA ================= */

export const events: Event[] = [
  {
    id: "1",
    slug: "regional-ultimate-championship",
    title: "Regional Ultimate Championship",
    date: "2026-04-22",
    time: "9:00 AM",
    location: "City Sports Complex",
    description: "Annual regional championship featuring top teams.",
    type: "upcoming",
    status: "Registration Open",
    createdAt: "2026-01-01",
  },
  {
    id: "2",
    slug: "spring-training-camp",
    title: "Spring Training Camp",
    date: "2026-04-25",
    time: "10:00 AM",
    location: "Goosebumps Home Field",
    description: "Intensive training and team building.",
    type: "upcoming",
    status: "Limited Spots",
    createdAt: "2026-01-02",
  },
  {
    id: "3",
    slug: "beach-ultimate-tournament",
    title: "Beach Ultimate Tournament",
    date: "2026-05-05",
    time: "8:00 AM",
    location: "Sunset Beach",
    description: "Fun beach tournament.",
    type: "upcoming",
    status: "Coming Soon",
    createdAt: "2026-01-03",
  },
  {
    id: "4",
    slug: "winter-league-finals",
    title: "Winter League Finals",
    date: "2026-03-10",
    time: "2:00 PM",
    location: "Indoor Sports Arena",
    description: "Championship game of the winter league.",
    type: "past",
    result: "Champions",
    images: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
    ],
    createdAt: "2026-01-04",
  },
  {
    id: "5",
    slug: "charity-disc-golf",
    title: "Charity Disc Golf Event",
    date: "2026-02-28",
    time: "11:00 AM",
    location: "Riverside Park",
    description: "Fundraiser event.",
    type: "past",
    result: "Raised $5,000",
    images: [
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800",
    ],
    createdAt: "2026-01-05",
  },
  {
    id: "6",
    slug: "inter-club-friendly",
    title: "Inter-Club Friendly",
    date: "2026-02-15",
    time: "3:00 PM",
    location: "University Grounds",
    description: "Friendly matches.",
    type: "past",
    result: "Won 3-1",
    createdAt: "2026-01-06",
  },
  {
    id: "7",
    slug: "national-ultimate-series",
    title: "National Ultimate Series",
    date: "2026-01-20",
    time: "All Day",
    location: "National Stadium",
    description: "National level tournament.",
    type: "participated",
    result: "Semi-Finals",
    createdAt: "2026-01-07",
  },
];




// export interface Event {
//   id: string;
//   title: string;
//   date: string;
//   time: string;
//   location: string;
//   description: string;
//   type: "upcoming" | "past" | "participated";
//   status?: string;
//   result?: string;
//   images?: string[];
// }

// export const events: Event[] = [
//   { id: "1", title: "Regional Ultimate Championship", date: "April 15, 2025", time: "9:00 AM", location: "City Sports Complex", description: "Annual regional championship featuring top teams from across the state.", type: "upcoming", status: "Registration Open" },
//   { id: "2", title: "Spring Training Camp", date: "April 22, 2026", time: "10:00 AM", location: "Goosebumps Home Field", description: "Intensive training camp for skill development and team building.", type: "upcoming", status: "Limited Spots" },
//   { id: "3", title: "Beach Ultimate Tournament", date: "May 5, 2026", time: "8:00 AM", location: "Sunset Beach", description: "Fun beach tournament with teams from neighboring cities.", type: "upcoming", status: "Coming Soon" },
//   { id: "4", title: "Winter League Finals", date: "March 10, 2026", time: "2:00 PM", location: "Indoor Sports Arena", description: "Championship game of the winter indoor league.", type: "past", result: "Champions", images: ["https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800", "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"] },
//   { id: "5", title: "Charity Disc Golf Event", date: "February 28, 2026", time: "11:00 AM", location: "Riverside Park", description: "Fundraiser event combining disc golf and ultimate frisbee.", type: "past", result: "Raised $5,000", images: ["https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800", "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800"] },
//   { id: "6", title: "Inter-Club Friendly", date: "February 15, 2026", time: "3:00 PM", location: "University Grounds", description: "Friendly matches against university teams.", type: "past", result: "Won 3-1", images: ["https://images.unsplash.com/photo-1552657244-5f6e1e6b152b?w=800"] },
//   { id: "7", title: "National Ultimate Series", date: "January 20, 2026", time: "All Day", location: "National Stadium", description: "Represented the region at the national level tournament.", type: "participated", result: "Semi-Finals" },
//   { id: "8", title: "Spirit of the Game Workshop", date: "December 5, 2025", time: "10:00 AM", location: "Community Center", description: "Workshop on fair play and sportsmanship principles.", type: "participated", result: "Spirit Award" },
//   { id: "9", title: "Youth Ultimate Clinic", date: "November 15, 2025", time: "9:00 AM", location: "Local High School", description: "Coaching clinic for young aspiring ultimate players.", type: "participated", result: "50+ Kids Trained" },
// ];

// // Function to parse date strings like "April 15, 2026" into Date objects
// function parseEventDate(dateString: string): Date {
//   return new Date(dateString);
// }

// // Function to check if an event date has passed
// function isEventPast(eventDate: string): boolean {
//   const eventDateObj = parseEventDate(eventDate);
//   const now = new Date();
//   // Set time to end of day for comparison
//   const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
//   return eventDateObj < endOfToday;
// }

// // Function to automatically update event types based on current date
// function updateEventTypes(): Event[] {
//   return events.map(event => {
//     // Only update if it's currently marked as upcoming and the date has passed
//     if (event.type === "upcoming" && isEventPast(event.date)) {
//       return {
//         ...event,
//         type: "past" as const,
//         status: undefined, // Remove status for past events
//         result: "Completed" // Add default result
//       };
//     }
//     return event;
//   });
// }

// // Function to sort events by date
// function sortEventsByDate(eventsToSort: Event[], ascending: boolean): Event[] {
//   return [...eventsToSort].sort((a, b) => {
//     const dateA = parseEventDate(a.date).getTime();
//     const dateB = parseEventDate(b.date).getTime();
//     return ascending ? dateA - dateB : dateB - dateA;
//   });
// }

// export const getEventsByType = (type?: string) => {
//   const updatedEvents = updateEventTypes();
//   if (type && ["upcoming", "past", "participated"].includes(type)) {
//     const filtered = updatedEvents.filter((e) => e.type === type);
//     // Sort upcoming events ascending (oldest first), past events descending (newest first)
//     if (type === "upcoming") {
//       return sortEventsByDate(filtered, true);
//     } else if (type === "past") {
//       return sortEventsByDate(filtered, false);
//     }
//     return filtered;
//   }
//   return updatedEvents;
// };
