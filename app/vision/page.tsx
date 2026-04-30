import { Navbar } from "@/components/Navbar";
import { VisionSection } from "@/components/VisionSection";
import { Footer } from "@/components/Footer";

export default function Vision() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <VisionSection />
      <Footer />
    </main>
  );
}