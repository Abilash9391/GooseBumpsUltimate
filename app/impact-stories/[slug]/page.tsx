import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { impactStories, getStoryBySlug } from "@/data/impact-stories";
import { ArrowLeft, User, Users, Calendar, MapPin } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const story = getStoryBySlug(params.slug);

  if (!story) {
    return {
      title: "Story Not Found | Goosebumps Ultimate Disc Club",
    };
  }

  return {
    title: `${story.name}'s Journey | Impact Stories | Goosebumps Ultimate Disc Club`,
    description: story.story,
  };
}

export async function generateStaticParams() {
  return impactStories.map((story) => ({
    slug: story.slug,
  }));
}

export default function ImpactStoryPage({ params }: PageProps) {
  const story = getStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/impact-stories"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Impact Stories
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                {story.type === "player" ? (
                  <User className="h-8 w-8 text-primary" />
                ) : (
                  <Users className="h-8 w-8 text-primary" />
                )}
              </div>
              <div>
                <Badge variant="outline" className="mb-2 uppercase tracking-wider">
                  {story.type === "player" ? "Player Story" : "Team Story"}
                </Badge>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                  {story.name}
                </h1>
              </div>
            </div>

            <div className="aspect-[16/9] relative overflow-hidden rounded-xl mb-8">
              <Image
                src={story.image}
                alt={story.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                {story.story}
              </p>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                {story.fullStory.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 pt-16 border-t border-border">
              <div className="text-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Ready to Write Your Own Story?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join Goosebumps Ultimate Disc Club and become part of a community that transforms lives through the power of Ultimate Frisbee.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="font-semibold uppercase tracking-wider" asChild>
                    <Link href="/contact">
                      Join Our Community
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="font-semibold uppercase tracking-wider" asChild>
                    <Link href="/impact-stories">
                      Read More Stories
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}