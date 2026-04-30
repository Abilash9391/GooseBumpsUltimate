"use client";

import Link from "next/link";
import { ArrowRight, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TaglineSection() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Disc className="w-8 h-8 text-primary animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Discover the Spirit</span>
            <Disc className="w-8 h-8 text-primary animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          </div>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            Where Passion Meets the <span className="text-primary">Flying Disc</span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Experience the thrill of Ultimate Frisbee - a sport that combines athleticism,
            strategy, and the Spirit of the Game. No referees, just fair play and pure excitement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button size="lg" asChild className="uppercase tracking-wider font-semibold group">
              <Link href="/about-game">
                What is Ultimate?
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="uppercase tracking-wider font-semibold">
              <a href="/events">Upcoming Events</a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-border/50">
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">60+</div>
              <div className="text-sm text-muted-foreground mt-1">Active Players</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Tournaments</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">8+</div>
              <div className="text-sm text-muted-foreground mt-1">Years Strong</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
