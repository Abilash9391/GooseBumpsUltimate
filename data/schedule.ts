export interface ScheduleItem {
  id: string;
  type: "practice" | "scrimmage" | "tournament" | "workshop";
  title: string;
  opponent?: string;
  date: string;
  time: string;
  location: string;
  isHome: boolean;
}

export const schedule: ScheduleItem[] = [
  { id: "1", type: "practice", title: "Weekly Practice", date: "April 5, 2026", time: "6:00 PM", location: "Goosebumps Home Field", isHome: true },
  { id: "2", type: "scrimmage", title: "Friendly Scrimmage", opponent: "Sky Riders", date: "April 8, 2026", time: "5:00 PM", location: "Central Park", isHome: false },
  { id: "3", type: "tournament", title: "Regional Championship", opponent: "Multiple Teams", date: "April 15, 2026", time: "9:00 AM", location: "City Sports Complex", isHome: false },
  { id: "4", type: "practice", title: "Skills Training", date: "April 19, 2026", time: "6:00 PM", location: "Goosebumps Home Field", isHome: true },
  { id: "5", type: "workshop", title: "Strategy Workshop", date: "April 20, 2026", time: "10:00 AM", location: "Community Center", isHome: true },
  { id: "6", type: "scrimmage", title: "Inter-Club Match", opponent: "Disc Dynamos", date: "April 25, 2026", time: "4:00 PM", location: "Goosebumps Home Field", isHome: true },
  { id: "7", type: "tournament", title: "Beach Ultimate Fest", opponent: "Open Tournament", date: "May 5, 2026", time: "8:00 AM", location: "Sunset Beach", isHome: false },
];
