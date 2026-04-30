import { Target, Users, Trophy, Heart, Zap, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const visionItems = [
  { icon: Target, title: "Our Mission", description: "To promote Ultimate Frisbee and foster a community built on sportsmanship, inclusivity, and the Spirit of the Game across all skill levels." },
  { icon: Users, title: "Community First", description: "Building lifelong friendships through the love of the game. We believe in creating a welcoming environment for players of all backgrounds." },
  { icon: Trophy, title: "Excellence in Sport", description: "Striving for competitive excellence while maintaining the integrity and self-officiating nature that makes Ultimate unique." },
];

const values = [
  { icon: Heart, title: "Spirit of the Game", description: "Self-officiation, fair play, and mutual respect are the pillars of our community." },
  { icon: Zap, title: "Passion & Energy", description: "We bring enthusiasm to every practice, every game, and every interaction." },
  { icon: Globe, title: "Inclusivity", description: "Open to all ages, genders, and skill levels. Everyone has a place in Ultimate." },
];

const goals = [
  { year: "2026", title: "Regional Expansion", description: "Establish satellite training programs in neighboring cities to grow the Ultimate community." },
  { year: "2027", title: "Youth Development", description: "Launch a comprehensive youth program introducing Ultimate to schools and colleges." },
  { year: "2028", title: "National Recognition", description: "Compete at national level tournaments and bring home championships." },
];

export function VisionSection() {
  return (
    <section id="vision" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">Our Vision</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 text-balance">
            Building the Future of Ultimate
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-balance">
            More than a team, we are a movement dedicated to growing the sport we love and creating lasting impact in our community.
          </p>
        </div>

        <Tabs defaultValue="mission" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="mission" className="uppercase tracking-wider text-xs">Mission</TabsTrigger>
            <TabsTrigger value="values" className="uppercase tracking-wider text-xs">Values</TabsTrigger>
            <TabsTrigger value="goals" className="uppercase tracking-wider text-xs">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="mission" className="mt-0">
            <div className="grid md:grid-cols-3 gap-6">
              {visionItems.map((item, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="values" className="mt-0">
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((item, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors">
                      <item.icon className="w-7 h-7 text-secondary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals" className="mt-0">
            <div className="grid md:grid-cols-3 gap-6">
              {goals.map((item, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
                  <CardContent className="p-8 relative">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">{item.year}</span>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
