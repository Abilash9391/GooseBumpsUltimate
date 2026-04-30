"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { getEvents } from "@/lib/events";
import EventCard from "./EventCard";

export function EventsSection() {
  const upcomingEvents = getEvents("upcoming");
  const pastEvents = getEvents("past");
  const participatedEvents = getEvents("participated");

  return (
    <section id="events" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <Badge variant="outline" className="mb-4 uppercase tracking-wider">
              Events
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              STAY CONNECTED
            </h2>
          </div>

          <Button variant="link" className="text-primary uppercase gap-1 p-0">
            View All Events <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full md:w-auto mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="participated">Participated</TabsTrigger>
          </TabsList>

          {/* UPCOMING */}
          <TabsContent value="upcoming">
            <EventsGrid events={upcomingEvents} cols="md:grid-cols-2" />
          </TabsContent>

          {/* PAST */}
          <TabsContent value="past">
            <EventsGrid events={pastEvents} cols="md:grid-cols-2 lg:grid-cols-3" />
          </TabsContent>

          {/* PARTICIPATED */}
          <TabsContent value="participated">
            <EventsGrid
              events={participatedEvents}
              cols="md:grid-cols-2 lg:grid-cols-3"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

/* ---------- reusable grid ---------- */
function EventsGrid({ events, cols }) {
  if (!events?.length) {
    return (
      <p className="text-center mt-10 text-muted-foreground">
        No events found
      </p>
    );
  }

  return (
    <div className={`grid ${cols} gap-4`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}




// "use client";

// import { useState, useMemo } from "react";
// import EventCard from "./EventCard";

// /* -------- Helper: get type from date -------- */
// function getEventType(event) {
//   // manual override
//   if (event.type === "participated") return "participated";

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const eventDate = new Date(event.date);

//   return eventDate < today ? "past" : "upcoming";
// }

// export function EventsSection({ initialEvents = [] }) {
//   const [tab, setTab] = useState("upcoming");

//   const filtered = useMemo(() => {
//     return initialEvents.filter((event) => {
//       const computedType = getEventType(event);
//       return computedType === tab;
//     });
//   }, [initialEvents, tab]);

//   return (
//     <section className="py-20">
//       <div className="container mx-auto px-4">

//         {/* Tabs */}
//         <div className="flex gap-4 mb-6">
//           {["upcoming", "past", "participated"].map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`px-4 py-2 border ${
//                 tab === t ? "bg-black text-white" : ""
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         {/* Events */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filtered.map((event) => (
//             <EventCard key={event.id} event={event} />
//           ))}
//         </div>

//         {/* Empty */}
//         {filtered.length === 0 && (
//           <p className="text-center mt-6 text-muted-foreground">
//             No events found
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }


// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import { Calendar, MapPin, Clock, ChevronRight, Trophy } from "lucide-react";
// import { getEvents } from "@/lib/events";

// export function EventsSection() {
//   const upcomingEvents = getEvents("upcoming");
//   const pastEvents = getEvents("past");
//   const participatedEvents = getEvents("participated");

//   return (
//     <section id="events" className="py-20 lg:py-32 bg-background">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
//           <div>
//             <Badge variant="outline" className="mb-4 uppercase tracking-wider">Events</Badge>
//             <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">STAY CONNECTED</h2>
//           </div>
//           <Button variant="link" className="text-primary uppercase tracking-wider gap-1 p-0">
//             View All Events <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>

//         <Tabs defaultValue="upcoming" className="w-full">
//           <TabsList className="w-full md:w-auto bg-secondary mb-8">
//             <TabsTrigger value="upcoming" className="uppercase tracking-wider text-xs md:text-sm">Upcoming</TabsTrigger>
//             <TabsTrigger value="past" className="uppercase tracking-wider text-xs md:text-sm">Past Events</TabsTrigger>
//             <TabsTrigger value="participated" className="uppercase tracking-wider text-xs md:text-sm">Participated</TabsTrigger>
//           </TabsList>

//           <TabsContent value="upcoming" className="mt-0">
//             <div className="grid md:grid-cols-2 gap-4">
//               {upcomingEvents.map((event) => (
//                 <Card key={event.id} className="bg-card border-border hover:border-primary/50 transition-colors group cursor-pointer py-4 hover:shadow-md hover:scale-[1.02]">
//                   <CardContent className="p-6">
//                     <div className="flex items-start justify-between gap-4">
//                       <div className="flex-1">
//                         <Badge variant="secondary" className="mb-3 uppercase text-xs tracking-wider">{event.type}</Badge>
//                         <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">{event.title}</h3>
//                         <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
//                           <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{event.date}</span>
//                           <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{event.time}</span>
//                           <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{event.location}</span>
//                         </div>
//                       </div>
//                       <Badge className="bg-primary/20 text-primary border-0 whitespace-nowrap">{event.status}</Badge>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="past" className="mt-0">
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {pastEvents.map((event) => (
//                 <Card key={event.id} className="bg-card border-border hover:border-primary/50 transition-colors py-4 hover:shadow-md hover:scale-[1.02]">
//                   <CardContent className="p-6">
//                     <Badge variant="secondary" className="mb-3 uppercase text-xs tracking-wider">Past Event</Badge>
//                     <h3 className="font-display text-xl font-bold text-foreground">{event.title}</h3>
//                     <p className="text-sm text-muted-foreground mt-2">{event.date}</p>

//                     {/* Image Carousel */}
//                     {event.images && event.images.length > 0 && (
//                       <div className="my-4">
//                         <Carousel className="w-full">
//                           <CarouselContent>
//                             {event.images.map((image, index) => (
//                               <CarouselItem key={index}>
//                                 <div className="relative aspect-video w-full overflow-hidden rounded-lg">
//                                   <img
//                                     src={image}
//                                     alt={`${event.title} - Image ${index + 1}`}
//                                     className="w-full h-full object-cover"
//                                   />
//                                 </div>
//                               </CarouselItem>
//                             ))}
//                           </CarouselContent>
//                           {event.images.length > 1 && (
//                             <>
//                               <CarouselPrevious className="left-1" />
//                               <CarouselNext className="right-1" />
//                             </>
//                           )}
//                         </Carousel>
//                       </div>
//                     )}

//                     <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
//                       <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{event.time}</span>
//                       <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{event.location}</span>
//                     </div>
//                     <div className="mt-4 pt-4 border-t border-border">
//                       <p className="text-primary font-semibold">{event.result}</p>
//                       <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="participated" className="mt-0">
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {participatedEvents.map((event) => (
//                 <Card key={event.id} className="bg-card border-border hover:border-primary/50 transition-colors py-4 hover:shadow-md hover:scale-[1.02]">
//                   <CardContent className="p-6">
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
//                         <Trophy className="h-6 w-6 text-primary" />
//                       </div>
//                       <div>
//                         <p className="text-sm text-muted-foreground">{event.date}</p>
//                         <p className="font-semibold text-primary">{event.result}</p>
//                       </div>
//                     </div>

//                     {/* Image Carousel */}
//                     {event.images && event.images.length > 0 && (
//                       <div className="mb-4">
//                         <Carousel className="w-full">
//                           <CarouselContent>
//                             {event.images.map((image, index) => (
//                               <CarouselItem key={index}>
//                                 <div className="relative aspect-video w-full overflow-hidden rounded-lg">
//                                   <img
//                                     src={image}
//                                     alt={`${event.title} - Image ${index + 1}`}
//                                     className="w-full h-full object-cover"
//                                   />
//                                 </div>
//                               </CarouselItem>
//                             ))}
//                           </CarouselContent>
//                           {event.images.length > 1 && (
//                             <>
//                               <CarouselPrevious className="left-1" />
//                               <CarouselNext className="right-1" />
//                             </>
//                           )}
//                         </Carousel>
//                       </div>
//                     )}

//                     <h3 className="font-display text-xl font-bold text-foreground">{event.title}</h3>
//                     <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </section>
//   );
// }
