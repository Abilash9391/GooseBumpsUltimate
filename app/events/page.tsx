// import { EventsSection } from "@/components/EventsSection";


// export default async function EventsPage() {
//   const res = await fetch("/api/events", {
//     cache: "no-store",
//   });

//   if (!res.ok) throw new Error("Failed to fetch events");

//   const json = await res.json();


//   const events = Array.isArray(json) ? json : json.data ?? [];

//   return <EventsSection initialEvents={events} />;
// }
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventsSection } from "@/components/EventsSection";


 export default function EventsPage() {

  return (
        <main className="min-h-screen bg-background">
              <Navbar />
              <EventsSection />
              <Footer />
            </main>
    );
}

