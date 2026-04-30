import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Star, Award } from "lucide-react";

const achievements = [
  { icon: Trophy, title: "State Championship", years: "2023, 2025", description: "Dominated state-level Ultimate competition with exceptional teamwork" },
  { icon: Medal, title: "Spirit Award Winners", years: "2022, 2024, 2025", description: "Recognized for outstanding sportsmanship and Spirit of the Game" },
  { icon: Star, title: "National Qualifiers", years: "3 Years", description: "Consistently qualifying for national-level competitions" },
  { icon: Award, title: "Best New Club", years: "2021", description: "Recognized as the most promising new Ultimate club in the region" },
];

const stats = [
  { value: "75%", label: "Tournament Win Rate" },
  { value: "50+", label: "Tournaments Played" },
  { value: "100+", label: "Active Members" },
  { value: "5K+", label: "Social Media Followers" },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 uppercase tracking-wider">Achievements</Badge>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            LEGACY OF <span className="text-primary">EXCELLENCE</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our achievements reflect our commitment to the Spirit of the Game, competitive excellence, and building a thriving Ultimate community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              <p className="font-display text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <achievement.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{achievement.title}</h3>
              <p className="text-primary font-semibold text-sm mb-3">{achievement.years}</p>
              <p className="text-muted-foreground text-sm">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
