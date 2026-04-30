import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TaglineSection } from "@/components/TaglineSection";
import { EventsSection } from "@/components/EventsSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroCarousel />
      <TaglineSection />
      {/* <EventsSection /> */}
      <Footer />
    </main>
  );
}