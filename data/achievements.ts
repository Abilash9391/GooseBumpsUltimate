export interface Achievement {
  id: string;
  title: string;
  year: string;
  description: string;
  icon: "trophy" | "award" | "medal" | "star";
}

export interface Stats {
  winRate: number;
  tournamentsWon: number;
  members: number;
  yearsActive: number;
}

export const achievements: Achievement[] = [
  { id: "1", title: "Regional Champions", year: "2025", description: "First place in the Regional Ultimate Championship", icon: "trophy" },
  { id: "2", title: "Spirit of the Game Award", year: "2025", description: "Recognized for exemplary sportsmanship and fair play", icon: "award" },
  { id: "3", title: "Winter League Winners", year: "2026", description: "Undefeated champions of the indoor winter league", icon: "medal" },
  { id: "4", title: "Community Impact Award", year: "2024", description: "For contributions to youth ultimate development", icon: "star" },
];

export const stats: Stats = { winRate: 78, tournamentsWon: 12, members: 45, yearsActive: 5 };
