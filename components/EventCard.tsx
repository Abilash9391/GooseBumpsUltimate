"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, MapPin, Clock, Trophy } from "lucide-react";

/* ---------- TYPES ---------- */
type Event = {
  title: string;
  date?: string;
  time?: string;
  location?: string;
  images?: string[];
  result?: string;
  description?: string;
  status?: string;
  type?: "participated";
};

/* ---------- HELPERS ---------- */
function getEventType(event: Event) {
  if (event.type === "participated") return "participated";

  if (!event.date) return "upcoming";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(event.date) < today ? "past" : "upcoming";
}

/* ---------- SMALL REUSABLE COMPONENT ---------- */
function Info({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <span className="flex items-center gap-1">
      {icon} {text}
    </span>
  );
}

/* ---------- COMPONENT ---------- */
export default function EventCard({ event }: { event: Event }) {
  const type = getEventType(event);
  const hasImages = event.images && event.images.length > 0;

  return (
    <Card className="transition hover:shadow-md hover:scale-[1.02]">
      <CardContent className="p-6 space-y-4">

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <Badge>
            {type === "past"
              ? "Past Event"
              : type === "participated"
              ? "Participated"
              : "Upcoming"}
          </Badge>

          {event.status && type === "upcoming" && (
            <Badge variant="secondary">{event.status}</Badge>
          )}
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-bold">{event.title}</h3>

        {/* META INFO */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {event.date && (
            <Info icon={<Calendar size={16} />} text={event.date} />
          )}
          {event.time && (
            <Info icon={<Clock size={16} />} text={event.time} />
          )}
          {event.location && (
            <Info icon={<MapPin size={16} />} text={event.location} />
          )}
        </div>

        {/* IMAGES */}
        {hasImages && (
          <div className="overflow-hidden rounded-lg relative group">
            <Carousel>
              <CarouselContent>
                {event.images!.map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="relative w-full h-40">
                      <Image
                        src={img}
                        alt={`event image ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority={i === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {event.images!.length > 1 && (
                <>
                  <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-white/80 backdrop-blur-sm" />
                  <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-white/80 backdrop-blur-sm" />
                </>
              )}
            </Carousel>
          </div>
        )}

        {/* RESULT */}
        {(event.result || type === "participated") && (
          <div className="flex items-center gap-2">
            {type === "participated" && (
              <Trophy className="w-5 h-5 text-primary" />
            )}
            {event.result && (
              <p className="font-semibold text-primary">
                {event.result}
              </p>
            )}
          </div>
        )}

        {/* DESCRIPTION */}
        {event.description && (
          <p className="text-sm text-muted-foreground">
            {event.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}



// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Calendar, MapPin, Clock, Trophy } from "lucide-react";

// /* helper */
// function getEventType(event) {
//   if (event.type === "participated") return "participated";

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const eventDate = new Date(event.date);
//   return eventDate < today ? "past" : "upcoming";
// }

// export default function EventCard({ event }) {
//   const type = getEventType(event);

//   return (
//     <Card className="hover:shadow-md transition hover:scale-[1.02]">
//       <CardContent className="p-6">

//         {/* ---------- HEADER (shared) ---------- */}
//         <div className="flex items-start justify-between mb-3">
//           <Badge>
//             {type === "past"
//               ? "Past Event"
//               : type === "participated"
//               ? "Participated"
//               : "Upcoming"}
//           </Badge>

//           {event.status && type === "upcoming" && (
//             <Badge variant="secondary">{event.status}</Badge>
//           )}
//         </div>

//         {/* ---------- TITLE ---------- */}
//         <h3 className="text-xl font-bold">{event.title}</h3>

//         {/* ---------- DATE / TIME / LOCATION (optional) ---------- */}
//         <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
//           {event.date && (
//             <span className="flex items-center gap-1">
//               <Calendar size={16} /> {event.date}
//             </span>
//           )}

//           {event.time && (
//             <span className="flex items-center gap-1">
//               <Clock size={16} /> {event.time}
//             </span>
//           )}

//           {event.location && (
//             <span className="flex items-center gap-1">
//               <MapPin size={16} /> {event.location}
//             </span>
//           )}
//         </div>

//         {/* ---------- IMAGE (optional) ---------- */}
//         {event.images?.length > 0 && (
//           <div className="my-4 overflow-hidden rounded-lg relative group">
//             <Carousel>
//               <CarouselContent>
//                 {event.images.map((img: string, i: number) => (
//                   <CarouselItem key={i}>
//                     <img
//                       src={img}
//                       className="w-full h-40 object-cover rounded-lg"
//                     />
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>

//               {event.images.length > 1 && (
//                 <>
//                 <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-white/80 backdrop-blur-sm" />
//                 <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-white/80 backdrop-blur-sm" />
//                 </>
//               )}
//             </Carousel>
//           </div>
//         )}

//         {/* ---------- RESULT / TROPHY (optional) ---------- */}
//         {(event.result || type === "participated") && (
//           <div className="flex items-center gap-2 mt-4">
//             {type === "participated" && (
//               <Trophy className="text-primary w-5 h-5" />
//             )}
//             {event.result && (
//               <p className="text-primary font-semibold">{event.result}</p>
//             )}
//           </div>
//         )}

//         {/* ---------- DESCRIPTION (optional) ---------- */}
//         {event.description && (
//           <p className="text-sm text-muted-foreground mt-2">
//             {event.description}
//           </p>
//         )}
//       </CardContent>
//     </Card>
//   );
// }


// import { Card, CardContent } from "@/components/ui/card";

// export default function EventCard({ event }) {
//   return (
//     <Card className="hover:shadow-md transition">
//       <CardContent className="p-4">
//         <h3 className="font-bold text-lg">{event.title}</h3>
//         <p className="text-sm text-muted-foreground">
//           {event.date} • {event.time}
//         </p>
//         <p className="text-sm">{event.location}</p>
//       </CardContent>
//     </Card>
//   );
// }