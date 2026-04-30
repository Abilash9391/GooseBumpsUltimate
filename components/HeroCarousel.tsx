"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  { image: "/images/2.jpeg", alt: "Ultimate frisbee diving catch" },
  { image: "/images/3.jpeg", alt: "Team huddle on the field" },
  { image: "/images/1.jpeg", alt: "Powerful disc throw" },
];

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  // sync state safely
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
          }),
        ]}
        className="h-full w-full"
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-screen pl-0 relative">
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls */}
        <div className="absolute bottom-8 left-4 right-4 container mx-auto px-4 flex items-center justify-between">
          
          {/* Arrows */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-muted-foreground/30 hover:border-primary hover:bg-primary/10 transition"
              onClick={scrollPrev}
              disabled={!api}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-muted-foreground/30 hover:border-primary hover:bg-primary/10 transition"
              onClick={scrollNext}
              disabled={!api}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>

          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-8 bg-primary"
                    : "w-4 bg-muted-foreground/40 hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </section>
  );
}



// "use client";

// import { useEffect, useState, useCallback } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   type CarouselApi,
// } from "@/components/ui/carousel";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Autoplay from "embla-carousel-autoplay";

// const slides = [
//   { image: "/images/2.jpeg", alt: "Ultimate frisbee diving catch" },
//   { image: "/images/3.jpeg", alt: "Team huddle on the field" },
//   { image: "/images/1.jpeg", alt: "Powerful disc throw" },
// ];

// export function HeroCarousel() {
//   const [api, setApi] = useState<CarouselApi>();
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     if (!api) return;
//     setCurrent(api.selectedScrollSnap());
//     api.on("select", () => setCurrent(api.selectedScrollSnap()));
//   }, [api]);

//   const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
//   const scrollNext = useCallback(() => api?.scrollNext(), [api]);

//   return (
//     <section id="home" className="relative h-screen w-full">
//       <Carousel
//         setApi={setApi}
//         opts={{ loop: true }}
//         plugins={[Autoplay({ delay: 4000 })]}
//         className="h-full w-full"
//       >
//         <CarouselContent className="h-full ml-0">
//           {slides.map((slide, index) => (
//             <CarouselItem key={index} className="h-screen pl-0 relative">
//               <div className="absolute inset-0">
//                 <img
//                   src={slide.image}
//                   alt={slide.alt}
//                   className="w-full h-full object-cover"
//                   loading={index === 0 ? "eager" : "lazy"}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         <div className="absolute bottom-8 left-4 right-4 container mx-auto px-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Button variant="outline" size="icon" className="rounded-full border-muted-foreground/30 hover:border-primary hover:bg-primary/10" onClick={scrollPrev}>
//               <ChevronLeft className="h-4 w-4" /><span className="sr-only">Previous slide</span>
//             </Button>
//             <Button variant="outline" size="icon" className="rounded-full border-muted-foreground/30 hover:border-primary hover:bg-primary/10" onClick={scrollNext}>
//               <ChevronRight className="h-4 w-4" /><span className="sr-only">Next slide</span>
//             </Button>
//           </div>
//           <div className="flex gap-2">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => api?.scrollTo(index)}
//                 className={`h-1 transition-all duration-300 rounded-full ${current === index ? "w-8 bg-primary" : "w-4 bg-muted-foreground/50 hover:bg-muted-foreground"}`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </Carousel>
//     </section>
//   );
// }
