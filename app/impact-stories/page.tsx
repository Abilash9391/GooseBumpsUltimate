import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getStoriesByType } from "@/data/impact-stories";
import { ChevronRight, Users, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Impact Stories | Goosebumps Ultimate Disc Club",
  description: "Discover the inspiring stories of players and teams whose lives have been transformed by Ultimate Frisbee.",
};

export default function ImpactStoriesPage() {
  const playerStories = getStoriesByType("player");
  const teamStories = getStoriesByType("team");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 uppercase tracking-wider">Impact Stories</Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">
              STORIES OF <span className="text-primary">TRANSFORMATION</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every player and team has a unique journey. These stories showcase how Ultimate Frisbee
              has changed lives, built communities, and created lasting memories.
            </p>
          </div>
        </div>
      </section>

      {/* Player Stories Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                PLAYER STORIES
              </h2>
              <p className="text-muted-foreground mt-2">
                Individual journeys of growth, resilience, and discovery through Ultimate
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {playerStories.map((story) => (
              <Card key={story.id} className="bg-card border-border hover:border-primary/50 transition-all group overflow-hidden">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {story.name}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {story.story}
                  </p>
                  <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:text-primary/80" asChild>
                    <Link href={`/impact-stories/${story.slug}`}>
                      Read Full Journey <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stories Section */}
      <section className="py-20 lg:py-32 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                TEAM STORIES
              </h2>
              <p className="text-muted-foreground mt-2">
                Collective experiences that show how teams grow, overcome challenges, and create impact together
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamStories.map((story) => (
              <Card key={story.id} className="bg-card border-border hover:border-primary/50 transition-all group overflow-hidden">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {story.name}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {story.story}
                  </p>
                  <Button variant="link" className="p-0 h-auto font-semibold text-primary hover:text-primary/80" asChild>
                    <Link href={`/impact-stories/${story.slug}`}>
                      Read Full Journey <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
              YOUR STORY STARTS HERE
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to write your own chapter in the world of Ultimate Frisbee?
              Join Goosebumps and become part of something bigger.
            </p>
            <Button size="lg" className="font-semibold uppercase tracking-wider" asChild>
              <Link href="/contact">
                Start Your Journey <ChevronRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}