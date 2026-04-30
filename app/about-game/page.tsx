import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import {
  Disc,
  Users,
  Clock,
  Target,
  Heart,
  Zap,
  Trophy,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const whatIsUltimate = [
  { icon: Disc, title: "The Flying Disc", description: "Ultimate is played with a 175-gram disc on a rectangular field. Two teams of seven players compete to score by catching the disc in the opposing end zone." },
  { icon: Users, title: "Team Sport", description: "Each team has 7 players on the field. Mixed teams feature both men and women, promoting gender equity in competitive play." },
  { icon: Clock, title: "Non-Stop Action", description: "Games are typically played to 15 points or timed halves. The fast-paced nature keeps players and spectators engaged throughout." },
  { icon: Target, title: "Strategic Depth", description: "Like basketball and soccer combined, Ultimate requires precise throws, athletic cuts, and team coordination to move the disc down field." },
];

const rules = [
  { title: "The Field", points: ["Playing field is 70 yards long with 25-yard end zones", "Width is 40 yards", "Similar dimensions to a football field but narrower"] },
  { title: "Scoring", points: ["Score by catching the disc in the opponent's end zone", "Each catch in the end zone = 1 point", "First team to reach 15 points (or time limit) wins"] },
  { title: "Movement", points: ["You cannot run while holding the disc", "Must establish a pivot foot and pass within 10 seconds", "Turnovers occur on drops, interceptions, or out-of-bounds throws"] },
  { title: "Spirit of the Game", points: ["No referees - players call their own fouls", "Emphasis on sportsmanship and fair play", "Disputes resolved through discussion on field"] },
];

const whyUltimate = [
  { icon: Heart, title: "Spirit of the Game", description: "Ultimate is self-officiated. Players are responsible for fair play, fostering mutual respect and integrity on every point." },
  { icon: Zap, title: "Athletic Excellence", description: "Combining sprinting, jumping, and precision throwing, Ultimate provides a complete athletic workout while being incredibly fun." },
  { icon: Users, title: "Inclusive Community", description: "Open to all ages, genders, and skill levels. The Ultimate community is known for being welcoming and supportive of newcomers." },
  { icon: Trophy, title: "Competitive Growth", description: "From casual pickup games to World Championships, Ultimate offers pathways for players at every level to compete and improve." },
  { icon: Shield, title: "Life Skills", description: "Learn leadership, communication, and conflict resolution through the unique self-officiating nature of the sport." },
  { icon: Disc, title: "Pure Joy", description: "There's nothing quite like the feeling of making a layout catch or throwing the perfect huck. Ultimate delivers pure athletic joy." },
];

export default function AboutGame() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              <Disc className="w-5 h-5" /> Discover Ultimate Frisbee
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              The Sport That Changes Everything
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ultimate Frisbee is more than a game—it's a movement built on athleticism, strategy, and the revolutionary Spirit of the Game.
            </p>
          </div>
        </div>
      </section>

      {/* What is Ultimate */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">The Basics</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">What is Ultimate?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatIsUltimate.map((item, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">How to Play</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">Basic Rules</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Simple to learn, challenging to master. Here are the fundamental rules of Ultimate.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {rules.map((rule, index) => (
              <div key={index} className="bg-background rounded-xl p-8 border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">{index + 1}</span>
                  {rule.title}
                </h3>
                <ul className="space-y-3">
                  {rule.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ultimate */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">Why Play</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">Why Choose Ultimate?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyUltimate.map((item, index) => (
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">Ready to Play?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join Goosebumps Ultimate Disc Club and experience the sport that's changing lives. All skill levels welcome!
          </p>
          <Button size="lg" asChild className="uppercase tracking-wider font-semibold group">
            <Link href="/#contact">
              Join the Club
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}