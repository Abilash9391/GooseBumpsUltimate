import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Users } from "lucide-react";

const schedule = [
  { id: 1, type: "Practice", opponent: "Weekly Training", opponentLogo: "GB", date: "APR 15", time: "6:00 PM", location: "Central Park Fields", isHome: true, format: "Open to All" },
  { id: 2, type: "Tournament", opponent: "Spring Hat", opponentLogo: "SH", date: "APR 20", time: "8:00 AM", location: "Sports Complex", isHome: true, format: "Mixed" },
  { id: 3, type: "Scrimmage", opponent: "Disc Dynamix", opponentLogo: "DD", date: "APR 25", time: "4:00 PM", location: "University Grounds", isHome: false, format: "Open" },
  { id: 4, type: "Practice", opponent: "Weekly Training", opponentLogo: "GB", date: "APR 29", time: "6:00 PM", location: "Central Park Fields", isHome: true, format: "Open to All" },
  { id: 5, type: "Tournament", opponent: "State Championship", opponentLogo: "SC", date: "MAY 3-4", time: "All Day", location: "Metro Stadium", isHome: false, format: "Mixed" },
  { id: 6, type: "Workshop", opponent: "Beginner Clinic", opponentLogo: "BC", date: "MAY 10", time: "10:00 AM", location: "Community Center", isHome: true, format: "Beginners" },
];

const typeColors: Record<string, string> = {
  Practice: "bg-secondary text-secondary-foreground",
  Tournament: "bg-primary text-primary-foreground",
  Scrimmage: "bg-secondary text-secondary-foreground",
  Workshop: "bg-primary/20 text-primary",
};

export function ScheduleSection() {
  return (
    <section id="schedule" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <Badge variant="outline" className="mb-4 uppercase tracking-wider">Schedule</Badge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">UPCOMING ACTIVITIES</h2>
          </div>
          <Button variant="link" className="text-primary uppercase tracking-wider gap-1 p-0">
            Full Schedule <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="hidden md:grid grid-cols-[1fr_1.5fr_auto_auto_auto] gap-4 p-4 bg-secondary/50 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            <span>Date</span><span>Activity</span><span className="text-center">Location</span><span className="text-center">Format</span><span className="text-center">Action</span>
          </div>

          {schedule.map((item, index) => (
            <div key={item.id} className={`grid grid-cols-1 md:grid-cols-[1fr_1.5fr_auto_auto_auto] gap-4 p-4 md:p-6 items-center ${index !== schedule.length - 1 ? "border-b border-border" : ""} hover:bg-secondary/20 transition-colors`}>
              <div className="flex items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="font-display text-2xl font-bold text-foreground">{item.date}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${typeColors[item.type]}`}>{item.type}</div>
                  <span className="font-semibold text-foreground">{item.opponent}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 md:justify-center">
                <Badge variant={item.isHome ? "default" : "secondary"} className="uppercase text-xs tracking-wider">
                  <MapPin className="h-3 w-3 mr-1" />{item.location}
                </Badge>
              </div>
              <div className="flex items-center gap-2 md:justify-center">
                <Badge variant="outline" className="text-xs"><Users className="h-3 w-3 mr-1" />{item.format}</Badge>
              </div>
              <div className="md:text-center">
                <Button variant="outline" size="sm" className="uppercase text-xs tracking-wider">
                  {item.type === "Tournament" ? "Register" : "Details"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
